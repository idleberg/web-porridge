"use strict";
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
     * Reads data from WebStorage type
     * @param {String} item
     * @param {Object} userOptions
     * @returns {*}
     */
    WebPorridge.prototype.getItem = function (keyName, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        var value = global[this.storageType].getItem(keyName);
        if (subKeyName) {
            var currentItem = this.getItem(keyName) || {};
            return dotProp.get(currentItem, subKeyName);
        }
        return (value && util_1.maybeDeserialize(value)) ? JSON.parse(value) : util_1.maybeBase64Decode(value);
    };
    /**
     * Removes data from WebStorage type
     * @param {String} item
     * @param {Object} userOptions
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
    * Reads from WebStorage type
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
//# sourceMappingURL=index.js.map