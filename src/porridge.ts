import * as dotProp from 'dot-prop';
import * as matcher from 'matcher';

import {
  isArray,
  isObject,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize,
  validateAction
} from './util';

export default class WebPorridge {
  title: string;
  storageType: string;
  options: WebPorridgeOptions = {
    base64: false,
    json: true
  };

  constructor(type: string, userOptions: WebPorridgeOptions = {}) {
    if (!type) {
      throw Error('Storage type not declared in constructor');
    } else if (typeof <any>window !== 'undefined' && !(type in (<any>window))) {
      throw Error(`Your browser does not support ${type}`);
    }

    switch (type) {
      case 'localStorage':
        this.title = 'localPorridge';
        break;

      case 'sessionStorage':
        this.title = 'sessionPorridge';
        break;

      default:
        throw 'Invalid storage type specified';

    }

    this.options = { ...this.options, ...userOptions };
    this.storageType = type;
  }

  /**
   * Reads single data item from WebStorage type
   * @param {String} item
   * @param {Object} subKeyName
   * @param {Object} options
   * @returns {*}
   */
  public getItem(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    options = {
      ...this.options,
      ...options
    };

    if (subKeyName) {
      const currentItem = this.getItem(keyName, '', options) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    const value = (<any>global)[this.storageType].getItem(keyName);

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
  public getJSON(keyName: string, subKeyName: string | null = '') {
    return this.getItem(keyName, subKeyName, { json: true });
  }

  /**
   * Reads and decodes Base64 string from WebStorage type
   * @param {String} keyName
   * @param {Object} subKeyName
   * @param {Object} options
   * @returns {*}
   */
  public getBase64(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    options = {
      ...this.options,
      ...options
    };

    const encodedItem = this.getItem(keyName, null, options);
    let value;

    if (subKeyName?.length || options.json === true) {
      const decodedItem = maybeBase64Decode(encodedItem);

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
  public getItems(items: (string | PayloadOptions)[], options: WebPorridgeOptions = {}) {
    if (isArray(items)) {
      return items.map(item => {
        if (typeof item === 'string') {
          return this.getItem(item, null, options);
        } else if (isObject(item)) {
          options = {
            ...options,
            ...item.options
          };

          return this.getItem(item.key, item.subKey, options);
        } else if (isArray(item)) {
          options = {
            ...options,
            ...item[2]
          };

          return this.getItem(item[0], item[1], options);
        }
      });
    }
  }

  /**
   * Reads string matching a wildcard from WebStorage type
   * @param {String|Array} keyName
   * @param {Object} options
   * @returns {*}
   */
  public getMatch(keyName: string | string[], subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    const matchingItems: PayloadOptions[] = this.getMatches(keyName)
      .map(item =>  (
        {
          key: item,
          subKey: subKeyName
        }
      ));

    return matchingItems.length
      ? this.getItems(matchingItems, options)
      : null;
  }

  /**
   * Removes single data item from WebStorage type
   * @param {String} item
   * @param {Object} subKeyName
   */
  public removeItem(keyName: string, subKeyName: string = '') {
    if (subKeyName?.length) {
      const currentItem = this.getItem(keyName) || {};
      dotProp.delete(currentItem, subKeyName);

      return this.setItem(keyName, currentItem);
    }

    return (<any>global)[this.storageType].removeItem(keyName);
  }

  /**
   * Removes datas item from WebStorage type
   * @param {Array} items
   */
  public removeItems(items: (string | PayloadOptions)[], subKeyName: string = '') {
    if (isArray(items)) {
      return items.map(item => {
        if (typeof item === 'string') {
          return this.removeItem(item, subKeyName);
        } else if (isObject(item)) {
          return this.removeItem(item.key, item.subKey || subKeyName);
        } else if (isArray(item)) {
          return this.removeItem(item[0], item[1] || subKeyName);
        }
      });
    }
  }

  /**
   * Removes item matching a wildcard from WebStorage type
   * @param {String} keyName
   * @param {Object} subKeyName
   */
  public removeMatch(keyName: string, subKeyName: string = '') {
    if (keyName === '*') {
      this.clear();
    }

    const matchingItems: string[] = this.getMatches(keyName);

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
  public setItem(keyName: string, keyValue: any, subKeyName: string = '', options: WebPorridgeOptions = {}) {
    if (subKeyName?.length || options.json === true) {
      const currentItem = this.getItem(keyName) || {};
      dotProp.set(currentItem, subKeyName, keyValue);

      return this.setItem(keyName, currentItem);
    }

    const newValue = (maybeSerialize(keyValue))
      ? JSON.stringify(keyValue)
      : keyValue;

    return (<any>global)[this.storageType].setItem(keyName, newValue);
  }

  /**
   * Writes data items to WebStorage type
   * @param {Array} items
   * @param {Object} options
   * @returns {*}
   */
  public setItems(items: PayloadOptions[], options: WebPorridgeOptions = {}) {
    if (isArray(items)) {
      return items.map(item => {
        if (isObject(item)) {
          return this.setItem(
            item.key,
            item.value,
            item.subKey,
            item.options || options
            );
        } else if (isArray(item)) {
          return this.setItem(
            item[0],
            item[1],
            item[2],
            item[3] || options,
          );
        }
      });
    }
  }

  /**
   * Writes single data item to WebStorage type
   * @param {String} item
   * @param {*} keyValue
   * @param {String} subKeyName
   * @returns {*}
   */
  public setJSON(keyName: string, keyValue: any, subKeyName: string = '') {
    return this.setItem(keyName, keyValue, subKeyName, { json: false });
  }

  /**
   * Returns the length of WebStorage type
   * @param {Integer} index
   * @returns {*}
   */
  public key(index: number) {
    return (<any>global)[this.storageType].key(index);
  }

  /**
   * Returns the length of WebStorage type
   * @returns {Integer}
   */
  public get length() {
    return (<any>global)[this.storageType].length;
  }

  /**
   * Clears WebStorage type
   * @returns {*}
   */
  public clear() {
    return (<any>global)[this.storageType].clear();
  }

  private getMatches(pattern) {
    const inputs = Object.keys((<any>global)[this.storageType]) || [];
    const patterns = isArray(pattern)
      ? pattern
      : [pattern];

    return matcher(inputs, patterns, { caseSensitive: true });
  }
}
