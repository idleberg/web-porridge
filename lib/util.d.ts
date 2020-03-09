/**
 * Checks whether input data requires deserialization after reading it from WebStorage
 * @param {*} inputData
 * @returns {boolean}
 */
declare function maybeDeserialize(inputData: any): boolean;
/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} inputString
 * @returns {boolean}
 */
declare function maybeSerialize(inputString: string | Object): boolean;
/**
 * Base64-decodes input data if necessary. Supports deserialization
 * @param {string} inputString
 * @param {object} options
 * @returns {string|Object}
 */
declare function maybeBase64Decode(inputString: string, options?: WebPorridgeOptions): any;
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
/**
 * Detect whether input is of type Array
 * @param {*} inputData
 * @returns {boolean}
 */
declare function isArray(inputData: any): boolean;
/**
 * Detect whether input is of type Object
 * @param {*} inputData
 * @returns {boolean}
 */
declare function isObject(inputData: any): boolean;
/**
 * Determines whether a floating-point number can be safely serialized
 * @param {*} inputData
 * @returns {boolean}
 */
declare function isSerializableNumber(inputData: any): boolean;
export { base64Decode, base64Encode, isArray, isObject, isSerializableNumber, maybeBase64Decode, maybeDeserialize, maybeSerialize, validateAction };
