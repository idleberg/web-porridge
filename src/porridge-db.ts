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
    let item = await this.getItem(keyName, null, { json: true });

    item = (item && maybeDeserialize(item))
      ? JSON.parse(item)
      : item;

    return subKeyName?.length
      ? dotProp.get(item, subKeyName)
      : item;
  }

  /**
   * Reads and decodes Base64 string from WebStorage type
   * @param {String} keyName
   * @param {Object} subKeyName
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

    const newValue = (maybeSerialize(keyValue))
      ? JSON.stringify(keyValue)
      : keyValue;

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
    const { action, options, payload } = (<any>event).detail;

    validateAction(action);

    let key, value, subKey, opts;

    switch (action) {
      case 'getBase64':
      case 'getItem':
        key = payload.key;
        subKey = payload.subKey || '';
        opts = options || {};

        return this[action](key, subKey, options);

      case 'getItems':
        key = payload;
        opts = options || {};

        return this.getItems(key, options);

      case 'removeItem':
        key = payload.key;
        subKey = payload.subKey || '';

        return this.removeItem(key, subKey);

      case 'removeItems':
        key = payload;

        return this.removeItems(key);

      case 'setItem':
        key = payload.key;
        value = payload.value;
        subKey = payload.subKey || '';

        return this.setItem(key, value, subKey);

      case 'setItems':
        key = payload;

        return this.setItems(key);

      case 'key':
        return this.key(payload);

      case 'length':
        return this.length;

      case 'clear':
        return this.clear();

      default:
        break;
    }
  }
}
