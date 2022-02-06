import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
  deserialize,
  didExpire,
  getType,
  serialize,
  storageKeys
} from './util';

const validStorageTypes = [
  'localStorage',
  'sessionStorage'
];

export class WebPorridge {
  type: string;

  constructor(type = 'localStorage') {
    if (typeof <any>window !== 'undefined' && !(type in <any>window)) {
      throw Error(`Your browser does not support ${type}`);
    } else if (!validStorageTypes.includes(type)) {
      throw `Invalid storage type specified, try ${validStorageTypes.join('|')} instead`;
    }

    this.type = type;
  }

  /**
   * Writes single data item to WebStorage type
   * @param {String} keyName
   * @param {unknown} keyValue
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.key]
   *
   * @returns
   */
  public setItem(keyName: string, keyValue: unknown, options?: WebPorridge.StorageOptions): void {
    if (options?.key?.length) {
      const item = this.getItem(keyName) || {};
      setProperty(item, options.key, keyValue);

      return this.setItem(keyName, item, {
        ...options,
        key: undefined
      });
    }

    const newValue = {
      [storageKeys.value]: serialize(keyValue),
      [storageKeys.type]: getType(keyValue),
    };

    if (options?.expires && String(options.expires).length) {
      newValue[storageKeys.expires] = new Date(options.expires);
    }

    return (<any>globalThis)[this.type].setItem(keyName, JSON.stringify(newValue));
  }

  /**
   * Reads single data item from WebStorage type
   * @param {String} keyName
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.key]
   * @returns
   */
  public getItem(keyName: string, options?: WebPorridge.StorageOptions): string | unknown {
    const item: WebPorridge.Payload = JSON.parse((<any>globalThis)[this.type].getItem(keyName));

    if (!item || (didExpire(item[storageKeys.expires]))) {
      return null;
    }

    const decodedItem = deserialize(item);

    if (item[storageKeys.type] === 'object' && options?.key?.length) {
      return getProperty(decodedItem, options.key);
    }

    return decodedItem;
  }

  /**
   * Removes single data item from WebStorage type
   * @param {String} keyName
   * @param {String} subKeyName
   */
   public removeItem(keyName: string, subKeyName = ''): void {
    if (subKeyName?.length) {
      const item = this.getItem(keyName) || {};
      deleteProperty(item, subKeyName);

      return this.setItem(keyName, item);
    }

    return (<any>globalThis)[this.type].removeItem(keyName);
  }

  /**
   * Returns the length of WebStorage type
   * @param index
   * @returns
   */
  public key(index: number): string | unknown {
    return (<any>globalThis)[this.type].key(index);
  }

  /**
   * Returns the length of WebStorage type
   * @returns
   */
  public get length(): number {
    return (<any>globalThis)[this.type].length;
  }

  /**
   * Clears WebStorage type
   * @returns
   */
  public clear(): void {
    return (<any>globalThis)[this.type].clear();
  }
}
