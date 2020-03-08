"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var porridge_1 = require("./porridge");
var porridge_db_1 = require("./porridge-db");
var localPorridge = new porridge_1.default('local');
exports.localPorridge = localPorridge;
var sessionPorridge = new porridge_1.default('session');
exports.sessionPorridge = sessionPorridge;
var db = new porridge_db_1.default();
exports.db = db;
var util_1 = require("./util");
exports.base64Decode = util_1.base64Decode;
exports.base64Encode = util_1.base64Encode;
//# sourceMappingURL=index.js.map