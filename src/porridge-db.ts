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
    base64: false,
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
   * @returns {*}
   */
  public async getItem(keyName: string, subKeyName: string | null = '', options: WebPorridgeOptions = {}) {
    options = {
      ...this.options,
      ...options
    };

    let value: string = await getItem(keyName, this.store) ?? null;

    if (subKeyName) {
      const currentItem = await this.getItem(keyName, null, options) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    return (value && maybeDeserialize(value) && options.json === true)
      ? JSON.parse(value)
      : options.base64 ? maybeBase64Decode(value, options) : value;
  }

    /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
 public async getItems(input: (string | PayloadOptions)[], options: WebPorridgeOptions = {}) {
    if (isArray(input)) {
      return await Promise.all(
        await input.map(async item => {
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
   * @param {String} input
   */
  public async removeItems(input: (string | PayloadOptions)[]) {
    if (isArray(input)) {
      return await Promise.all(
        await input.map(async (item) => {
          if (typeof item === 'string') {
            return this.removeItem(item);
          } else if (isObject(item)) {
            return this.removeItem(item.key, item.subKey);
          } else if (isArray(item)) {
            return this.removeItem(item[0], item[1]);
          }
        })
      );
    }
  }

  /**
  * Writes single data item to WebStorage type
  * @param {String} item
  * @param {*} value
  * @param {Object} userOptions
  * @returns {*}
  */
 public async setItem(keyName: string, keyValue: any, subKeyName: string = '') {
    if (subKeyName) {
      const currentItem = await this.getItem(keyName) || {};
      dotProp.set(currentItem, subKeyName, keyValue);

      return await this.setItem(keyName, currentItem);
    }

    const newValue = (maybeSerialize(keyValue)) ? JSON.stringify(keyValue) : keyValue;

    return await setItem(keyName, newValue, this.store);
  }

  /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
 public async setItems(input: PayloadOptions[]) {
    if (isArray(input)) {
      return await Promise.all(
        await input.map(async (item) => {
          if (isObject(item)) {
            return await this.setItem(item.key, item.value, item.subKey);
          } else if (isArray(item)) {
            return await this.setItem(item[0], item[1], item[2]);
          }
        })
      );
    }
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

 /**
  * Clears WebStorage type
  * @returns {*}
  */
 public async clear() {
    return await clear(this.store);
  }

  /**
   * Registers an event listener on the window or custom element
   * @param {Element|Window} element
   * @returns {*}
   */
  public listen(element: Element | Window = window) {
    element.addEventListener(this.title, event => this.eventHandler(event));
  }

  /**
   * Removes an event listener on the window or custom element
   * @param {Element|Window} element
   * @returns {*}
   */
  public mute(element: Element | Window = window) {
    element.removeEventListener(this.title, event => this.eventHandler(event));
  }

  /**
   * Dispatches an event to WebPorridge listeners
   * @param {String} action
   * @param {*} payload
   * @returns {*}
   */
  public dispatch(action: string, payload: Number | PayloadOptions) {
    validateAction(action);

    const customEvent = new CustomEvent(
      this.title,
      {
        detail: {
          action: action,
          payload: payload
        }
      }
    );

    (<any>global).dispatchEvent(customEvent);
  }

  /**
   * Event handler
   * @param {Event} event
   * @returns {void}
   */
  private eventHandler(event: Event) {
    validateAction((<any>event).detail.action);

    let key, value, subKey, options;

    switch ((<any>event).detail.action) {
      case 'getItem':
        key = (<any>event).detail.payload.key;
        subKey = (<any>event).detail.payload.subKey || '';
        options = (<any>event).detail.options || {};

        return this.getItem(key, subKey, options);

      case 'getItems':
        key = (<any>event).detail.payload;
        options = (<any>event).detail.options || {};

        return this.getItems(key, options);

      case 'removeItem':
        key = (<any>event).detail.payload.key;
        subKey = (<any>event).detail.payload.subKey || '';

        return this.removeItem(key, subKey);

      case 'removeItems':
        key = (<any>event).detail.payload;

        return this.removeItems(key);

      case 'setItem':
        key = (<any>event).detail.payload.key;
        value = (<any>event).detail.payload.value;
        subKey = (<any>event).detail.payload.subKey || '';

        return this.setItem(key, value, subKey);

      case 'setItems':
        key = (<any>event).detail.payload;

        return this.setItems(key);

      case 'key':
        return this.key((<any>event).detail.payload);

      case 'length':
        return this.length;

      case 'clear':
        return this.clear();

      default:
        break;
    }
  }
}
