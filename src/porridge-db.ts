import { getProperty, setProperty, deleteProperty } from 'dot-prop';

import {
  clear,
  createStore,
  del as removeItemIdb,
  get as getItemIdb,
  keys,
  set as setItemIdb
} from 'idb-keyval';

import {
  deserialize,
  didExpire,
  getType,
  serialize,
  storageKeys
} from './util';

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
   * @param {String} [options.key]
   *
   * @returns
   */
  public async setItem(keyName: string, keyValue: unknown, options: WebPorridge.StorageOptions = {}): Promise<void> {
    if (options?.key?.length) {
      const item = await this.getItem(keyName) || {};
      setProperty(item, options.key, keyValue);

      return await this.setItem(keyName, item, {
        ...options,
        key: undefined
      });
    }

    const newValue = {
      [storageKeys.value]: serialize(keyValue),
      [storageKeys.type]: getType(keyValue)
    };

    if (options?.expires && String(options.expires).length) {
      newValue[storageKeys.expires] = new Date(options.expires);
    }

    return await setItemIdb(keyName, newValue, this.store);
  }

  /**
   * Reads single data item from IndexedDB
   * @param {String} keyName
   * @param {Object} [options]
   * @param {String} [options.expires]
   * @param {String} [options.key]
   * @returns
   */
   public async getItem(keyName: string, options?: WebPorridge.StorageOptions): Promise<string | unknown> {
    const item: WebPorridge.Payload = await getItemIdb(keyName, this.store);

    if (!item || didExpire(item[storageKeys.expires])) {
      return null;
    }

    const decodedItem = deserialize(item);

    if (item[storageKeys.type] === 'object' && options?.key?.length) {
      return getProperty(decodedItem, options.key);
    }

    return decodedItem;
  }

  /**
   * Removes single data item from IndexedDB
   * @param {String} keyName
   * @param {String} subKeyName
   */
  public async removeItem(keyName: string, subKeyName = ''): Promise<void> {
    if (subKeyName?.length) {
      const item = await this.getItem(keyName) || {};
      deleteProperty(item, subKeyName);

      return await this.setItem(keyName, item);
    }

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
    return await clear(this.store);
  }
}
