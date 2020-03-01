"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks whether input data requires deserialization after reading it from WebStorage
 * @param {*} inputData
 * @returns {boolean}
 */
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
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} inputString
 * @returns {boolean}
 */
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
/**
 * Base64-decodes input data if necessary. Supports deserialization
 * @param {string} inputString
 * @param {object} options
 * @returns {string|Object}
 */
function maybeBase64Decode(inputString, options) {
    if (options === void 0) { options = {}; }
    var outputString = isBase64(inputString) ? base64Decode(inputString) : inputString;
    return (outputString && maybeDeserialize(outputString) && options.decodeJSON) ? JSON.parse(outputString) : outputString;
}
exports.maybeBase64Decode = maybeBase64Decode;
/**
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
function base64Encode(inputString) {
    var outputString = (maybeSerialize(inputString)) ? JSON.stringify(inputString) : inputString;
    return Buffer.from(outputString).toString('base64');
}
exports.base64Encode = base64Encode;
/**
 * Base64-decodes input string
 * @param {*} inputString
 * @returns {string}
 */
function base64Decode(inputString) {
    return Buffer.from(inputString, 'base64').toString('binary');
}
exports.base64Decode = base64Decode;
/**
 * Determines whether a string is Base64 encoded
 * @param {*} inputString
 * @returns {boolean}
 */
function isBase64(inputString) {
    var base64RegEx = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';
    return new RegExp("^" + base64RegEx + "$", 'gi').test(inputString);
}
/**
 * Checks for supported WebStorage methods
 * @param {string} action
 * @returns {boolean}
 */
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
/**
 * Detect whether input is of type Array
 * @param {*} inputData
 * @returns {boolean}
 */
function isArray(inputData) {
    return Object.prototype.toString.call(inputData) === '[object Array]';
}
exports.isArray = isArray;
/**
 * Detect whether input is of type Object
 * @param {*} inputData
 * @returns {boolean}
 */
function isObject(inputData) {
    return Object.prototype.toString.call(inputData) === '[object Object]';
}
exports.isObject = isObject;
/**
 * Determines whether a floating-point number can be safely serialized
 * @param {*} inputData
 * @returns {boolean}
 */
function isSerializableNumber(inputData) {
    return !isNaN(parseFloat(inputData)) && parseFloat(inputData.toString()).toString() === inputData.toString();
}
exports.isSerializableNumber = isSerializableNumber;
//# sourceMappingURL=util.js.map