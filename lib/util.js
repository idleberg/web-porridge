"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializables = [
    '[object Array]',
    '[object Boolean]',
    '[object Null]',
    '[object Number]',
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
exports.maybeDeserialize = maybeDeserialize;
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} inputString
 * @returns {boolean}
 */
function maybeSerialize(inputString) {
    var type = Object.prototype.toString.call(inputString);
    return serializables.includes(type);
}
exports.maybeSerialize = maybeSerialize;
/**
 * Base64-decodes input data if necessary. Supports deserialization
 * @param {*} inputString
 * @returns {string|Object}
 */
function maybeBase64Decode(inputString) {
    var outputString = isBase64(inputString) ? base64Decode(inputString) : inputString;
    return (outputString && maybeDeserialize(outputString)) ? JSON.parse(outputString) : outputString;
}
exports.maybeBase64Decode = maybeBase64Decode;
/**
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
function base64Encode(inputString) {
    var outputString = (maybeSerialize(inputString)) ? JSON.stringify(inputString) : inputString;
    return new Buffer(outputString).toString('base64');
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
        'key',
        'length',
        'removeItem',
        'setItem',
    ].includes(action)) {
        throw 'Invalid action argument provided';
    }
}
exports.validateAction = validateAction;
//# sourceMappingURL=util.js.map