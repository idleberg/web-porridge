/*! web-porridge | MIT License | https://github.com/idleberg/web-porridge */

import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
  clear,
  createStore,
  del as removeItemIdb,
  get as getItemIdb,
  keys,
  set as setItemIdb,
} from 'idb-keyval';

import {
  didExpire,
  eventDispatcher,
  eventListener,
  getType,
  storageKeys
} from './util';

const eventName = 'web-porridge:db.didChange';

export class WebPorridgeDB {
  store;

  constructor(options?: WebPorridge.IndexeddbOptions) {
    if (typeof <any>window !== 'undefined' && !('indexedDB' in <any>window)) {
      throw Error(`Your browser does not support IndexedDB`);
    }

    const { db, name } = {
      db: 'WebPorridge',
      name: '(default store)',
      ...options
    }

    this.store = createStore(db, name);
  }
  /**
   * Writes single data item to IndexedDB
   * @param {String} keyName
   * @param {unknown} keyValue
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.prop]
   *
   * @returns
   */
  public async setItem(keyName: string, keyValue: unknown, options: WebPorridge.StorageOptions = {}): Promise<void> {
    if (options?.prop?.length) {
      const item = await this.getItem(keyName) || {};
      setProperty(item, options.prop, keyValue);

      return await this.setItem(keyName, item, {
        ...options,
        prop: undefined
      });
    }

    const newValue = {
      [storageKeys.value]: keyValue,
      [storageKeys.type]: getType(keyValue)
    };

    if (options?.expires && String(options.expires).length) {
      newValue[storageKeys.expires] = new Date(options.expires);
    }

   eventDispatcher(eventName, {
      key: keyName,
      value: keyValue
    });

    return await setItemIdb(keyName, newValue, this.store);
  }

  /**
   * Reads single data item from IndexedDB
   * @param {String} keyName
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.prop]
   * @returns
   */
   public async getItem(keyName: string, options?: WebPorridge.StorageOptions): Promise<string | unknown> {
    const item: WebPorridge.Payload = await getItemIdb(keyName, this.store);

    if (!item || didExpire(item[storageKeys.expires])) {
      return null;
    }

    if (item[storageKeys.type] === 'object' && options?.prop?.length) {
      return getProperty(item[storageKeys.value], options.prop);
    }

    return item[storageKeys.value];
  }

  /**
   * Removes single data item from IndexedDB
   * @param {String} keyName
   * @param {Object} [options]
   * @param {String} [options.prop]
   */
  public async removeItem(keyName: string, options?: WebPorridge.StorageOptions): Promise<void> {
    if (options?.prop?.length) {
      const item = await this.getItem(keyName) || {};
      deleteProperty(item, options.prop);

      return await this.setItem(keyName, item);
    }

   eventDispatcher(eventName, {
      key: keyName,
      value: null
    });

    return await removeItemIdb(keyName, this.store);
  }

  /**
   * Returns the length of IndexedDB
   * @param index
   * @returns
   */
  public async key(index: number): Promise<string | unknown> {
    return (await keys(this.store))[index];
  }

  /**
   * Returns the length of IndexedDB
   * @returns
   */
  public get length(): Promise<number> {
    return (async () => {
      return (await keys(this.store)).length;
    })();
  }

  /**
   * Clears IndexedDB
   * @returns
   */
  public async clear(): Promise<void> {
    eventDispatcher(eventName, {
      value: null
    });

    return await clear(this.store);
  }

  /**
   * Returns whether IndexedDB contains property
   * @param {String} keyName
   * @returns {boolean}
   */
  public async hasItem(keyName: string): Promise<boolean> {
     return (await keys(this.store)).includes(keyName);
   }

  /**
   * Returns an array of IndexedDB's enumerable property names
   * @param {String} keyName
   * @returns {boolean}
   */
   public async keys(): Promise<string[]> {
    return await keys(this.store);
  }

  /**
   * Returns an array of IndexedDB's enumerable property values
   * @param {String} keyName
   * @returns {boolean}
   */
  public async values(): Promise<any[]> {
    return Promise.all(
      (await keys(this.store))
        .map(async (item: string) => await this.getItem(item))
    );
  }

  /**
   * Observes value changes on a IndexedDB item
   * @param {String} keyName
   * @returns {boolean}
   */
  public async entries(): Promise<[IDBValidKey, any][]> {
    return Promise.all(
      (await keys(this.store))
        .map(async (item: string) => [item, await this.getItem(item)])
    );
  }

  public observe(keyName: string, callback: (payload: any) => void): void {
    eventListener(eventName, keyName, callback);
  }
}
