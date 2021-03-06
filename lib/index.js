"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPorridgeDB = exports.WebPorridge = exports.db = exports.sessionPorridge = exports.localPorridge = void 0;
var porridge_1 = require("./porridge");
exports.WebPorridge = porridge_1.default;
var porridge_db_1 = require("./porridge-db");
exports.WebPorridgeDB = porridge_db_1.default;
var localPorridge = new porridge_1.default('localStorage');
exports.localPorridge = localPorridge;
var sessionPorridge = new porridge_1.default('sessionStorage');
exports.sessionPorridge = sessionPorridge;
var db = new porridge_db_1.default();
exports.db = db;
var util_1 = require("./util");
Object.defineProperty(exports, "base64Decode", { enumerable: true, get: function () { return util_1.base64Decode; } });
Object.defineProperty(exports, "base64Encode", { enumerable: true, get: function () { return util_1.base64Encode; } });
//# sourceMappingURL=index.js.map