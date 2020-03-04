"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotProp = require("dot-prop");
var util_1 = require("./util");
var WebPorridge = /** @class */ (function () {
    function WebPorridge(type) {
        switch (type.toLowerCase()) {
            case 'local':
            case 'localstorage':
                this.storageType = 'localStorage';
                this.title = 'localPorridge';
                break;
            case 'session':
            case 'sessionstorage':
                this.storageType = 'sessionStorage';
                this.title = 'sessionPorridge';
                break;
            default:
                throw 'Invalid storage type specified';
        }
    }
    /**
     * Reads single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     * @returns {*}
     */
    WebPorridge.prototype.getItem = function (keyName, subKeyName, options) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (options === void 0) { options = {}; }
        options = __assign({ decodeBase64: true, decodeJSON: true }, options);
        var value = global[this.storageType].getItem(keyName);
        if (subKeyName) {
            var currentItem = this.getItem(keyName, '', options) || {};
            return dotProp.get(currentItem, subKeyName);
        }
        return (value && util_1.maybeDeserialize(value) && options.decodeJSON === true)
            ? JSON.parse(value)
            : options.decodeBase64 ? util_1.maybeBase64Decode(value, options) : value;
    };
    /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
    WebPorridge.prototype.getItems = function (input, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (util_1.isArray(input)) {
            return input.map(function (item) {
                if (typeof item === 'string') {
                    return _this.getItem(item, null, options);
                }
                else if (util_1.isObject(item)) {
                    return _this.getItem(item.key, item.subKey, options);
                }
                else if (util_1.isArray(item)) {
                    return _this.getItem(item[0], item[1], options);
                }
            });
        }
    };
    /**
     * Removes single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     */
    WebPorridge.prototype.removeItem = function (keyName, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (subKeyName) {
            var currentItem = this.getItem(keyName) || {};
            dotProp.delete(currentItem, subKeyName);
            return this.setItem(keyName, currentItem);
        }
        return global[this.storageType].removeItem(keyName);
    };
    /**
     * Removes datas item from WebStorage type
     * @param {String} input
     */
    WebPorridge.prototype.removeItems = function (input) {
        var _this = this;
        if (util_1.isArray(input)) {
            return input.map(function (item) {
                if (typeof item === 'string') {
                    return _this.removeItem(item);
                }
                else if (util_1.isObject(item)) {
                    return _this.removeItem(item.key, item.subKey);
                }
                else if (util_1.isArray(item)) {
                    return _this.removeItem(item[0], item[1]);
                }
            });
        }
    };
    /**
    * Writes single data item to WebStorage type
    * @param {String} item
    * @param {*} value
    * @param {Object} userOptions
    * @returns {*}
    */
    WebPorridge.prototype.setItem = function (keyName, keyValue, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (subKeyName) {
            var currentItem = this.getItem(keyName) || {};
            dotProp.set(currentItem, subKeyName, keyValue);
            return this.setItem(keyName, currentItem);
        }
        var newValue = (util_1.maybeSerialize(keyValue)) ? JSON.stringify(keyValue) : keyValue;
        return global[this.storageType].setItem(keyName, newValue);
    };
    /**
    * Writes data items to WebStorage type
    * @param {Array} item
    * @returns {*}
    */
    WebPorridge.prototype.setItems = function (input) {
        var _this = this;
        if (util_1.isArray(input)) {
            return input.map(function (item) {
                if (util_1.isObject(item)) {
                    return _this.setItem(item.key, item.value, item.subKey);
                }
                else if (util_1.isArray(item)) {
                    return _this.setItem(item[0], item[1], item[2]);
                }
            });
        }
    };
    /**
     * Returns the length of WebStorage type
     * @param {Integer} index
     * @returns {*}
     */
    WebPorridge.prototype.key = function (index) {
        return global[this.storageType].key(index);
    };
    /**
     * Returns the length of WebStorage type
     * @returns {Integer}
     */
    WebPorridge.prototype.length = function () {
        return global[this.storageType].length;
    };
    /**
     * Clears WebStorage type
     * @returns {*}
     */
    WebPorridge.prototype.clear = function () {
        return global[this.storageType].clear;
    };
    /**
     * Registers an event listener on the window or custom element
     * @param {Element|Window} element
     * @returns {*}
     */
    WebPorridge.prototype.listen = function (element) {
        var _this = this;
        if (element === void 0) { element = window; }
        element.addEventListener(this.title, function (event) { return _this.eventHandler(event); });
    };
    /**
     * Removes an event listener on the window or custom element
     * @param {Element|Window} element
     * @returns {*}
     */
    WebPorridge.prototype.mute = function (element) {
        var _this = this;
        if (element === void 0) { element = window; }
        element.removeEventListener(this.title, function (event) { return _this.eventHandler(event); });
    };
    /**
     * Dispatches an event to WebPorridge listeners
     * @param {String} action
     * @param {*} payload
     * @returns {*}
     */
    WebPorridge.prototype.dispatch = function (action, payload) {
        util_1.validateAction(action);
        var customEvent = new CustomEvent(this.title, {
            detail: {
                action: action,
                payload: payload
            }
        });
        global.dispatchEvent(customEvent);
    };
    /**
     * Event handler
     * @param {Event} event
     * @returns {void}
     */
    WebPorridge.prototype.eventHandler = function (event) {
        util_1.validateAction(event.detail.action);
        var key, value, subKey;
        switch (event.detail.action) {
            case 'getItem':
                key = event.detail.payload.key;
                subKey = event.detail.payload.subKey || '';
                return this.getItem(key, subKey);
            case 'removeItem':
                key = event.detail.payload.key;
                subKey = event.detail.payload.subKey || '';
                return this.removeItem(key, subKey);
            case 'setItem':
                key = event.detail.payload.key;
                value = event.detail.payload.value;
                subKey = event.detail.payload.subKey || '';
                return this.setItem(key, value, subKey);
            case 'key':
                return this.key(event.detail.payload);
            case 'length':
                return this.length();
            case 'clear':
                return this.clear();
            default:
                break;
        }
    };
    return WebPorridge;
}());
var localPorridge = new WebPorridge('local');
exports.localPorridge = localPorridge;
var sessionPorridge = new WebPorridge('session');
exports.sessionPorridge = sessionPorridge;
var util_2 = require("./util");
exports.base64Decode = util_2.base64Decode;
exports.base64Encode = util_2.base64Encode;
//# sourceMappingURL=index.js.map