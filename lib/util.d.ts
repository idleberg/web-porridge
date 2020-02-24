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
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
declare function base64Encode(inputString: string): string;
/**
 * Base64-decodes input string
 * @param {*} inputString
 * @returns {string}
 */
declare function base64Decode(inputString: string): string;
/**
 * Checks for supported WebStorage methods
 * @param {string} action
 * @returns {boolean}
 */
declare function validateAction(action: string): void;
export { base64Decode, base64Encode, maybeBase64Decode, maybeDeserialize, maybeSerialize, validateAction };
