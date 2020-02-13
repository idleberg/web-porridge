"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = require("./util");
var title = 'localPorridge';
var storage = 'localStorage';
/**
 * Reads data from WebStorage type
 * @param {String} item
 * @param {Object} userOptions
 * @returns {*}
 */
function getItem(keyName, subKeyName) {
    if (subKeyName === void 0) { subKeyName = ''; }
    return Util.getItem(storage, keyName, subKeyName);
}
/**
 * Removes data from WebStorage type
 * @param {String} item
 * @param {Object} userOptions
 */
function removeItem(keyName, subKeyName) {
    if (subKeyName === void 0) { subKeyName = ''; }
    return Util.removeItem(storage, keyName, subKeyName);
}
/**
 * Reads from WebStorage type
 * @param {String} item
 * @param {*} value
 * @param {Object} userOptions
 * @returns {*}
 */
function setItem(keyName, keyValue, subKeyName) {
    if (subKeyName === void 0) { subKeyName = ''; }
    return Util.setItem(storage, keyName, keyValue, subKeyName);
}
/**
 * Returns the length of WebStorage type
 * @param {Integer} index
 * @returns {*}
 */
function key(index) {
    return global[storage].key(index);
}
/**
 * Clears WebStorage type
 * @returns {*}
 */
function clear() {
    return Util.clear(storage);
}
/**
 * Returns the length of WebStorage type
 * @returns {Integer}
 */
function __length__() {
    return Util.length(storage);
}
var length = __length__();
/**
 * Registers an event listener on the window or custom element
 * @param {Element|Window} element
 * @returns {*}
 */
function listen(element) {
    if (element === void 0) { element = window; }
    return Util.listen(title, element);
}
/**
 * Removes an event listener on the window or custom element
 * @param {Element|Window} element
 * @returns {*}
 */
function mute(element) {
    if (element === void 0) { element = window; }
    return Util.mute(title, element);
}
/**
 * Dispatches an event to WebPorridge listeners
 * @param {String} action
 * @param {*} payload
 * @returns {*}
 */
function dispatch(action, payload) {
    return Util.dispatch(title, action, payload);
}
exports.default = {
    listen: listen,
    clear: clear,
    dispatch: dispatch,
    getItem: getItem,
    length: length,
    removeItem: removeItem,
    mute: mute,
    setItem: setItem
};
//# sourceMappingURL=local-storage.js.map