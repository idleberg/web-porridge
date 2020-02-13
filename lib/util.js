"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotProp = require("dot-prop");
var serializables = [
    '[object Array]',
    '[object Object]'
];
/**
 * Checks whether input data requires deserialization after readin it from WebStorage
 * @param {*} data
 * @returns {boolean}
 */
function maybeDeserialize(data) {
    try {
        var result = JSON.parse(data);
        var type = Object.prototype.toString.call(result);
        return serializables.includes(type);
    }
    catch (error) {
        return false;
    }
}
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} data
 * @returns {boolean}
 */
function maybeSerialize(data) {
    var type = Object.prototype.toString.call(data);
    return serializables.includes(type);
}
function isValidAction(action) {
    return [
        'clear',
        'getItem',
        'removeItem',
        'setItem',
    ].includes(action);
}
/**
 * Reads data from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {Object} userOptions
 * @returns {*}
 */
function getItem(storage, keyName, subKeyName) {
    if (subKeyName === void 0) { subKeyName = ''; }
    var value = global[storage].getItem(keyName);
    if (subKeyName) {
        var currentItem = getItem(storage, keyName) || {};
        return dotProp.get(currentItem, subKeyName);
    }
    return (value && maybeDeserialize(value)) ? JSON.parse(value) : value;
}
exports.getItem = getItem;
/**
 * Removes data from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {Object} userOptions
 */
function removeItem(storage, keyName, subKeyName) {
    if (subKeyName === void 0) { subKeyName = ''; }
    if (subKeyName) {
        var currentItem = getItem(storage, keyName) || {};
        dotProp.delete(currentItem, subKeyName);
        return setItem(storage, keyName, currentItem);
    }
    return global[storage].removeItem(keyName);
}
exports.removeItem = removeItem;
/**
 * Reads from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {*} value
 * @param {Object} userOptions
 * @returns {*}
 */
function setItem(storage, keyName, keyValue, subKeyName) {
    if (subKeyName === void 0) { subKeyName = ''; }
    if (subKeyName) {
        var currentItem = getItem(storage, keyName) || {};
        dotProp.set(currentItem, subKeyName, keyValue);
        return setItem(storage, keyName, currentItem);
    }
    var newValue = (maybeSerialize(keyValue)) ? JSON.stringify(keyValue) : keyValue;
    return global[storage].setItem(keyName, newValue);
}
exports.setItem = setItem;
/**
 * Returns the length of WebStorage type
 * @param {String} storage
 * @param {Integer} index
 * @returns {*}
 */
function key(storage, index) {
    return global[storage].key(index);
}
exports.key = key;
/**
 * Returns the length of WebStorage type
 * @param {String} storage
 * @returns {Integer}
 */
function length(storage) {
    return global[storage].length;
}
exports.length = length;
/**
 * Clears WebStorage type
 * @param {String} storage
 * @returns {*}
 */
function clear(storage) {
    return global[storage].clear;
}
exports.clear = clear;
/**
 * Registers an event listener on the window or custom element
 * @param {String} storage
 * @param {Element|Window} element
 * @returns {*}
 */
function listen(storage, element) {
    if (element === void 0) { element = window; }
    element.addEventListener(storage, function (event) { return eventHandler(storage, event); });
}
exports.listen = listen;
/**
 * Removes an event listener on the window or custom element
 * @param {String} storage
 * @param {Element|Window} element
 * @returns {*}
 */
function mute(storage, element) {
    if (element === void 0) { element = window; }
    element.removeEventListener(storage, function (event) { return eventHandler(storage, event); });
}
exports.mute = mute;
/**
 * Dispatches an event to WebPorridge listeners
 * @param {String} storage
 * @param {String} action
 * @param {*} payload
 * @returns {*}
 */
function dispatch(storage, action, payload) {
    if (!isValidAction(action)) {
        throw 'Invalid action argument provided';
    }
    var customEvent = new CustomEvent(storage, {
        detail: {
            action: action,
            payload: payload
        }
    });
    global.dispatchEvent(customEvent);
}
exports.dispatch = dispatch;
/**
 * Event handler
 * @param {String} storage
 * @param {Event} event
 * @returns {void}
 */
function eventHandler(storage, event) {
    var key, value, subkey;
    switch (event.detail.action) {
        case 'getItem':
            key = event.detail.payload.key;
            subkey = event.detail.payload.subkey || '';
            return getItem(storage, key, subkey);
        case 'removeItem':
            key = event.detail.payload.key;
            subkey = event.detail.payload.subkey || '';
            return removeItem(storage, key, subkey);
        case 'setItem':
            key = event.detail.payload.key;
            value = event.detail.payload.value;
            subkey = event.detail.payload.subkey || '';
            return setItem(storage, key, value, subkey);
        case 'key':
            return key(storage, event.detail.payload);
        case 'length':
            return length(storage);
        case 'clear':
            return clear(storage);
        default:
            throw 'Invalid action argument provided';
    }
}
//# sourceMappingURL=util.js.map