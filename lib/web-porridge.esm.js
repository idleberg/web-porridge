const isObject = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor',
]);

const digits = new Set('0123456789');

function getPathSegments(path) {
	const parts = [];
	let currentSegment = '';
	let currentPart = 'start';
	let isIgnoring = false;

	for (const character of path) {
		switch (character) {
			case '\\':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (isIgnoring) {
					currentSegment += character;
				}

				currentPart = 'property';
				isIgnoring = !isIgnoring;
				break;

			case '.':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'property';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (disallowedKeys.has(currentSegment)) {
					return [];
				}

				parts.push(currentSegment);
				currentSegment = '';
				currentPart = 'property';
				break;

			case '[':
				if (currentPart === 'index') {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					currentPart = 'index';
					break;
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += character;
					break;
				}

				if (currentPart === 'property') {
					if (disallowedKeys.has(currentSegment)) {
						return [];
					}

					parts.push(currentSegment);
					currentSegment = '';
				}

				currentPart = 'index';
				break;

			case ']':
				if (currentPart === 'index') {
					parts.push(Number.parseInt(currentSegment, 10));
					currentSegment = '';
					currentPart = 'indexEnd';
					break;
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				// Falls through

			default:
				if (currentPart === 'index' && !digits.has(character)) {
					throw new Error('Invalid character in an index');
				}

				if (currentPart === 'indexEnd') {
					throw new Error('Invalid character after an index');
				}

				if (currentPart === 'start') {
					currentPart = 'property';
				}

				if (isIgnoring) {
					isIgnoring = false;
					currentSegment += '\\';
				}

				currentSegment += character;
		}
	}

	if (isIgnoring) {
		currentSegment += '\\';
	}

	switch (currentPart) {
		case 'property': {
			if (disallowedKeys.has(currentSegment)) {
				return [];
			}

			parts.push(currentSegment);

			break;
		}

		case 'index': {
			throw new Error('Index was not closed');
		}

		case 'start': {
			parts.push('');

			break;
		}
	// No default
	}

	return parts;
}

function isStringIndex(object, key) {
	if (typeof key !== 'number' && Array.isArray(object)) {
		const index = Number.parseInt(key, 10);
		return Number.isInteger(index) && object[index] === object[key];
	}

	return false;
}

function assertNotStringIndex(object, key) {
	if (isStringIndex(object, key)) {
		throw new Error('Cannot use string index');
	}
}

function getProperty(object, path, value) {
	if (!isObject(object) || typeof path !== 'string') {
		return value === undefined ? object : value;
	}

	const pathArray = getPathSegments(path);
	if (pathArray.length === 0) {
		return value;
	}

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		if (isStringIndex(object, key)) {
			object = index === pathArray.length - 1 ? undefined : null;
		} else {
			object = object[key];
		}

		if (object === undefined || object === null) {
			// `object` is either `undefined` or `null` so we want to stop the loop, and
			// if this is not the last bit of the path, and
			// if it didn't return `undefined`
			// it would return `null` if `object` is `null`
			// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
			if (index !== pathArray.length - 1) {
				return value;
			}

			break;
		}
	}

	return object === undefined ? value : object;
}

function setProperty(object, path, value) {
	if (!isObject(object) || typeof path !== 'string') {
		return object;
	}

	const root = object;
	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			object[key] = value;
		} else if (!isObject(object[key])) {
			object[key] = typeof pathArray[index + 1] === 'number' ? [] : {};
		}

		object = object[key];
	}

	return root;
}

function deleteProperty(object, path) {
	if (!isObject(object) || typeof path !== 'string') {
		return false;
	}

	const pathArray = getPathSegments(path);

	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];

		assertNotStringIndex(object, key);

		if (index === pathArray.length - 1) {
			delete object[key];
			return true;
		}

		object = object[key];

		if (!isObject(object)) {
			return false;
		}
	}
}

const storageKeys = {
    value: '@value',
    type: '@type',
    expires: '@expires'
};
/**
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
function serialize(inputString) {
    switch (typeof inputString) {
        case 'bigint':
            return inputString.toString();
        default:
            return inputString;
    }
}
/**
 * Base64-decodes input string
 * @param {*} item
 * @returns {*}
 */
function deserialize(item) {
    const decodedString = item[storageKeys.value];
    switch (item[storageKeys.type]) {
        case 'string':
            return decodedString.toString();
        case 'bigint':
            return BigInt(decodedString);
        default:
            return decodedString;
    }
}
function getType(inputData) {
    const type = Object.prototype.toString.call(inputData);
    switch (type) {
        case '[object Array]':
        case '[object Object]':
            return 'object';
        case '[object BigInt]':
            return 'bigint';
        case '[object Boolean]':
            return 'boolean';
        case '[objectNull]':
            return 'null';
        case '[object Number]':
            return 'number';
        case '[object String]':
            return 'string';
        case '[object Undefined]':
            return 'undefined';
    }
}
function didExpire(expires) {
    return expires && new Date(expires) <= new Date();
}

const validStorageTypes = [
    'localStorage',
    'sessionStorage'
];
class WebPorridge {
    type;
    constructor(type = 'localStorage') {
        if (typeof window !== 'undefined' && !(type in window)) {
            throw Error(`Your browser does not support ${type}`);
        }
        else if (!validStorageTypes.includes(type)) {
            throw `Invalid storage type specified, try ${validStorageTypes.join('|')} instead`;
        }
        this.type = type;
    }
    /**
     * Writes single data item to WebStorage type
     * @param {String} keyName
     * @param {unknown} keyValue
     * @param {Object} [options]
     * @param {String} [options.expires]
     * @param {String} [options.key]
     *
     * @returns
     */
    setItem(keyName, keyValue, options) {
        if (options?.key?.length) {
            const item = this.getItem(keyName) || {};
            setProperty(item, options.key, keyValue);
            return this.setItem(keyName, item, {
                ...options,
                key: undefined
            });
        }
        const newValue = {
            [storageKeys.value]: serialize(keyValue),
            [storageKeys.type]: getType(keyValue),
        };
        if (options?.expires && String(options.expires).length) {
            newValue[storageKeys.expires] = new Date(options.expires);
        }
        return globalThis[this.type].setItem(keyName, JSON.stringify(newValue));
    }
    /**
     * Reads single data item from WebStorage type
     * @param {String} keyName
     * @param {Object} [options]
     * @param {String} [options.expires]
     * @param {String} [options.key]
     * @returns
     */
    getItem(keyName, options) {
        const item = JSON.parse(globalThis[this.type].getItem(keyName));
        if (!item || (didExpire(item[storageKeys.expires]))) {
            return null;
        }
        const decodedItem = deserialize(item);
        if (item[storageKeys.type] === 'object' && options?.key?.length) {
            return getProperty(decodedItem, options.key);
        }
        return decodedItem;
    }
    /**
     * Removes single data item from WebStorage type
     * @param {String} keyName
     * @param {String} subKeyName
     */
    removeItem(keyName, subKeyName = '') {
        if (subKeyName?.length) {
            const item = this.getItem(keyName) || {};
            deleteProperty(item, subKeyName);
            return this.setItem(keyName, item);
        }
        return globalThis[this.type].removeItem(keyName);
    }
    /**
     * Returns the length of WebStorage type
     * @param index
     * @returns
     */
    key(index) {
        return globalThis[this.type].key(index);
    }
    /**
     * Returns the length of WebStorage type
     * @returns
     */
    get length() {
        return globalThis[this.type].length;
    }
    /**
     * Clears WebStorage type
     * @returns
     */
    clear() {
        return globalThis[this.type].clear();
    }
}

/**
 * Work around Safari 14 IndexedDB open bug.
 *
 * Safari has a horrible bug where IDB requests can hang while the browser is starting up. https://bugs.webkit.org/show_bug.cgi?id=226547
 * The only solution is to keep nudging it until it's awake.
 */
function idbReady() {
    var isSafari = !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent);
    // No point putting other browsers or older versions of Safari through this mess.
    if (!isSafari || !indexedDB.databases)
        return Promise.resolve();
    var intervalId;
    return new Promise(function (resolve) {
        var tryIdb = function () { return indexedDB.databases().finally(resolve); };
        intervalId = setInterval(tryIdb, 100);
        tryIdb();
    }).finally(function () { return clearInterval(intervalId); });
}

function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    const dbp = idbReady().then(() => {
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        return promisifyRequest(request);
    });
    return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(store, callback) {
    store.openCursor().onsuccess = function () {
        if (!this.result)
            return;
        callback(this.result);
        this.result.continue();
    };
    return promisifyRequest(store.transaction);
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
    });
}

class WebPorridgeDB {
    store;
    constructor(options) {
        if (typeof window !== 'undefined' && !('indexedDB' in window)) {
            throw Error(`Your browser does not support IndexedDB`);
        }
        const { db, name } = {
            db: 'WebPorridge',
            name: '(default store)',
            ...options
        };
        this.store = createStore(db, name);
    }
    /**
     * Writes single data item to IndexedDB
     * @param {String} keyName
     * @param {unknown} keyValue
     * @param {Object} [options]
     * @param {String} [options.expires]
     * @param {String} [options.key]
     *
     * @returns
     */
    async setItem(keyName, keyValue, options = {}) {
        if (options?.key?.length) {
            const item = await this.getItem(keyName) || {};
            setProperty(item, options.key, keyValue);
            return await this.setItem(keyName, item, {
                ...options,
                key: undefined
            });
        }
        const newValue = {
            [storageKeys.value]: serialize(keyValue),
            [storageKeys.type]: getType(keyValue)
        };
        if (options?.expires && String(options.expires).length) {
            newValue[storageKeys.expires] = new Date(options.expires);
        }
        return await set(keyName, newValue, this.store);
    }
    /**
     * Reads single data item from IndexedDB
     * @param {String} keyName
     * @param {Object} [options]
     * @param {String} [options.expires]
     * @param {String} [options.key]
     * @returns
     */
    async getItem(keyName, options) {
        const item = await get(keyName, this.store);
        if (!item || didExpire(item[storageKeys.expires])) {
            return null;
        }
        const decodedItem = deserialize(item);
        if (item[storageKeys.type] === 'object' && options?.key?.length) {
            return getProperty(decodedItem, options.key);
        }
        return decodedItem;
    }
    /**
     * Removes single data item from IndexedDB
     * @param {String} keyName
     * @param {String} subKeyName
     */
    async removeItem(keyName, subKeyName = '') {
        if (subKeyName?.length) {
            const item = await this.getItem(keyName) || {};
            deleteProperty(item, subKeyName);
            return await this.setItem(keyName, item);
        }
        return await del(keyName, this.store);
    }
    /**
     * Returns the length of IndexedDB
     * @param index
     * @returns
     */
    async key(index) {
        return (await keys(this.store))[index];
    }
    /**
     * Returns the length of IndexedDB
     * @returns
     */
    get length() {
        return (async () => {
            return (await keys(this.store)).length;
        })();
    }
    /**
     * Clears IndexedDB
     * @returns
     */
    async clear() {
        return await clear(this.store);
    }
}

export { WebPorridge, WebPorridgeDB };
//# sourceMappingURL=web-porridge.esm.js.map
