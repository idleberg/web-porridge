const serializables = [
  '[object Array]',
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
 * @param {*} data
 * @returns {boolean}
 */
function maybeSerialize(data: string | Object): boolean {
   const type: string = Object.prototype.toString.call(data);

  return serializables.includes(type);
}

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
  validateAction,
  maybeDeserialize,
  maybeSerialize
};
