import * as matcher from 'matcher';

import {
  clear,
  del as removeItem,
  get as getItem,
  keys,
  set as setItem,
  Store
} from 'idb-keyval';

import * as dotProp from 'dot-prop';

import {
  isArray,
  isObject,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize,
  validateAction
} from './util';

export default class WebPorridgeDB {
  title: string = 'WebPorridge';
  store;

  // default options
  options: WebPorridgeOptions = {
    db: this.title,
    json: true,
    store: '(default)'
  };

  constructor(userOptions: WebPorridgeOptions = {}) {
    if (typeof <any>window !== 'undefined' && !('indexedDB' in window)) {
      throw Error(`Your browser does not support IndexedDB`);
    }

    this.options = { ...this.options, ...userOptions };
    this.store = new Store(this.options.db, this.options.store);
  }

  /**
   * Reads single data item from WebStorage type
   * @param {String} item
   * @param {Object} subKeyName
   * @param {Object} options
   * @returns {*}
   */
  public async getItem(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    options = {
      ...this.options,
      ...options
    };

    if (subKeyName) {
      const currentItem = await this.getItem(keyName, null, options) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    let value: string = await getItem(keyName, this.store) ?? null;

    return (value && maybeDeserialize(value) && options.json === true)
      ? JSON.parse(value)
      : value;
  }

  /**
   * Reads and decodes JSON string from WebStorage type
   * @param {String} keyName
   * @param {Object} subKeyName
   * @returns {*}
   */
  public async getJSON(keyName: string, subKeyName: string | null = '') {
    return await this.getItem(keyName, subKeyName, { json: true });
  }

  /**
   * Reads and decodes Base64 string from WebStorage type
   * @param {String} keyName
   * @param {Object} subKeyName
   * @param {Object} options
   * @returns {*}
   */
  public async getBase64(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    options = {
      ...this.options,
      ...options
    };

    const encodedItem = await this.getItem(keyName, null, options);
    let value;

    if (subKeyName?.length || options.json) {
      const decodedItem = maybeBase64Decode(encodedItem, options.json);

      value = subKeyName?.length
        ? dotProp.get(decodedItem, subKeyName)
        : decodedItem;
    } else {
      value = maybeBase64Decode(encodedItem, false);
    }

    return value;
  }

  /**
   * Writes data items to WebStorage type
   * @param {Array} items
   * @param {Object} options
   * @returns {*}
   */
  public async getItems(items: (string | PayloadOptions)[], options: WebPorridgeOptions = {}) {
    if (isArray(items)) {
      return await Promise.all(
        await items.map(async item => {
          if (typeof item === 'string') {
            return await this.getItem(item, null, options);
          } else if (isObject(item)) {
            options = {
              ...options,
              ...item.options
            };

            return await this.getItem(item.key, item.subKey, options);
          } else if (isArray(item)) {
            options = {
              ...options,
              ...item[2]
            };

            return await this.getItem(item[0], item[1], options);
          }
        })
      );
    }
  }

  /**
   * Reads string matching a wildcard from WebStorage type
   * @param {String|Array} keyName
   * @param {Object} subKeyName
   * @returns {*}
   */
  public async getMatch(keyName: string | string[], subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    const matchingItems: PayloadOptions[] = (await this.getMatches(keyName))
      .map(item =>  (
        {
          key: item,
          subKey: subKeyName
        }
      ));

    return matchingItems.length
      ? await this.getItems(matchingItems, options)
      : null;
  }

  /**
   * Removes single data item from WebStorage type
   * @param {String} item
   * @param {Object} subKeyName
   */
  public async removeItem(keyName: string, subKeyName: string = '') {
    if (subKeyName) {
      const currentItem = await this.getItem(keyName) || {};
      dotProp.delete(currentItem, subKeyName);

      return await this.setItem(keyName, currentItem);
    }

    return await removeItem(keyName, this.store);
  }

  /**
   * Removes datas item from WebStorage type
   * @param {Array} items
   */
  public async removeItems(items: (string | PayloadOptions)[], subKeyName: string = '') {
    if (isArray(items)) {
      return await Promise.all(
        await items.map(async (item) => {
          if (typeof item === 'string') {
            return this.removeItem(item, subKeyName);
          } else if (isObject(item)) {
            return this.removeItem(item.key, item.subKey || subKeyName);
          } else if (isArray(item)) {
            return this.removeItem(item[0], item[1] || subKeyName);
          }
        })
      );
    }
  }

  /**
   * Removes item matching a wildcard from WebStorage type
   * @param {String} keyName
   * @param {Object} subKeyName
   */
  public async removeMatch(keyName: string, subKeyName: string = '') {
    if (keyName === '*') {
      this.clear();
    }

    const matchingItems: string[] = await this.getMatches(keyName);

    return matchingItems.length
      ? this.removeItems(matchingItems)
      : null;
  }

  /**
   * Writes single data item to WebStorage type
   * @param {String} item
   * @param {*} keyValue
   * @param {String} subKeyName
   * @param {Object} options
   * @returns {*}
   */
  public async setItem(keyName: string, keyValue: any, subKeyName: string = '', options: WebPorridgeOptions = {}) {
    if (subKeyName?.length || options.json === true) {
      const currentItem = await this.getItem(keyName) || {};
      dotProp.set(currentItem, subKeyName, keyValue);

      return await this.setItem(keyName, currentItem);
    }

    const newValue = (maybeSerialize(keyValue))
      ? JSON.stringify(keyValue)
      : keyValue;

    return await setItem(keyName, newValue, this.store);
  }

  /**
   * Writes data items to WebStorage type
   * @param {Array} items
   * @param {Object} options
   * @returns {*}
   */
  public async setItems(items: PayloadOptions[], options: WebPorridgeOptions = {}) {
    if (isArray(items)) {
      return await Promise.all(
        await items.map(async (item) => {
          if (isObject(item)) {
            return await this.setItem(
              item.key,
              item.value,
              item.subKey,
              item.options || options
            );
          } else if (isArray(item)) {
            return await this.setItem(
              item[0],
              item[1],
              item[2],
              item[3] || options,
            );
          }
        })
      );
    }
  }

  /**
   * Writes single data item to WebStorage type
   * @param {String} item
   * @param {*} keyValue
   * @param {String} subKeyName
   * @returns {*}
   */
  public async setJSON(keyName: string, keyValue: any, subKeyName: string = '') {
    return await this.setItem(keyName, keyValue, subKeyName, { json: false });
  }

  /**
   * Returns the length of WebStorage type
   * @param {Integer} index
   * @returns {*}
   */
  public async key(index: number) {
    return (await keys(this.store))[index];
  }

  /**
   * Returns the length of WebStorage type
   * @returns {Integer}
   */
  public get length() {
    return (async () => {
      return (await keys(this.store)).length;
    })();
  }

  private async getMatches(pattern) {
    const length = await this.length;
    const inputs = [];

    for (let i = 0; i < length; i++) {
      const key = await this.key(i);

      if (key) inputs.push(key);
    }

    const patterns = isArray(pattern)
    ? pattern
    : [pattern];

    return matcher(inputs, patterns, { caseSensitive: true });
  }
}
