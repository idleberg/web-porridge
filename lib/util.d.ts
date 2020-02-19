/**
 * Checks whether input data requires deserialization after readin it from WebStorage
 * @param {*} data
 * @returns {boolean}
 */
declare function maybeDeserialize(data: any): boolean;
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} inputString
 * @returns {boolean}
 */
declare function maybeSerialize(inputString: string | Object): boolean;
/**
 * Base64-decodes input data if necessary. Supports deserialization
 * @param {*} inputString
 * @returns {string|Object}
 */
declare function maybeBase64Decode(inputString: string): any;
/**
 * Determines whether a string is Base64 encoded
 * @param {*} inputString
 * @returns {boolean}
 */
declare function isBase64(inputString: string): boolean;
/**
 * Checks for supported WebStorage methods
 * @param {string} action
 * @returns {boolean}
 */
declare function validateAction(action: string): void;
export { isBase64, maybeBase64Decode, maybeDeserialize, maybeSerialize, validateAction };
