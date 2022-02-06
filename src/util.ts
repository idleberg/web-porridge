const storageKeys: WebPorridge.StorageKeys = {
  value: '@value',
  type: '@type',
  expires: '@expires'
};

/**
 * Base64-encodes input string. Supports serialization
 * @param {*} inputString
 * @returns {string}
 */
 function serialize(inputString: unknown): unknown {
   switch (typeof inputString) {
    case 'bigint':
       return inputString.toString();

    default:
      return inputString;
   }
}

/**
 * Base64-decodes input string
 * @param {*} item
 * @returns {*}
 */
function deserialize(item): unknown {
  const decodedString = item[storageKeys.value];

  switch(item[storageKeys.type]) {
    case 'string':
      return decodedString.toString();

    case 'bigint':
      return BigInt(decodedString);

    default:
      return decodedString;
  }
}


function stringify(input: unknown) {
  switch (typeof input) {
    case 'string':
      return input;

    case 'bigint':
      return input.toString();

    default:
      return JSON.stringify(input);
  }
}

function getType(inputData: unknown): string {
  const type = Object.prototype.toString.call(inputData);

  switch (type) {
    case '[object Array]':
    case '[object Object]':
      return 'object';

    case '[object BigInt]':
      return 'bigint';

    case '[object Boolean]':
      return 'boolean';

    case '[objectNull]':
      return 'null';

    case '[object Number]':
      return 'number';

    case '[object String]':
      return 'string';

    case '[object Undefined]':
      return 'undefined';

    default:
      new Error(`Type ${type} cannot be stringified`);
  }
}

function didExpire(expires: string): boolean {
  return expires && new Date(expires) <= new Date();
}

export {
  deserialize,
  didExpire,
  getType,
  serialize,
  storageKeys
};
