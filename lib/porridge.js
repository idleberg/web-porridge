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
var WebPorridge = (function () {
    function WebPorridge(type, userOptions) {
        if (userOptions === void 0) { userOptions = {}; }
        this.options = {
            base64: false,
            json: true
        };
        if (!type) {
            throw Error('Storage type not declared in constructor');
        }
        else if (typeof window !== 'undefined' && !(type in window)) {
            throw Error("Your browser does not support " + type);
        }
        switch (type) {
            case 'localStorage':
                this.title = 'localPorridge';
                break;
            case 'sessionStorage':
                this.title = 'sessionPorridge';
                break;
            default:
                throw 'Invalid storage type specified';
        }
        this.options = __assign(__assign({}, this.options), userOptions);
        this.storageType = type;
    }
    WebPorridge.prototype.getItem = function (keyName, subKeyName, options) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (options === void 0) { options = {}; }
        options = __assign(__assign({}, this.options), options);
        if (subKeyName) {
            var currentItem = this.getItem(keyName, '', options) || {};
            return dotProp.get(currentItem, subKeyName);
        }
        var value = global[this.storageType].getItem(keyName);
        return (value && util_1.maybeDeserialize(value) && options.json === true)
            ? JSON.parse(value)
            : value;
    };
    WebPorridge.prototype.getJSON = function (keyName, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        var item = this.getItem(keyName, null, { json: true });
        item = (item && util_1.maybeDeserialize(item))
            ? JSON.parse(item)
            : item;
        return (subKeyName === null || subKeyName === void 0 ? void 0 : subKeyName.length) ? dotProp.get(item, subKeyName)
            : item;
    };
    WebPorridge.prototype.getBase64 = function (keyName, subKeyName, options) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (options === void 0) { options = {}; }
        options = __assign(__assign({}, this.options), options);
        var encodedItem = this.getItem(keyName, null, options);
        var value;
        if ((subKeyName === null || subKeyName === void 0 ? void 0 : subKeyName.length) || options.json === true) {
            var decodedItem = util_1.maybeBase64Decode(encodedItem);
            value = (subKeyName === null || subKeyName === void 0 ? void 0 : subKeyName.length) ? dotProp.get(decodedItem, subKeyName)
                : decodedItem;
        }
        else {
            value = util_1.maybeBase64Decode(encodedItem, false);
        }
        return value;
    };
    WebPorridge.prototype.getItems = function (input, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (util_1.isArray(input)) {
            return input.map(function (item) {
                if (typeof item === 'string') {
                    return _this.getItem(item, null, options);
                }
                else if (util_1.isObject(item)) {
                    options = __assign(__assign({}, options), item.options);
                    return _this.getItem(item.key, item.subKey, options);
                }
                else if (util_1.isArray(item)) {
                    options = __assign(__assign({}, options), item[2]);
                    return _this.getItem(item[0], item[1], options);
                }
            });
        }
    };
    WebPorridge.prototype.removeItem = function (keyName, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (subKeyName) {
            var currentItem = this.getItem(keyName) || {};
            dotProp.delete(currentItem, subKeyName);
            return this.setItem(keyName, currentItem);
        }
        return global[this.storageType].removeItem(keyName);
    };
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
    WebPorridge.prototype.setItem = function (keyName, keyValue, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (subKeyName) {
            var currentItem = this.getItem(keyName) || {};
            dotProp.set(currentItem, subKeyName, keyValue);
            return this.setItem(keyName, currentItem);
        }
        var newValue = (util_1.maybeSerialize(keyValue))
            ? JSON.stringify(keyValue)
            : keyValue;
        return global[this.storageType].setItem(keyName, newValue);
    };
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
    WebPorridge.prototype.key = function (index) {
        return global[this.storageType].key(index);
    };
    Object.defineProperty(WebPorridge.prototype, "length", {
        get: function () {
            return global[this.storageType].length;
        },
        enumerable: false,
        configurable: true
    });
    WebPorridge.prototype.clear = function () {
        return global[this.storageType].clear();
    };
    WebPorridge.prototype.listen = function (element) {
        var _this = this;
        if (element === void 0) { element = window; }
        element.addEventListener(this.title, function (event) { return _this.eventHandler(event); });
    };
    WebPorridge.prototype.mute = function (element) {
        var _this = this;
        if (element === void 0) { element = window; }
        element.removeEventListener(this.title, function (event) { return _this.eventHandler(event); });
    };
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
    WebPorridge.prototype.eventHandler = function (event) {
        var _a = event.detail, action = _a.action, options = _a.options, payload = _a.payload;
        util_1.validateAction(action);
        var key, value, subKey, opts;
        switch (action) {
            case 'getItem':
                key = payload.key;
                subKey = payload.subKey || '';
                opts = options || {};
                return this.getItem(key, subKey, options);
            case 'getItems':
                key = payload;
                opts = options || {};
                return this.getItems(key, options);
            case 'removeItem':
                key = payload.key;
                subKey = payload.subKey || '';
                return this.removeItem(key, subKey);
            case 'removeItems':
                key = payload;
                return this.removeItems(key);
            case 'setItem':
                key = payload.key;
                value = payload.value;
                subKey = payload.subKey || '';
                return this.setItem(key, value, subKey);
            case 'setItems':
                key = payload;
                return this.setItems(key);
            case 'key':
                return this.key(payload);
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
exports.default = WebPorridge;
//# sourceMappingURL=porridge.js.map