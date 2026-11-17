import type { Payload, PorridgeStorageEvent, StorageKeys } from './types.ts';

export const storageKeys: StorageKeys = {
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
export function deserialize(item: Payload): unknown {
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
 * Throws if a property can't be accessed on a stored value.
 * @param item The stored value
 * @param prop The property path
 */
export function assertHasProperties(item: unknown, prop: string): asserts item is Record<string, unknown> | unknown[] {
	const type = getType(item);

	if (type !== 'object' && type !== 'array') {
		throw new TypeError(`Cannot access property "${prop}" on a value of type "${type}"`);
	}
}

/**
 * Runs a check whether a storage item has expired
 * @param expires
 * @returns
 */
export function didExpire(expires?: string | number | Date | null): boolean {
	return expires != null && new Date(expires) <= new Date();
}

/**
 * Target for change events: the global object in browsers, a private EventTarget in runtimes where the global object isn't one (e.g. Node.js).
 */
/**
 * Returns the expiry date as a Date, unless it's missing or has already passed.
 * @param expires
 * @returns
 */
export function getActiveExpiry(expires?: string | number | Date | null): Date | undefined {
	return expires != null && !didExpire(expires) ? new Date(expires) : undefined;
}

export const eventTarget: EventTarget =
	typeof globalThis.dispatchEvent === 'function' ? (globalThis as unknown as EventTarget) : new EventTarget();

export function eventDispatcher(eventName: string, payload: Omit<PorridgeStorageEvent, 'url'>) {
	const storageEvent = new CustomEvent(eventName, {
		detail: {
			...payload,
			url: globalThis.location ? globalThis.location.href : undefined,
		},
	});

	eventTarget.dispatchEvent(storageEvent);
}

/**
 * Sorts the storage object keys, as they are not guaranteed to be in a specific order.
 * @param inputObject The object to sort
 * @returns The sorted object
 */
export function getSortedStorageObject(inputObject: Record<string, unknown>): Record<string, unknown> {
	const sortedKeys = Object.keys(inputObject).sort();
	const result: Record<string, unknown> = {};

	for (const key of sortedKeys) {
		result[key] = inputObject[key];
	}

	return result;
}
