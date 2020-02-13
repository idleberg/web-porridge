/**
 * Reads data from WebStorage type
 * @param {String} item
 * @param {Object} userOptions
 * @returns {*}
 */
declare function getItem(keyName: string, subKeyName?: string): any;
/**
 * Removes data from WebStorage type
 * @param {String} item
 * @param {Object} userOptions
 */
declare function removeItem(keyName: string, subKeyName?: string): any;
/**
 * Reads from WebStorage type
 * @param {String} item
 * @param {*} value
 * @param {Object} userOptions
 * @returns {*}
 */
declare function setItem(keyName: string, keyValue: any, subKeyName?: string): any;
/**
 * Clears WebStorage type
 * @returns {*}
 */
declare function clear(): any;
/**
 * Registers an event listener on the window or custom element
 * @param {Element|Window} element
 * @returns {*}
 */
declare function listen(element?: Element | Window): void;
/**
 * Removes an event listener on the window or custom element
 * @param {Element|Window} element
 * @returns {*}
 */
declare function mute(element?: Element | Window): void;
/**
 * Dispatches an event to WebPorridge listeners
 * @param {String} action
 * @param {*} payload
 * @returns {*}
 */
declare function dispatch(action: string, payload: any): void;
declare const _default: {
    listen: typeof listen;
    clear: typeof clear;
    dispatch: typeof dispatch;
    getItem: typeof getItem;
    length: any;
    removeItem: typeof removeItem;
    mute: typeof mute;
    setItem: typeof setItem;
};
export default _default;
