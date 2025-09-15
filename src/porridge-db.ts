/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import { deleteProperty, getProperty, setProperty } from 'dot-prop';
import {
	clear,
	createStore,
	get as getItemIdb,
	keys,
	del as removeItemIdb,
	set as setItemIdb,
	type UseStore,
} from 'idb-keyval';
import type { IDBValidKey, WebPorridge } from '../types/index.d.ts';

import { didExpire, eventDispatcher, getType, storageKeys } from './util.ts';

/**
 * Instantiates the class with provided options.
 * @param [options]
 *
 * @example
 * ```js
 * const db = new PorridgeDB();
 * ```
 */
export class PorridgeDB {
	#customStore: UseStore;
	#eventName: string;

	constructor(options?: WebPorridge.IndexeddbOptions) {
		if (typeof globalThis !== 'undefined' && !('indexedDB' in globalThis)) {
			throw new Error('Your browser does not support the IndexedDB API');
		}

		const { db, eventName, store } = {
			db: 'web-porridge:db',
			eventName: 'porridgeDB.didChange',
			store: '(default store)',
			...options,
		};

		if (typeof eventName !== 'string') {
			throw new TypeError(`Event name must be of type "string", got "${typeof eventName}"`);
		}

		this.#eventName = eventName;
		this.#customStore = createStore(db, store);
	}
	/**
	 * Writes single data item to IndexedDB.
	 * @param keyName
	 * @param keyValue
	 * @param [options]
	 * @param [options.expires]
	 * @param [options.prop]
	 *
	 * @example
	 * ```js
	 * await db.setItem('firstItem', 'Hello World');
	 *
	 * await db.setItem('secondItem', { name: 'John Appleseed' });
	 * await db.setItem('secondItem', 'Ada Lovelace', { prop: 'name' });
	 * ```
	 */
	public async setItem(keyName: string, keyValue: unknown, options: WebPorridge.StorageOptions = {}): Promise<void> {
		const oldValue = await this.getItem(keyName, options);

		if (options?.prop?.length) {
			const item = (await this.getItem(keyName)) || {};
			setProperty(item, options.prop, keyValue);

			return await this.setItem(keyName, item, {
				...options,
				prop: undefined,
			});
		}

		const newValue = {
			[storageKeys.value]: keyValue,
			[storageKeys.type]: getType(keyValue),
			[storageKeys.expires]: options?.expires ?? undefined,
		};

		await setItemIdb(keyName, newValue, this.#customStore);

		eventDispatcher(this.#eventName, {
			key: keyName,
			oldValue: oldValue,
			newValue: keyValue,
			storageArea: Object.fromEntries(await this.entries()),
		});
	}

	/**
	 * Reads single data item from IndexedDB.
	 * @param keyName
	 * @param [options]
	 * @param [options.expires]
	 * @param [options.prop]
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.getItem('firstItem');
	 * await db.getItem('secondItem', { prop: 'dot.notation.property' });
	 * ```
	 */
	public async getItem(keyName: string, options?: WebPorridge.StorageOptions): Promise<unknown> {
		const item: WebPorridge.Payload | null = (await getItemIdb(keyName, this.#customStore)) || null;

		if (!item || didExpire(item[storageKeys.expires] || '')) {
			return null;
		}

		if (item[storageKeys.type] === 'object' && options?.prop?.length) {
			return getProperty(item[storageKeys.value], options.prop);
		}

		return item[storageKeys.value];
	}

	/**
	 * Removes single data item from IndexedDB.
	 * @param keyName
	 * @param [options]
	 * @param [options.prop]
	 *
	 * @example
	 * ```js
	 * await db.removeItem('firstItem');
	 * await db.removeItem('secondItem', { prop: 'dot.notation.property' });
	 * ```
	 */
	public async removeItem(keyName: string, options?: WebPorridge.StorageOptions): Promise<void> {
		const oldValue = await this.getItem(keyName, options);

		if (options?.prop?.length) {
			const item = (await this.getItem(keyName)) || {};
			deleteProperty(item, options.prop);

			return await this.setItem(keyName, item);
		}

		await removeItemIdb(keyName, this.#customStore);

		eventDispatcher(this.#eventName, {
			key: keyName,
			oldValue: oldValue,
			newValue: null,
			storageArea: Object.fromEntries(await this.entries()),
		});
	}

	/**
	 * Returns the length of IndexedDB.
	 * @param index
	 * @returns
	 *
	 * @example
	 * ```js
	 * await idb.key(0);
	 * ```
	 */
	public async key(index: number): Promise<unknown> {
		return (await keys(this.#customStore))[index] || null;
	}

	/**
	 * Returns the length of IndexedDB.
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.length;
	 * ```
	 */
	public get length(): Promise<number> {
		return (async () => {
			return (await keys(this.#customStore)).length;
		})();
	}

	/**
	 * Clears IndexedDB.
	 *
	 * @example
	 * ```js
	 * await db.clear();
	 * ```
	 */
	public async clear(): Promise<void> {
		await clear(this.#customStore);

		eventDispatcher(this.#eventName, {
			key: null,
			oldValue: null,
			newValue: null,
			storageArea: {},
		});
	}

	/**
	 * Returns whether IndexedDB contains property.
	 * @param keyName
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.hasItem('firstItem');
	 * ```
	 */
	public async hasItem(keyName: string): Promise<boolean> {
		return (await keys(this.#customStore)).includes(keyName);
	}

	/**
	 * Returns an array of IndexedDB's enumerable property names.
	 * @param keyName
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.keys();
	 * ```
	 */
	public async keys(): Promise<string[]> {
		return await keys(this.#customStore);
	}

	/**
	 * Returns an array of IndexedDB's enumerable property values.
	 * @param keyName
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.values();
	 * ```
	 */
	public async values(): Promise<unknown[]> {
		return Promise.all((await keys(this.#customStore)).map(async (item) => await this.getItem(item as string)));
	}

	/**
	 * Returns an array of IndexedDB's own enumerable string-keyed property `[key, value]` pairs.
	 * @param keyName
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.entries();
	 * ```
	 */
	public async entries(): Promise<[IDBValidKey, unknown][]> {
		return Promise.all((await keys(this.#customStore)).map(async (item) => [item, await this.getItem(item as string)]));
	}

	/**
	 * Observes value changes of an IndexedDB item.
	 * @param keyName
	 * @param callback
	 *
	 * @example
	 * ```js
	 * const unobserve = db.observe('demo', ({ key, newValue }) => {
	 * 	console.log(`${key} has changed to:`, value);
	 * });
	 *
	 * // Later, to stop observing
	 * unobserve();
	 * ```
	 */
	public observe(keyName: string, callback: (data: WebPorridge.StorageEvent) => void): () => void {
		if (typeof callback !== 'function') {
			throw new TypeError(`The callback argument must be of type "function", got "${typeof callback}"`);
		}

		function handler(event: Event): void {
			const customEvent = event as CustomEvent<WebPorridge.StorageEvent>;

			// We follow the same pattern as the StorageEvent interface, so we need to allow for a null key.
			if (customEvent.detail.key !== keyName && customEvent.detail.key !== null) {
				return;
			}

			callback(customEvent.detail);
		}

		globalThis.addEventListener(this.#eventName, handler);

		return () => globalThis.removeEventListener(this.#eventName, handler);
	}

	/**
	 * Returns whether a single IndexedDB item has expired.
	 * @param keyName
	 * @returns
	 *
	 * @example
	 * ```js
	 * await db.didExpire('firstItem');
	 * ```
	 */
	public async didExpire(keyName: string): Promise<boolean> {
		const item: WebPorridge.Payload | null = (await getItemIdb(keyName, this.#customStore)) || null;

		if (!item) {
			return false;
		}

		return didExpire(item[storageKeys.expires] || '-1');
	}
}
