/**
 * Reads data from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {Object} userOptions
 * @returns {*}
 */
declare function getItem(storage: string, keyName: string, subKeyName?: string): any;
/**
 * Removes data from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {Object} userOptions
 */
declare function removeItem(storage: string, keyName: string, subKeyName?: string): any;
/**
 * Reads from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {*} value
 * @param {Object} userOptions
 * @returns {*}
 */
declare function setItem(storage: string, keyName: string, keyValue: any, subKeyName?: string): any;
/**
 * Returns the length of WebStorage type
 * @param {String} storage
 * @param {Integer} index
 * @returns {*}
 */
declare function key(storage: string, index: number): any;
/**
 * Returns the length of WebStorage type
 * @param {String} storage
 * @returns {Integer}
 */
declare function length(storage: string): any;
/**
 * Clears WebStorage type
 * @param {String} storage
 * @returns {*}
 */
declare function clear(storage: string): any;
/**
 * Registers an event listener on the window or custom element
 * @param {String} storage
 * @param {Element|Window} element
 * @returns {*}
 */
declare function listen(storage: string, element?: Element | Window): void;
/**
 * Removes an event listener on the window or custom element
 * @param {String} storage
 * @param {Element|Window} element
 * @returns {*}
 */
declare function mute(storage: string, element?: Element | Window): void;
/**
 * Dispatches an event to WebPorridge listeners
 * @param {String} storage
 * @param {String} action
 * @param {*} payload
 * @returns {*}
 */
declare function dispatch(storage: string, action: string, payload: any): void;
export { clear, dispatch, getItem, key, length, listen, mute, removeItem, setItem };
