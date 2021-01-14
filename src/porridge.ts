import dotProp from 'dot-prop';
import matcher from 'matcher';
import { PayloadOptions, WebPorridgeOptions } from '../types';

import {
  isArray,
  isObject,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize
} from './util';

export default class WebPorridge {
  title: string;
  storageType: string;
  options: WebPorridgeOptions = {
    json: true
  };

  constructor(type: string, userOptions: WebPorridgeOptions = {}) {
    if (!type) {
      throw Error('Storage type not declared in constructor');
    } else if (typeof <unknown>window !== 'undefined' && !(type in (<any>window))) {
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
   * @param item
   * @param subKeyName
   * @param options
   * @returns
   */
  public getItem(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}): string | unknown {
    options = {
      ...this.options,
      ...options
    };

    if (subKeyName) {
      const currentItem = this.getItem(keyName, '', options) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    const value = (<unknown>globalThis)[this.storageType].getItem(keyName);

    return (value && maybeDeserialize(value) && options.json === true)
      ? JSON.parse(value)
      : value;
  }

  /**
   * Reads and decodes JSON string from WebStorage type
   * @param keyName
   * @param subKeyName
   * @returns
   */
  public getJSON(keyName: string, subKeyName: string | null = ''): unknown {
    return this.getItem(keyName, subKeyName, { json: true });
  }

  /**
   * Reads and decodes Base64 string from WebStorage type
   * @param keyName
   * @param subKeyName
   * @param options
   * @returns
   */
  public getBase64(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}): string | unknown {
    options = {
      ...this.options,
      ...options
    };

    const encodedItem: any = this.getItem(keyName, null, options);
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
   * @param items
   * @param options
   * @returns
   */
  public getItems(items: (string | PayloadOptions)[], options: WebPorridgeOptions = {}): string | unknown {
    if (isArray(items)) {
      let result;

      return items.map(item => {
        if (typeof item === 'string') {
          result = this.getItem(item, null, options);

          return options.keyVal
            ? {[item]: result}
            : result
        } else if (isObject(item)) {
          options = {
            ...options,
            ...item.options
          };

          result = this.getItem(item.key, item.subKey, options);

          return options.keyVal
            ? {[item.key]: result}
            : result
        } else if (isArray(item)) {
          options = {
            ...options,
            ...item[2]
          };

          result = this.getItem(item[0], item[1], options);

          return options.keyVal
            ? {[item[0]]: result}
            : result
        }
      });
    }
  }

  /**
   * Reads string matching a wildcard from WebStorage type
   * @param keyName
   * @param options
   * @returns
   */
  public getMatch(keyName: string | string[], subKeyName: string | null = '', options: WebPorridgeOptions = {}): string | unknown {
    const matchingItems: PayloadOptions[] = this._getMatches(keyName)
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
   * @param item
   * @param subKeyName
   */
  public removeItem(keyName: string, subKeyName = ''): void {
    if (subKeyName?.length) {
      const currentItem = this.getItem(keyName) || {};
      dotProp.delete(currentItem, subKeyName);

      return this.setItem(keyName, currentItem);
    }

    return (<unknown>globalThis)[this.storageType].removeItem(keyName);
  }

  /**
   * Removes datas item from WebStorage type
   * @param items
   */
  public removeItems(items: (string | PayloadOptions)[], subKeyName = ''): void[] {
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
   * @param keyName
   * @param subKeyName
   */
  public removeMatch(keyName: string, subKeyName = ''): void[] {
    if (keyName === '*') {
      this.clear();
    }

    const matchingItems: string[] = this._getMatches(keyName);

    return matchingItems.length
      ? this.removeItems(matchingItems, subKeyName)
      : null;
  }

  /**
   * Writes single data item to WebStorage type
   * @param item
   * @param keyValue
   * @param subKeyName
   * @param options
   * @returns
   */
  public setItem(keyName: string, keyValue: unknown, subKeyName = '', options: WebPorridgeOptions = {}): void {
    if (subKeyName?.length || options.json === true) {
      const currentItem = this.getItem(keyName) || {};
      dotProp.set(currentItem, subKeyName, keyValue);

      return this.setItem(keyName, currentItem);
    }

    const newValue = (maybeSerialize(keyValue))
      ? JSON.stringify(keyValue)
      : keyValue;

    return (<unknown>globalThis)[this.storageType].setItem(keyName, newValue);
  }

  /**
   * Writes data items to WebStorage type
   * @param items
   * @param options
   * @returns
   */
  public setItems(items: PayloadOptions[], options: WebPorridgeOptions = {}): void[] {
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
   * @param item
   * @param keyValue
   * @param subKeyName
   * @returns
   */
  public setJSON(keyName: string, keyValue: unknown, subKeyName = ''): void {
    return this.setItem(keyName, keyValue, subKeyName, { json: false });
  }

  /**
   * Returns the length of WebStorage type
   * @param index
   * @returns
   */
  public key(index: number): string | unknown {
    return (<unknown>globalThis)[this.storageType].key(index);
  }

  /**
   * Returns the length of WebStorage type
   * @returns
   */
  public get length(): number {
    return (<unknown>globalThis)[this.storageType].length;
  }

  /**
   * Clears WebStorage type
   * @returns
   */
  public clear(): void {
    return (<unknown>globalThis)[this.storageType].clear();
  }

  private _getMatches(pattern) {
    const inputs = Object.keys((<unknown>globalThis)[this.storageType]) || [];
    const patterns = isArray(pattern)
      ? pattern
      : [pattern];

    return matcher(inputs, patterns, { caseSensitive: true });
  }
}
