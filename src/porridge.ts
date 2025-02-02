/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import type { WebPorridge } from '../types/index.d.ts';
import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
	deserialize,
	didExpire,
	eventDispatcher,
	getType,
	serialize,
	storageKeys,
} from './util';

const validStores = ['localStorage', 'sessionStorage'];

/**
 * Instantiates the class with provided options.
 * @param storageArea The storage area to use
 * @param eventName The event name to use
 *
 * @example
 * ```js
 * const localPorridge = new Porridge();
 * ```
 */
export class Porridge {
	#eventName: string;
	#storageArea: 'localStorage' | 'sessionStorage';

	constructor(storageArea: 'localStorage' | 'sessionStorage' = 'localStorage', eventName = 'porridge.didChange') {
		if (!validStores.includes(storageArea)) {
			throw new TypeError(`Invalid storage type specified, try ${validStores.join(' or ')} instead`);
		}

		if (typeof (globalThis) !== 'undefined' && !(storageArea in globalThis)) {
			throw new Error(`Your browser does not support the ${storageArea} API`);
		}

		this.#storageArea = storageArea;

		if (typeof eventName !== 'string') {
			throw new TypeError(`Event name must be of type "string", got "${typeof eventName}"`);
		}

		this.#eventName = eventName;
	}

	/**
	 * Writes single data item to Storage type.
	 * @param keyName The key to write
	 * @param keyValue The value to write
	 * @param [options] Additional options
	 * @param [options.expires] The expiry date
	 * @param [options.prop] The object property to write
	 *
	 * @example
	 * ```js
	 * localPorridge.setItem('firstItem', 'Hello World');
	 *
	 * localPorridge.setItem('secondItem', { name: 'John Appleseed' });
	 * localPorridge.setItem('secondItem', 'Ada Lovelace', { prop: 'name' });
	 * ```
	 */
	public setItem(keyName: string, keyValue: unknown, options?: WebPorridge.StorageOptions): void {
		const oldValue = this.getItem(keyName, options);

		if (options?.prop?.length) {
			const item = this.getItem(keyName) || {};
			setProperty(item, options.prop, keyValue);

			return this.setItem(keyName, item, {
				...options,
				prop: undefined,
			});
		}

		const newValue = {
			[storageKeys.value]: serialize(keyValue),
			[storageKeys.type]: getType(keyValue),
			[storageKeys.expires]: options?.expires ?? undefined,
		};

		globalThis[this.#storageArea].setItem(keyName, JSON.stringify(newValue));

		eventDispatcher(this.#eventName, {
			key: keyName,
			oldValue: oldValue,
			newValue: keyValue,
			storageArea: Object.fromEntries(this.entries()),
		});
	}

	/**
	 * Reads single data item from Storage type.
	 * @param keyName The key to read
	 * @param [options] Additional options
	 * @param [options.expires] The expiry date
	 * @param [options.prop] The object property to read
	 * @returns
	 *
	 * @example
	 * ```js
	 * localPorridge.getItem('firstItem');
	 * localPorridge.getItem('secondItem', { prop: 'dot.notation.property' });
	 * ```
	 */
	public getItem(keyName: string, options?: WebPorridge.StorageOptions): unknown {
		const item = globalThis[this.#storageArea].getItem(keyName) || 'null';

		try {
			const decodedItem: WebPorridge.Payload = JSON.parse(item);

			if (!decodedItem || didExpire(decodedItem[storageKeys.expires] || '')) {
				return null;
			}

			const deserializedItem = deserialize(decodedItem);

			if (decodedItem[storageKeys.type] === 'object' && options?.prop?.length) {
				return getProperty(deserializedItem, options.prop);
			}

			return deserializedItem;
		} catch (_error) {
			return item;
		}
	}

	/**
	 * Removes single data item from Storage type.
	 * @param keyName The key to remove
	 * @param [options] Additional options
	 * @param [options.prop] The object property to remove
	 *
	 * @example
	 * ```js
	 * localPorridge.removeItem('firstItem');
	 * localPorridge.removeItem('secondItem', { prop: 'dot.notation.property' });
	 * ```
	 */
	public removeItem(keyName: string, options?: WebPorridge.StorageOptions): void {
		const oldValue = this.getItem(keyName, options);

		if (options?.prop?.length) {
			const item = this.getItem(keyName) || {};
			deleteProperty(item, options.prop);

			return this.setItem(keyName, item);
		}

		globalThis[this.#storageArea].removeItem(keyName);

		eventDispatcher(this.#eventName, {
			key: keyName,
			oldValue: oldValue,
			newValue: null,
			storageArea: Object.fromEntries(this.entries()),
		});
	}

	/**
	 * Returns the length of Storage type.
	 * @param index The index to retrieve
	 * @returns The key
	 */
	public key(index: number): unknown {
		return globalThis[this.#storageArea].key(index);
	}

	/**
	 * Returns the length of Storage type.
	 * @returns The number of Storage items
	 *
	 * @example
	 * ```js
	 * localPorridge.length;
	 * ```
	 */
	public get length(): number {
		return globalThis[this.#storageArea].length;
	}

	/**
	 * Clears Storage type
	 *
	 * @example
	 * ```js
	 * localPorridge.clear();
	 * ```
	 */
	public clear(): void {
		globalThis[this.#storageArea].clear();

		eventDispatcher(this.#eventName, {
			key: null,
			oldValue: null,
			newValue: null,
			storageArea: {},
		});
	}

	/**
	 * Returns whether Storage contains property.
	 * @param keyName The key to check
	 * @returns Whether the key exists
	 *
	 * @example
	 * ```js
	 * localPorridge.hasItem('firstItem');
	 * ```
	 */
	public hasItem(keyName: string): boolean {
		return Object.keys(globalThis[this.#storageArea]).includes(keyName);
	}

	/**
	 * Returns an array of Storage's enumerable property names.
	 * @param keyName The key to check
	 * @returns An array of keys
	 *
	 * @example
	 * ```js
	 * localPorridge.keys();
	 * ```
	 */
	public keys(): string[] {
		return Object.keys(globalThis[this.#storageArea]);
	}

	/**
	 * Returns an array of Storage's enumerable property values.
	 * @param keyName The key to check
	 * @returns An array of values
	 *
	 * @example
	 * ```js
	 * localPorridge.values();
	 * ```
	 */
	public values(): unknown[] {
		return Object.keys(globalThis[this.#storageArea]).map((item) => this.getItem(item));
	}

	/**
	 * Returns an array of Storage's own enumerable string-keyed property `[key, value]` pairs.
	 * @param keyName The key to check
	 * @returns	An array of key-value pairs
	 *
	 * @example
	 * ```js
	 * localPorridge.entries();
	 * ```
	 */
	public entries(): [string, unknown][] {
		return Object.keys(globalThis[this.#storageArea]).map((item: string) => [item, this.getItem(item)]);
	}

	/**
	 * Observes value changes of a Storage item.
	 * @param keyName The key to observe
	 * @param callback The function to be called when the event is triggered
	 * @returns A function to stop observing
	 *
	 * @example
	 * ```js
	 * const unobserve = localPorridge.observe('demo', ({ key, newValue }) => {
	 * 	console.log(`${key} has changed to:`, value);
	 * });
	 *
	 * // Later, to stop observing
	 * unobserve();
	 * ```
	 */
	public observe(keyName: string, callback: (data: WebPorridge.StorageEvent) => void): () => void {
		if (typeof callback !== 'function') {
			throw new TypeError('The callback argument is not a function');
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
	 * Returns whether a single Storage item has expired.
	 * @param keyName The key to check
	 * @returns Whether the item has expired
	 *
	 * @example
	 * ```js
	 * localPorridge.didExpire('firstItem');
	 * ```
	 */
	public didExpire(keyName: string): boolean {
		const item = globalThis[this.#storageArea].getItem(keyName);

		if (!item) {
			return false;
		}

		const decodedItem: WebPorridge.Payload = JSON.parse(item);

		return didExpire(decodedItem[storageKeys.expires] || '-1');
	}
}
