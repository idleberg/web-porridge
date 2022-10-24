/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
	deserialize,
	didExpire,
	eventDispatcher,
	eventListener,
	getType,
	serialize,
	storageKeys
} from './util';

const eventName = 'storage.didChange';

const validStores = [
	'localStorage',
	'sessionStorage'
];
export class Porridge {
	store: string;

	constructor(store = 'localStorage') {
		if (typeof <any>window !== 'undefined' && !(store in <any>window)) {
			throw Error(`Your browser does not support the ${store} API`);
		} else if (!validStores.includes(store)) {
			throw `Invalid storage type specified, try ${validStores.join('|')} instead`;
		}

		this.store = store;
	}

	/**
	 * Writes single data item to Storage type
	 * @param {String} keyName
	 * @param {unknown} keyValue
	 * @param {Object} [options]
	 * @param {String} [options.expires]
	 * @param {String} [options.prop]
	 *
	 * @returns
	 */
	public setItem(keyName: string, keyValue: unknown, options?: Porridge.StorageOptions): void {
		if (options?.prop?.length) {
			const item = this.getItem(keyName) || {};
			setProperty(item, options.prop, keyValue);

			return this.setItem(keyName, item, {
				...options,
				prop: undefined
			});
		}

		const newValue = {
			[storageKeys.value]: serialize(keyValue),
			[storageKeys.type]: getType(keyValue),
		};

		if (options?.expires && String(options.expires).length) {
			newValue[storageKeys.expires] = new Date(options.expires);
		}

		eventDispatcher(eventName, {
			store: this.store,
			key: keyName,
			value: keyValue
		});

		return (<any>globalThis)[this.store].setItem(keyName, JSON.stringify(newValue));
	}

	/**
	 * Reads single data item from Storage type
	 * @param {String} keyName
	 * @param {Object} [options]
	 * @param {String} [options.expires]
	 * @param {String} [options.prop]
	 * @returns
	 */
	public getItem(keyName: string, options?: Porridge.StorageOptions): string | unknown {
		const item = (<any>globalThis)[this.store].getItem(keyName);

		try {
			const decodedItem: Porridge.Payload = JSON.parse(item);

			if (!decodedItem || (didExpire(decodedItem[storageKeys.expires]))) {
				return null;
			}

			const deserializedItem = deserialize(decodedItem);

			if (decodedItem[storageKeys.type] === 'object' && options?.prop?.length) {
				return getProperty(deserializedItem, options.prop);
			}

			return deserializedItem;
		} catch (err) {
			return item;
		}
	}

	/**
	 * Removes single data item from Storage type
	 * @param {String} keyName
	 * @param {Object} [options]
	 * @param {String} [options.prop]
	 */
	public removeItem(keyName: string, options?: Porridge.StorageOptions): void {
		if (options?.prop?.length) {
			const item = this.getItem(keyName) || {};
			deleteProperty(item, options.prop);

			return this.setItem(keyName, item);
		}

		eventDispatcher(eventName, {
			store: this.store,
			key: keyName,
			value: null
		});

		return (<any>globalThis)[this.store].removeItem(keyName);
	}

	/**
	 * Returns the length of Storage type
	 * @param index
	 * @returns
	 */
	public key(index: number): string | unknown {
		return (<any>globalThis)[this.store].key(index);
	}

	/**
	 * Returns the length of Storage type
	 * @returns
	 */
	public get length(): number {
		return (<any>globalThis)[this.store].length;
	}

	/**
	 * Clears Storage type
	 * @returns
	 */
	public clear(): void {
		eventDispatcher(eventName, {
			store: this.store,
			value: null
		});

		return (<any>globalThis)[this.store].clear();
	}

	/**
	 * Returns whether Storage contains property
	 * @param {String} keyName
	 * @returns {boolean}
	 */
	public hasItem(keyName: string): boolean {
		return Object.keys(<any>globalThis[this.store]).includes(keyName);
	}

	/**
	 * Returns an array of Storage's enumerable property names
	 * @param {String} keyName
	 * @returns {boolean}
	 */
	public keys(): string[] {
		return Object.keys(<any>globalThis[this.store]);
	}

	/**
	 * Returns an array of Storage's enumerable property values
	 * @param {String} keyName
	 * @returns {boolean}
	 */
	public values(): any[] {
		return Object.keys(<any>globalThis[this.store])
			.map(item => this.getItem(item));
	}

	/**
	 * Returns an array of Storage's own enumerable string-keyed property `[key, value]` pairs
	 * @param {String} keyName
	 * @returns {boolean}
	 */
	public entries(): any[] {
		return Object.keys(<any>globalThis[this.store])
			.map(item => [item, this.getItem(item)]);
	}

	/**
	 * Observes value changes of a Storage item. Optionally sends messages to specified origins.
	 * @param {String} keyName
	 * @param {Function} callback
	 * @param {Array} targetOrigins
	 */
	public observe(keyName: string, callback: (payload: any) => void, targetOrigins: string[] = []): void {
		eventListener(eventName, keyName, callback, targetOrigins);
	}

	/**
	 * Returns whether a single Storage item has expired
	 * @param {String} keyName
	 * @returns {boolean}
	 */
	public didExpire(keyName: string): boolean {
		const item = (<any>globalThis)[this.store].getItem(keyName);
		const decodedItem: Porridge.Payload = JSON.parse(item);

		return didExpire(decodedItem[storageKeys.expires]);
	}
}
