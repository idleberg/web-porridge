const storageKeys: WebPorridge.StorageKeys = {
  value: '@value',
  type: '@type',
  expires: '@expires'
};

/**
 * Serializes a given type into a string
 * @param {*} item
 * @returns {String}
 */
 function serialize(item: unknown): unknown {
   switch (typeof item) {
    case 'bigint':
       return item.toString();

    default:
      return item;
   }
}

/**
 * Deserializes string into given type
 * @param {String} item
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

/**
* Returns the type of a given item
* @param {*} item
* @returns {String}
*/
function getType(item: any): string {
  const type = Object.prototype.toString.call(item);

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

/**
* Runs a check whether a storage item has expired
* @param {String} expires
* @returns {boolean}
*/
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
