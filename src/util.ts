import type { WebPorridge } from '../types';

export const storageKeys: WebPorridge.StorageKeys = {
	value: '@value',
	type: '@type',
	expires: '@expires'
};

/**
 * Serializes a given type into a string
 * @param {*} item
 * @returns {String}
 */
export function serialize(item: unknown): unknown {
	switch (true) {
		case typeof item === 'bigint':
			return item.toString().valueOf();

		case item instanceof Date:
			return new Date(item as Date).valueOf();

		default:
			return item;
	}
}

/**
 * Deserializes string into given type
 * @param {String} item
 * @returns {*}
 */
export function deserialize(item): unknown {
	const decodedString = item[storageKeys.value];

	switch(item[storageKeys.type]) {
		case 'boolean':
		case 'null':
		case 'number':
		case 'object':
		case 'undefined':
			return decodedString;

		case 'bigint':
			return BigInt(decodedString);

		case 'date':
			return new Date(decodedString);

		case 'string':
			return decodedString.toString();

		default:
			return item;
	}
}

/**
 * Returns the type of a given item
 * @param {*} item
 * @returns {String}
 */
export function getType(item: any): string {
	const type = Object.prototype.toString.call(item);

	switch (type) {
		case '[object Array]':
		case '[object Object]':
			return 'object';

		case '[object BigInt]':
			return 'bigint';

		case '[object Boolean]':
			return 'boolean';

		case '[object Date]':
			return 'date';

		case '[object Null]':
			return 'null';

		case '[object Number]':
			return 'number';

		case '[object String]':
			return 'string';

		case '[object Undefined]':
			return 'undefined';

		default:
			new TypeError(`Type '${type}' cannot be stringified`);
	}
}

/**
 * Runs a check whether a storage item has expired
 * @param {String} expires
 * @returns {boolean}
 */
export function didExpire(expires: string): boolean {
	return expires && new Date(expires) <= new Date();
}

export function eventDispatcher(eventName: string, payload: WebPorridge.StorageEvent) {
	try {
		globalThis.dispatchEvent(
			new CustomEvent(eventName, {
				detail: payload
			})
		);
	} catch (_error) {
		// TODO: fix CustomEvent failing on NodeJS
	}
}

export function addCustomEventListener(eventName: string, keyName: string, callback: (payload: any) => void): void {
	globalThis.addEventListener(eventName, (e: CustomEvent) => {
		if (e.detail.key !== keyName && e.detail.key !== undefined) {
			return;
		}

		if (typeof callback === 'function') {
			callback({
				key: keyName,
				value: e.detail.value
			});
		}
	});
}
