/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import type { WebPorridge } from '../types';
import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
	clear,
	createStore,
	del as removeItemIdb,
	get as getItemIdb,
	keys,
	set as setItemIdb,
	UseStore
} from 'idb-keyval';

import {
	addCustomEventListener,
	didExpire,
	eventDispatcher,
	getType,
	storageKeys
} from './util';

const storageType = 'IndexedDB';

/**
 * Instantiates the class with provided options
 * @param {WebPorridge.IndexeddbOptions} [options]
 *
 * @example
 * ```js
 * const db = new PorridgeDB();
 * ```
 */
export class PorridgeDB {
	eventName: string;
	customStore: UseStore;

	constructor(options?: WebPorridge.IndexeddbOptions) {
		if (typeof <any>window !== 'undefined' && !('indexedDB' in <any>window)) {
			throw Error(`Your browser does not support the IndexedDB API`);
		}

		const { db, eventName, store } = {
			db: 'web-porridge:db',
			eventName: 'porridgeDB.didChange',
			store: '(default store)',
			...options
		}

		this.eventName = eventName;
		this.customStore = createStore(db, store);
	}
	/**
	 * Writes single data item to IndexedDB
	 * @param {String} keyName
	 * @param {unknown} keyValue
	 * @param {Object} [options]
	 * @param {String} [options.expires]
	 * @param {String} [options.prop]
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
			const item = await this.getItem(keyName) || {};
			setProperty(item, options.prop, keyValue);

			return await this.setItem(keyName, item, {
				...options,
				prop: undefined
			});
		}

		const newValue = {
			[storageKeys.value]: keyValue,
			[storageKeys.type]: getType(keyValue)
		};

		if (options?.expires && String(options.expires).length) {
			newValue[storageKeys.expires] = new Date(options.expires);
		}

	eventDispatcher(this.eventName, {
			store: storageType,
			key: keyName,
			oldValue: oldValue,
			newValue: keyValue
		});

		return await setItemIdb(keyName, newValue, this.customStore);
	}

	/**
	 * Reads single data item from IndexedDB
	 * @param {String} keyName
	 * @param {Object} [options]
	 * @param {String} [options.expires]
	 * @param {String} [options.prop]
	 * @returns {unknown}
	 *
	 * @example
	 * ```js
	 * await db.getItem('firstItem');
	 * await db.getItem('secondItem', { prop: 'dot.notation.property' });
	 * ```
	 */
	public async getItem(keyName: string, options?: WebPorridge.StorageOptions): Promise<unknown> {
		const item: WebPorridge.Payload = await getItemIdb(keyName, this.customStore);

		if (!item || didExpire(item[storageKeys.expires])) {
			return null;
		}

		if (item[storageKeys.type] === 'object' && options?.prop?.length) {
			return getProperty(item[storageKeys.value], options.prop);
		}

		return item[storageKeys.value];
	}

	/**
	 * Removes single data item from IndexedDB
	 * @param {String} keyName
	 * @param {Object} [options]
	 * @param {String} [options.prop]
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
			const item = await this.getItem(keyName) || {};
			deleteProperty(item, options.prop);

			return await this.setItem(keyName, item);
		}

	eventDispatcher(this.eventName, {
			store: storageType,
			key: keyName,
			oldValue: oldValue,
			newValue: null
		});

		return await removeItemIdb(keyName, this.customStore);
	}

	/**
	 * Returns the length of IndexedDB
	 * @param index
	 * @returns {unknown}
	 *
	 * @example
	 * ```js
	 * await idb.key(0);
	 * ```
	 */
	public async key(index: number): Promise<unknown> {
		return (await keys(this.customStore))[index];
	}

	/**
	 * Returns the length of IndexedDB
	 * @returns {number}
	 *
	 * @example
	 * ```js
	 * await db.length;
	 * ```
	 */
	public get length(): Promise<number> {
		return (async () => {
			return (await keys(this.customStore)).length;
		})();
	}

	/**
   * Clears IndexedDB
	 *
	 * @example
	 * ```js
	 * await db.clear();
	 * ```
	 */
	public async clear(): Promise<void> {
		eventDispatcher(this.eventName, {
			store: storageType,
			oldValue: null,
			newValue: null
		});

		return await clear(this.customStore);
	}

	/**
	 * Returns whether IndexedDB contains property
	 * @param {String} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * await db.hasItem('firstItem');
	 * ```
	 */
	public async hasItem(keyName: string): Promise<boolean> {
		return (await keys(this.customStore)).includes(keyName);
	}

	/**
	 * Returns an array of IndexedDB's enumerable property names
	 * @param {String} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * await db.keys();
	 * ```
	 */
	public async keys(): Promise<string[]> {
		return await keys(this.customStore);
	}

	/**
	 * Returns an array of IndexedDB's enumerable property values
	 * @param {String} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * await db.values();
	 * ```
	 */
	public async values(): Promise<unknown[]> {
		return Promise.all(
			(await keys(this.customStore))
				.map(async (item: string) => await this.getItem(item))
		);
	}

	/**
	 * Observes value changes on a IndexedDB item
	 * @param {String} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * await db.entries();
	 * ```
	 */
	public async entries(): Promise<[IDBValidKey, unknown][]> {
		return Promise.all(
			(await keys(this.customStore))
				.map(async (item: string) => [item, await this.getItem(item)])
		);
	}

	/**
	 * Observes value changes of an IndexedDB item. Optionally sends messages to specified origins.
	 * @param {String} keyName
	 * @param {Function} callback
	 * @param {Array} targetOrigins
	 *
	 * @example
	 * ```js
	 * db.observe('demo', ({ key, value }) => {
	 * 	console.log(`${key} has changed to:`, value);
	 * });
	 * ```
	 */
	public observe(keyName: string, callback: (payload: any) => void, targetOrigins: string[] = []): void {
		if (typeof callback !== 'function') {
			throw new TypeError('The callback argument is not a function');
		}

		addCustomEventListener(this.eventName, keyName, callback, targetOrigins);
	}

	/**
	 * Returns whether a single IndexedDB item has expired
	 * @param {String} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * await db.didExpire('firstItem');
	 * ```
	 */
	public async didExpire(keyName: string): Promise<boolean> {
		const item: WebPorridge.Payload = await getItemIdb(keyName, this.customStore);

		return didExpire(item[storageKeys.expires]);
	}
}
