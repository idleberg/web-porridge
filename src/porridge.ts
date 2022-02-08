/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
  deserialize,
  didExpire,
  eventDispatcher,
  eventListener,
  getType,
  serialize,
  storageKeys
} from './util';

const eventName = 'web-porridge:storage.didChange';

const validStores = [
  'localStorage',
  'sessionStorage'
];
export class WebPorridge {
  store: string;

  constructor(store = 'localStorage') {
    if (typeof <any>window !== 'undefined' && !(store in <any>window)) {
      throw Error(`Your browser does not support ${store}`);
    } else if (!validStores.includes(store)) {
      throw `Invalid storage type specified, try ${validStores.join('|')} instead`;
    }

    this.store = store;
  }

  /**
   * Writes single data item to WebStorage type
   * @param {String} keyName
   * @param {unknown} keyValue
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.prop]
   *
   * @returns
   */
  public setItem(keyName: string, keyValue: unknown, options?: WebPorridge.StorageOptions): void {
    if (options?.prop?.length) {
      const item = this.getItem(keyName) || {};
      setProperty(item, options.prop, keyValue);

      return this.setItem(keyName, item, {
        ...options,
        prop: undefined
      });
    }

    const newValue = {
      [storageKeys.value]: serialize(keyValue),
      [storageKeys.type]: getType(keyValue),
    };

    if (options?.expires && String(options.expires).length) {
      newValue[storageKeys.expires] = new Date(options.expires);
    }

    eventDispatcher(eventName, {
      key: keyName,
      value: keyValue
    });

    return (<any>globalThis)[this.store].setItem(keyName, JSON.stringify(newValue));
  }

  /**
   * Reads single data item from WebStorage type
   * @param {String} keyName
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.prop]
   * @returns
   */
  public getItem(keyName: string, options?: WebPorridge.StorageOptions): string | unknown {
    const item = (<any>globalThis)[this.store].getItem(keyName);

    try {
      const decodedItem: WebPorridge.Payload = JSON.parse(item);

      if (!decodedItem || (didExpire(decodedItem[storageKeys.expires]))) {
        return null;
      }

      const deserializedItem = deserialize(decodedItem);

      if (decodedItem[storageKeys.type] === 'object' && options?.prop?.length) {
        return getProperty(deserializedItem, options.prop);
      }

      return deserializedItem;
    } catch (err) {
      return item;
    }
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

    eventDispatcher(eventName, {
      key: keyName,
      value: null
    });

    return (<any>globalThis)[this.store].removeItem(keyName);
  }

  /**
   * Returns the length of WebStorage type
   * @param index
   * @returns
   */
  public key(index: number): string | unknown {
    return (<any>globalThis)[this.store].key(index);
  }

  /**
   * Returns the length of WebStorage type
   * @returns
   */
  public get length(): number {
    return (<any>globalThis)[this.store].length;
  }

  /**
   * Clears WebStorage type
   * @returns
   */
  public clear(): void {
    eventDispatcher(eventName, {
      value: null
    });

    return (<any>globalThis)[this.store].clear();
  }

  /**
   * Returns whether WebStorage contains property
   * @param {String} keyName
   * @returns {boolean}
   */
  public hasItem(keyName: string): boolean {
    return Object.keys(<any>globalThis[this.store]).includes(keyName);
  }

  /**
   * Returns an array of WebStorage's enumerable property names
   * @param {String} keyName
   * @returns {boolean}
   */
  public keys(): string[] {
    return Object.keys(<any>globalThis[this.store]);
  }

  /**
   * Returns an array of WebStorage's enumerable property values
   * @param {String} keyName
   * @returns {boolean}
   */
  public values(): any[] {
    return Object.keys(<any>globalThis[this.store])
      .map(item => this.getItem(item));
  }

  /**
   * Returns an array of WebStorage's own enumerable string-keyed property `[key, value]` pairs
   * @param {String} keyName
   * @returns {boolean}
   */
  public entries(): any[] {
    return Object.keys(<any>globalThis[this.store])
      .map(item => [item, this.getItem(item)]);
  }

  /**
  * Returns an array of WebStorage's own enumerable string-keyed property `[key, value]` pairs
  * @param {String} keyName
  * @returns {function} callback
  */
  public observe(keyName: string, callback: (payload: any) => void): void {
    eventListener(eventName, keyName, callback);
  }
}
