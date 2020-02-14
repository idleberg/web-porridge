"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.maybeDeserialize = maybeDeserialize;
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} data
 * @returns {boolean}
 */
function maybeSerialize(data) {
    var type = Object.prototype.toString.call(data);
    return serializables.includes(type);
}
exports.maybeSerialize = maybeSerialize;
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