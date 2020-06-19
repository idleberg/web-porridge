import * as dotProp from 'dot-prop';

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
    let item = this.getItem(keyName, null, { json: true });

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
   * @param {Array} item
   * @returns {*}
   */
  public getItems(input: (string | PayloadOptions)[], options: WebPorridgeOptions = {}) {
    if (isArray(input)) {
      return input.map(item => {
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
   * Removes single data item from WebStorage type
   * @param {String} item
   * @param {Object} subKeyName
   */
  public removeItem(keyName: string, subKeyName: string = '') {
    if (subKeyName) {
      const currentItem = this.getItem(keyName) || {};
      dotProp.delete(currentItem, subKeyName);

      return this.setItem(keyName, currentItem);
    }

    return (<any>global)[this.storageType].removeItem(keyName);
  }

  /**
   * Removes datas item from WebStorage type
   * @param {String} input
   */
  public removeItems(input: (string | PayloadOptions)[]) {
    if (isArray(input)) {
      return input.map(item => {
        if (typeof item === 'string') {
          return this.removeItem(item);
        } else if (isObject(item)) {
          return this.removeItem(item.key, item.subKey);
        } else if (isArray(item)) {
          return this.removeItem(item[0], item[1]);
        }
      });
    }
  }

  /**
  * Writes single data item to WebStorage type
  * @param {String} item
  * @param {*} value Hello
  * @param {Object} userOptions
  * @returns {*}
  */
 public setItem(keyName: string, keyValue: any, subKeyName: string = '') {
    if (subKeyName) {
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
  * @param {Array} item
  * @returns {*}
  */
  public setItems(input: PayloadOptions[]) {
    if (isArray(input)) {
      return input.map(item => {
        if (isObject(item)) {
          return this.setItem(item.key, item.value, item.subKey);
        } else if (isArray(item)) {
          return this.setItem(item[0], item[1], item[2]);
        }
      });
    }
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
      case 'getItem':
        key = payload.key;
        subKey = payload.subKey || '';
        opts = options || {};

        return this.getItem(key, subKey, options);

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
        return this.length();

      case 'clear':
        return this.clear();

      default:
        break;
    }
  }
}
