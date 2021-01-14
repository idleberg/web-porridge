const serializables = [
  '[object Array]',
  '[object Boolean]',
  '[object Null]',
  '[object Object]'
];

/**
 * Checks whether input data requires deserialization after reading it from WebStorage
 * @param {*} inputData
 * @returns {boolean}
 */
function maybeDeserialize(inputData: string): boolean {
  try {
    const result: any = JSON.parse(inputData);
    const type: string = Object.prototype.toString.call(result);

    return serializables.includes(type) || (type === '[object Number]' && isSerializableNumber(inputData));
  } catch (error) {

    return false;
  }
}

/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} inputString
 * @returns {boolean}
 */
function maybeSerialize(inputString: string | unknown): boolean {
  const type: string = Object.prototype.toString.call(inputString);

  return serializables.includes(type);
}

/**
 * Base64-decodes input data if necessary. Supports deserialization
 * @param {string} inputString
 * @param {object} options
 * @returns {string|Object}
 */
function maybeBase64Decode(inputString: string, decodeJSON = true): string | unknown {

  const outputString: string = isString(inputString) && isBase64(inputString)
    ? base64Decode(inputString)
    : inputString;

  return outputString && (maybeDeserialize(outputString) && decodeJSON)
    ? JSON.parse(outputString)
    : outputString;
}

/**
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
function base64Encode(inputString: string): string {
  const outputString: string = (maybeSerialize(inputString))
    ? JSON.stringify(inputString)
    : String(inputString);

  return Buffer.from(outputString).toString('base64');
}

/**
 * Base64-decodes input string
 * @param {*} inputString
 * @returns {string}
 */
function base64Decode(inputString: string): string {
  return Buffer.from(inputString, 'base64').toString('binary');
}

/**
 * Determines whether a string is Base64 encoded
 * @param {*} inputString
 * @returns {boolean}
 */
function isBase64(inputString: string) {
  const base64RegEx = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?';

  return new RegExp(`^${base64RegEx}$`, 'gi').test(inputString);
}

/**
 * Checks for supported WebStorage methods
 * @param {string} action
 * @returns {boolean}
 */
// function validateAction(action: string) {
//   if (![
//     'clear',
//     'getBase64',
//     'getJSON',
//     'getItem',
//     'getItems',
//     'getMatch',
//     'key',
//     'length',
//     'removeItem',
//     'removeItems',
//     'setItem',
//     'setItems',
//     'setJSON',
//   ].includes(action)) {
//     throw 'Invalid action argument provided';
//   }
// }

/**
 * Detect whether input is of type Array
 * @param {*} inputData
 * @returns {boolean}
 */
function isArray(inputData: unknown): boolean {
  return Object.prototype.toString.call(inputData) === '[object Array]';
}

/**
 * Detect whether input is of type Object
 * @param {*} inputData
 * @returns {boolean}
 */
function isObject(inputData: unknown): boolean {
  return Object.prototype.toString.call(inputData) === '[object Object]';
}

/**
 * Detect whether input is of type String
 * @param {*} inputData
 * @returns {boolean}
 */
function isString(inputData: unknown): boolean {
  return Object.prototype.toString.call(inputData) === '[object String]';
}

/**
 * Determines whether a floating-point number can be safely serialized
 * @param {*} inputData
 * @returns {boolean}
 */
function isSerializableNumber(inputData: any): boolean {
  return !isNaN(parseFloat(inputData)) && parseFloat(inputData.toString()).toString() === inputData.toString();
}

export {
  base64Decode,
  base64Encode,
  isArray,
  isObject,
  isString,
  isSerializableNumber,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize
};
