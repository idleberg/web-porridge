import type { WebPorridge } from '../types/index.d.ts';

export const storageKeys: WebPorridge.StorageKeys = {
	value: '@value',
	type: '@type',
	expires: '@expires',
};

/**
 * Serializes a given type into a string.
 * @param item
 * @returns
 */
export function serialize(item: unknown): unknown {
	if (typeof item === 'bigint') {
		return item.toString().valueOf();
	}

	if (item instanceof Date) {
		return new Date(item as Date).valueOf();
	}

	return item;
}

/**
 * Deserializes string into given type.
 * @param item
 * @returns
 */
export function deserialize(item: WebPorridge.Payload): unknown {
	const decodedString = item[storageKeys.value];

	switch (item[storageKeys.type]) {
		case 'array':
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
 * Returns the type of a given item.
 * @param item
 * @returns
 */
export function getType(item: unknown): string | undefined {
	const type = Object.prototype.toString.call(item);

	switch (type) {
		case '[object Array]':
			return 'array';

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
			throw new TypeError(`Type '${type}' cannot be stringified`);
	}
}

/**
 * Runs a check whether a storage item has expired
 * @param expires
 * @returns
 */
export function didExpire(expires: string): boolean {
	return new Date(expires) <= new Date();
}

export function eventDispatcher(eventName: string, payload: Omit<WebPorridge.StorageEvent, 'url'>) {
	const storageEvent = new CustomEvent(eventName, {
		detail: {
			...payload,
			url: globalThis.location ? globalThis.location.href : undefined,
		},
	});

	globalThis.dispatchEvent(storageEvent);
}

/**
 * Sorts the storage object keys, as they are not guaranteed to be in a specific order.
 * @param inputObject The object to sort
 * @returns The sorted object
 */
export function getSortedStorageObject(inputObject: Record<string, unknown>): Record<string, unknown> {
	return Object.keys(inputObject)
		.sort()
		.reduce((acc, key) => ({ ...acc, [key]: inputObject[key] }), {});
}
