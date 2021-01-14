import matcher from 'matcher';
import { PayloadOptions, WebPorridgeOptions } from '../types';

import {
  clear,
  createStore,
  del as removeItem,
  get as getItem,
  keys,
  set as setItem
} from 'idb-keyval';

import * as dotProp from 'dot-prop';

import {
  isArray,
  isObject,
  maybeBase64Decode,
  maybeDeserialize,
  maybeSerialize
} from './util';

export default class WebPorridgeDB {
  title = 'WebPorridge';
  store;

  // default options
  options: WebPorridgeOptions = {
    db: this.title,
    json: true,
    store: '(default)'
  };

  constructor(userOptions: WebPorridgeOptions = {}) {
    if (typeof <unknown>window !== 'undefined' && !('indexedDB' in window)) {
      throw Error(`Your browser does not support IndexedDB`);
    }

    this.options = { ...this.options, ...userOptions };
    this.store = createStore(this.options.db, this.options.store);
  }

  /**
   * Reads single data item from WebStorage type
   * @param item
   * @param subKeyName
   * @param options
   * @returns
   */
  public async getItem(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}): Promise<string | unknown> {
    options = {
      ...this.options,
      ...options
    };

    if (subKeyName) {
      const currentItem = await this.getItem(keyName, null, options) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    const value: string = await getItem(keyName, this.store) ?? null;

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
  public async getJSON(keyName: string, subKeyName: string | null = ''): Promise<unknown> {
    return await this.getItem(keyName, subKeyName, { json: true });
  }

  /**
   * Reads and decodes Base64 string from WebStorage type
   * @param keyName
   * @param subKeyName
   * @param options
   * @returns
   */
  public async getBase64(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}): Promise<string | unknown> {
    options = {
      ...this.options,
      ...options
    };

    const encodedItem: any = await this.getItem(keyName, null, options);
    let value;

    if (subKeyName?.length || options.json) {
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
  public async getItems(items: (string | PayloadOptions)[], options: WebPorridgeOptions = {}): Promise<string | unknown> {
    if (isArray(items)) {
      let result;

      return await Promise.all(
        await items.map(async item => {
          if (typeof item === 'string') {
            result = await this.getItem(item, null, options);

            return options.keyVal
              ? {[item]: result}
              : result
          } else if (isObject(item)) {
            options = {
              ...options,
              ...item.options
            };

            result = await this.getItem(item.key, item.subKey, options);

            return options.keyVal
              ? {[item.key]: result}
              : result
          } else if (isArray(item)) {
            options = {
              ...options,
              ...item[2]
            };

            result = await this.getItem(item[0], item[1], options);

            return options.keyVal
              ? {[item[0]]: result}
              : result
          }
        })
      );
    }
  }

  /**
   * Reads string matching a wildcard from WebStorage type
   * @param keyName
   * @param subKeyName
   * @returns
   */
  public async getMatch(keyName: string | string[], subKeyName: string | null = '', options: WebPorridgeOptions = {}): Promise<string | unknown> {
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
   * @param item
   * @param subKeyName
   */
  public async removeItem(keyName: string, subKeyName = ''): Promise<void> {
    if (subKeyName) {
      const currentItem = await this.getItem(keyName) || {};
      dotProp.delete(currentItem, subKeyName);

      return await this.setItem(keyName, currentItem);
    }

    return await removeItem(keyName, this.store);
  }

  /**
   * Removes datas item from WebStorage type
   * @param items
   */
  public async removeItems(items: (string | PayloadOptions)[], subKeyName = ''): Promise<void[]> {
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
   * @param keyName
   * @param subKeyName
   */
  public async removeMatch(keyName: string, subKeyName = ''): Promise<void[]> {
    if (keyName === '*') {
      this.clear();
    }

    const matchingItems: string[] = await this.getMatches(keyName);

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
  public async setItem(keyName: string, keyValue: unknown, subKeyName = '', options: WebPorridgeOptions = {}): Promise<void> {
    options = {
      ...this.options,
      ...options
    };

    if (subKeyName?.length) {
      const currentItem = await this.getItem(keyName) || {};
      dotProp.set(currentItem, subKeyName, keyValue);

      return await this.setItem(keyName, currentItem);
    }

    const newValue = (options.json === false)
      ? JSON.stringify(keyValue)
      : keyValue;

    return await setItem(keyName, newValue, this.store);
  }

  /**
   * Writes data items to WebStorage type
   * @param items
   * @param options
   * @returns
   */
  public async setItems(items: PayloadOptions[], options: WebPorridgeOptions = {}): Promise<void[]> {
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
   * @param item
   * @param keyValue
   * @param subKeyName
   * @returns
   */
  public async setJSON(keyName: string, keyValue: unknown, subKeyName = ''): Promise<void> {
    return await this.setItem(keyName, keyValue, subKeyName, { json: true });
  }

  /**
   * Returns the length of WebStorage type
   * @param index
   * @returns
   */
  public async key(index: number): Promise<string | unknown> {
    return (await keys(this.store))[index];
  }

  /**
   * Returns the length of WebStorage type
   * @returns
   */
  public get length(): Promise<number> {
    return (async () => {
      return (await keys(this.store)).length;
    })();
  }

  /**
   * Clears WebStorage type
   * @returns
   */
  public async clear(): Promise<void> {
    return await clear(this.store);
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
