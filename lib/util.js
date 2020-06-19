"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAction = exports.maybeSerialize = exports.maybeDeserialize = exports.maybeBase64Decode = exports.isSerializableNumber = exports.isObject = exports.isArray = exports.base64Encode = exports.base64Decode = void 0;
function maybeDeserialize(inputData) {
    var serializables = [
        '[object Array]',
        '[object Boolean]',
        '[object Null]',
        '[object Object]'
    ];
    try {
        var result = JSON.parse(inputData);
        var type = Object.prototype.toString.call(result);
        return serializables.includes(type) || (type === '[object Number]' && isSerializableNumber(inputData));
    }
    catch (error) {
        return false;
    }
}
exports.maybeDeserialize = maybeDeserialize;
function maybeSerialize(inputString) {
    var serializables = [
        '[object Array]',
        '[object Boolean]',
        '[object Null]',
        '[object Number]',
        '[object Object]'
    ];
    var type = Object.prototype.toString.call(inputString);
    return serializables.includes(type);
}
exports.maybeSerialize = maybeSerialize;
function maybeBase64Decode(inputString, decodeJSON) {
    if (decodeJSON === void 0) { decodeJSON = true; }
    var outputString = isString(inputString) && isBase64(inputString)
        ? base64Decode(inputString)
        : inputString;
    return outputString && (maybeDeserialize(outputString) && decodeJSON)
        ? JSON.parse(outputString)
        : outputString;
}
exports.maybeBase64Decode = maybeBase64Decode;
function base64Encode(inputString) {
    var outputString = (maybeSerialize(inputString)) ? JSON.stringify(inputString) : inputString;
    return Buffer.from(outputString).toString('base64');
}
exports.base64Encode = base64Encode;
function base64Decode(inputString) {
    return Buffer.from(inputString, 'base64').toString('binary');
}
exports.base64Decode = base64Decode;
function isBase64(inputString) {
    var base64RegEx = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';
    return new RegExp("^" + base64RegEx + "$", 'gi').test(inputString);
}
function validateAction(action) {
    if (![
        'clear',
        'getItem',
        'getItems',
        'key',
        'length',
        'removeItem',
        'removeItems',
        'setItem',
        'setItems',
    ].includes(action)) {
        throw 'Invalid action argument provided';
    }
}
exports.validateAction = validateAction;
function isArray(inputData) {
    return Object.prototype.toString.call(inputData) === '[object Array]';
}
exports.isArray = isArray;
function isObject(inputData) {
    return Object.prototype.toString.call(inputData) === '[object Object]';
}
exports.isObject = isObject;
function isString(inputData) {
    return Object.prototype.toString.call(inputData) === '[object String]';
}
function isSerializableNumber(inputData) {
    return !isNaN(parseFloat(inputData)) && parseFloat(inputData.toString()).toString() === inputData.toString();
}
exports.isSerializableNumber = isSerializableNumber;
//# sourceMappingURL=util.js.map