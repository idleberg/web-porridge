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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var idb_keyval_1 = require("idb-keyval");
var dotProp = require("dot-prop");
var util_1 = require("./util");
var WebPorridgeDB = /** @class */ (function () {
    function WebPorridgeDB(userOptions) {
        if (userOptions === void 0) { userOptions = {}; }
        this.title = 'WebPorridge';
        this.options = {
            decodeBase64: true,
            decodeJSON: true
        };
        this.options = __assign(__assign({}, this.options), userOptions);
        this.store = new idb_keyval_1.Store(this.title, '(default)');
    }
    /**
     * Reads single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     * @returns {*}
     */
    WebPorridgeDB.prototype.getItem = function (keyName, subKeyName, options) {
        if (subKeyName === void 0) { subKeyName = ''; }
        if (options === void 0) { options = {}; }
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var value, currentItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = __assign(__assign({}, this.options), options);
                        return [4 /*yield*/, idb_keyval_1.get(keyName, this.store)];
                    case 1:
                        value = (_a = _b.sent()) !== null && _a !== void 0 ? _a : null;
                        if (!subKeyName) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getItem(keyName, null, options)];
                    case 2:
                        currentItem = (_b.sent()) || {};
                        return [2 /*return*/, dotProp.get(currentItem, subKeyName)];
                    case 3: return [2 /*return*/, (value && util_1.maybeDeserialize(value) && options.decodeJSON === true)
                            ? JSON.parse(value)
                            : options.decodeBase64 ? util_1.maybeBase64Decode(value, options) : value];
                }
            });
        });
    };
    /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
    WebPorridgeDB.prototype.getItems = function (input, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!util_1.isArray(input)) return [3 /*break*/, 3];
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, input.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(typeof item === 'string')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.getItem(item, null, options)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2:
                                            if (!util_1.isObject(item)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.getItem(item.key, item.subKey, options)];
                                        case 3: return [2 /*return*/, _a.sent()];
                                        case 4:
                                            if (!util_1.isArray(item)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, this.getItem(item[0], item[1], options)];
                                        case 5: return [2 /*return*/, _a.sent()];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes single data item from WebStorage type
     * @param {String} item
     * @param {Object} subKeyName
     */
    WebPorridgeDB.prototype.removeItem = function (keyName, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var currentItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!subKeyName) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getItem(keyName)];
                    case 1:
                        currentItem = (_a.sent()) || {};
                        dotProp.delete(currentItem, subKeyName);
                        return [4 /*yield*/, this.setItem(keyName, currentItem)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, idb_keyval_1.del(keyName, this.store)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Removes datas item from WebStorage type
     * @param {String} input
     */
    WebPorridgeDB.prototype.removeItems = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!util_1.isArray(input)) return [3 /*break*/, 3];
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, input.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (typeof item === 'string') {
                                        return [2 /*return*/, this.removeItem(item)];
                                    }
                                    else if (util_1.isObject(item)) {
                                        return [2 /*return*/, this.removeItem(item.key, item.subKey)];
                                    }
                                    else if (util_1.isArray(item)) {
                                        return [2 /*return*/, this.removeItem(item[0], item[1])];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Writes single data item to WebStorage type
    * @param {String} item
    * @param {*} value
    * @param {Object} userOptions
    * @returns {*}
    */
    WebPorridgeDB.prototype.setItem = function (keyName, keyValue, subKeyName) {
        if (subKeyName === void 0) { subKeyName = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var currentItem, newValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!subKeyName) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getItem(keyName)];
                    case 1:
                        currentItem = (_a.sent()) || {};
                        dotProp.set(currentItem, subKeyName, keyValue);
                        return [4 /*yield*/, this.setItem(keyName, currentItem)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        newValue = (util_1.maybeSerialize(keyValue)) ? JSON.stringify(keyValue) : keyValue;
                        return [4 /*yield*/, idb_keyval_1.set(keyName, newValue, this.store)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * Writes data items to WebStorage type
    * @param {Array} item
    * @returns {*}
    */
    WebPorridgeDB.prototype.setItems = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!util_1.isArray(input)) return [3 /*break*/, 3];
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, input.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!util_1.isObject(item)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.setItem(item.key, item.value, item.subKey)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2:
                                            if (!util_1.isArray(item)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.setItem(item[0], item[1], item[2])];
                                        case 3: return [2 /*return*/, _a.sent()];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the length of WebStorage type
     * @param {Integer} index
     * @returns {*}
     */
    WebPorridgeDB.prototype.key = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, idb_keyval_1.keys(this.store)];
                    case 1: return [2 /*return*/, (_a.sent())[index]];
                }
            });
        });
    };
    /**
     * Returns the length of WebStorage type
     * @returns {Integer}
     */
    WebPorridgeDB.prototype.length = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, idb_keyval_1.keys(this.store)];
                    case 1: return [2 /*return*/, (_a.sent()).length];
                }
            });
        });
    };
    /**
     * Clears WebStorage type
     * @returns {*}
     */
    WebPorridgeDB.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, idb_keyval_1.clear(this.store)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Registers an event listener on the window or custom element
     * @param {Element|Window} element
     * @returns {*}
     */
    WebPorridgeDB.prototype.listen = function (element) {
        var _this = this;
        if (element === void 0) { element = window; }
        element.addEventListener(this.title, function (event) { return _this.eventHandler(event); });
    };
    /**
     * Removes an event listener on the window or custom element
     * @param {Element|Window} element
     * @returns {*}
     */
    WebPorridgeDB.prototype.mute = function (element) {
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
    WebPorridgeDB.prototype.dispatch = function (action, payload) {
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
    WebPorridgeDB.prototype.eventHandler = function (event) {
        util_1.validateAction(event.detail.action);
        var key, value, subKey, options;
        switch (event.detail.action) {
            case 'getItem':
                key = event.detail.payload.key;
                subKey = event.detail.payload.subKey || '';
                options = event.detail.options || {};
                return this.getItem(key, subKey, options);
            case 'getItems':
                key = event.detail.payload;
                options = event.detail.options || {};
                return this.getItems(key, options);
            case 'removeItem':
                key = event.detail.payload.key;
                subKey = event.detail.payload.subKey || '';
                return this.removeItem(key, subKey);
            case 'removeItems':
                key = event.detail.payload;
                return this.removeItems(key);
            case 'setItem':
                key = event.detail.payload.key;
                value = event.detail.payload.value;
                subKey = event.detail.payload.subKey || '';
                return this.setItem(key, value, subKey);
            case 'setItems':
                key = event.detail.payload;
                return this.setItems(key);
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
    return WebPorridgeDB;
}());
exports.default = WebPorridgeDB;
//# sourceMappingURL=porridge-db.js.map