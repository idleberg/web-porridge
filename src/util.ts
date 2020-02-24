const serializables = [
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
function maybeDeserialize(data): boolean {
  try {
    const result = JSON.parse(data);
    const type: string = Object.prototype.toString.call(result);

    return serializables.includes(type);
  } catch (error) {

    return false;
  }
}

/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} inputString
 * @returns {boolean}
 */
function maybeSerialize(inputString: string | Object): boolean {
   const type: string = Object.prototype.toString.call(inputString);

  return serializables.includes(type);
}

/**
 * Base64-decodes input data if necessary. Supports deserialization
 * @param {*} inputString
 * @returns {string|Object}
 */
function maybeBase64Decode(inputString: string) {
  const outputString: string = isBase64(inputString) ? base64Decode(inputString) : inputString;

  return (outputString && maybeDeserialize(outputString)) ? JSON.parse(outputString) : outputString;
}

/**
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
function base64Encode(inputString: string): string {
  const outputString: string = (maybeSerialize(inputString)) ? JSON.stringify(inputString) : inputString;

  return new Buffer(outputString).toString('base64');
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
  const base64RegEx = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';

  return new RegExp(`^${base64RegEx}$`, 'gi').test(inputString);
}

/**
 * Checks for supported WebStorage methods
 * @param {string} action
 * @returns {boolean}
 */
function validateAction(action: string) {
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

export {
  base64Decode,
  base64Encode,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize,
  validateAction
};
