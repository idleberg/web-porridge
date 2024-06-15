/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import type { WebPorridge } from '../types';
import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
	addCustomEventListener,
	deserialize,
	didExpire,
	eventDispatcher,
	getType,
	serialize,
	storageKeys,
} from './util';

const validStores = ['localStorage', 'sessionStorage'];

/**
 * Instantiates the class with provided options
 * @param {'localStorage' | 'sessionStorage'} store
 * @param {string} [eventName]
 *
 * @example
 * ```js
 * const localPorridge = new Porridge();
 * ```
 */
export class Porridge {
	eventName: string;
	storageArea: 'localStorage' | 'sessionStorage';

	constructor(storageArea: 'localStorage' | 'sessionStorage' = 'localStorage', eventName = 'porridge.didChange') {
		if (typeof eventName !== 'string') {
			throw new TypeError('Event name must be of type "string"');
		}

		this.eventName = eventName;

		if (typeof (<any>window) !== 'undefined' && !(storageArea in <any>window)) {
			throw new Error(`Your browser does not support the ${storageArea} API`);
		} else if (!validStores.includes(storageArea)) {
			throw new TypeError(`Invalid storage type specified, try ${validStores.join('|')} instead`);
		}

		this.storageArea = storageArea;
	}

	/**
	 * Writes single data item to Storage type
	 * @param {string} keyName
	 * @param {unknown} keyValue
	 * @param {Object} [options]
	 * @param {string} [options.expires]
	 * @param {string} [options.prop]
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
		};

		if (options?.expires && String(options.expires).length) {
			newValue[storageKeys.expires] = new Date(options.expires);
		}

		eventDispatcher(this.eventName, {
			storageArea: this.storageArea,
			key: keyName,
			oldValue: oldValue,
			newValue: keyValue,
		});

		return (<any>globalThis)[this.storageArea].setItem(keyName, JSON.stringify(newValue));
	}

	/**
	 * Reads single data item from Storage type
	 * @param {string} keyName
	 * @param {WebPorridge.StorageOptions} [options]
	 * @param {string} [options.expires]
	 * @param {string} [options.prop]
	 * @returns {unknown}
	 *
	 * @example
	 * ```js
	 * localPorridge.getItem('firstItem');
	 * localPorridge.getItem('secondItem', { prop: 'dot.notation.property' });
	 * ```
	 */
	public getItem(keyName: string, options?: WebPorridge.StorageOptions): unknown {
		const item = (<any>globalThis)[this.storageArea].getItem(keyName);

		try {
			const decodedItem: WebPorridge.Payload = JSON.parse(item);

			if (!decodedItem || didExpire(decodedItem[storageKeys.expires])) {
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
	 * Removes single data item from Storage type
	 * @param {string} keyName
	 * @param {Object} [options]
	 * @param {string} [options.prop]
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

		eventDispatcher(this.eventName, {
			storageArea: this.storageArea,
			key: keyName,
			oldValue: oldValue,
			newValue: null,
		});

		return (<any>globalThis)[this.storageArea].removeItem(keyName);
	}

	/**
	 * Returns the length of Storage type
	 * @param index
	 * @returns {unknown}
	 */
	public key(index: number): unknown {
		return (<any>globalThis)[this.storageArea].key(index);
	}

	/**
	 * Returns the length of Storage type
	 * @returns {number}
	 *
	 * @example
	 * ```js
	 * localPorridge.length;
	 * ```
	 */
	public get length(): number {
		return (<any>globalThis)[this.storageArea].length;
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
		eventDispatcher(this.eventName, {
			storageArea: this.storageArea,
			oldValue: null,
			newValue: null,
		});

		return (<any>globalThis)[this.storageArea].clear();
	}

	/**
	 * Returns whether Storage contains property
	 * @param {string} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * localPorridge.hasItem('firstItem');
	 * ```
	 */
	public hasItem(keyName: string): boolean {
		return Object.keys(globalThis[this.storageArea]).includes(keyName);
	}

	/**
	 * Returns an array of Storage's enumerable property names
	 * @param {string} keyName
	 * @returns {string[]}
	 *
	 * @example
	 * ```js
	 * localPorridge.keys();
	 * ```
	 */
	public keys(): string[] {
		return Object.keys(globalThis[this.storageArea]);
	}

	/**
	 * Returns an array of Storage's enumerable property values
	 * @param {string} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * localPorridge.values();
	 * ```
	 */
	public values(): unknown[] {
		return Object.keys(globalThis[this.storageArea]).map((item) => this.getItem(item));
	}

	/**
	 * Returns an array of Storage's own enumerable string-keyed property `[key, value]` pairs
	 * @param {string} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * localPorridge.entries();
	 * ```
	 */
	public entries(): [string, unknown][] {
		return Object.keys(globalThis[this.storageArea]).map((item: string) => [item, this.getItem(item)]);
	}

	/**
	 * Observes value changes of a Storage item.
	 * @param {string} keyName
	 * @param {Function} callback
	 *
	 * @example
	 * ```js
	 * localPorridge.observe('demo', ({ key, value }) => {
	 * 	console.log(`${key} has changed to:`, value);
	 * });
	 * ```
	 */
	public observe(keyName: string, callback: (payload: WebPorridge.StorageEvent) => void): void {
		if (typeof callback !== 'function') {
			throw new TypeError('The callback argument is not a function');
		}

		addCustomEventListener(this.eventName, keyName, callback);
	}

	/**
	 * Returns whether a single Storage item has expired
	 * @param {string} keyName
	 * @returns {boolean}
	 *
	 * @example
	 * ```js
	 * localPorridge.didExpire('firstItem');
	 * ```
	 */
	public didExpire(keyName: string): boolean {
		const item = (<any>globalThis)[this.storageArea].getItem(keyName);
		const decodedItem: WebPorridge.Payload = JSON.parse(item);

		return didExpire(decodedItem[storageKeys.expires]);
	}
}
