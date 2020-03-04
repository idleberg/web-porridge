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

  constructor(type: string) {
    switch (type.toLowerCase()) {
      case 'local':
      case 'localstorage':
        this.storageType = 'localStorage';
        this.title = 'localPorridge';
        break;

      case 'session':
      case 'sessionstorage':
        this.storageType = 'sessionStorage';
        this.title = 'sessionPorridge';
        break;

      default:
        throw 'Invalid storage type specified';
    }
  }

  /**
   * Reads single data item from WebStorage type
   * @param {String} item
   * @param {Object} subKeyName
   * @returns {*}
   */
  getItem(keyName: string, subKeyName: string | null = '', options: GetItemOptions = {}) {
    options = {
      decodeBase64: true,
      decodeJSON: true,
      ...options
    };

    const value = (<any>global)[this.storageType].getItem(keyName);

    if (subKeyName) {
      const currentItem = this.getItem(keyName, '', options) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    return (value && maybeDeserialize(value) && options.decodeJSON === true)
      ? JSON.parse(value)
      : options.decodeBase64 ? maybeBase64Decode(value, options) : value;
  }

    /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
  getItems(input: (string | PayloadOptions)[], options: GetItemOptions = {}) {
    if (isArray(input)) {
      return input.map(item => {
        if (typeof item === 'string') {
          return this.getItem(item, null, options);
        } else if (isObject(item)) {
          return this.getItem(item.key, item.subKey, options);
        } else if (isArray(item)) {
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
  removeItem(keyName: string, subKeyName: string = '') {
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
  removeItems(input: (string | PayloadOptions)[]) {
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
  * @param {*} value
  * @param {Object} userOptions
  * @returns {*}
  */
  setItem(keyName: string, keyValue: any, subKeyName: string = '') {
    if (subKeyName) {
      const currentItem = this.getItem(keyName) || {};
      dotProp.set(currentItem, subKeyName, keyValue);

      return this.setItem(keyName, currentItem);
    }

    const newValue = (maybeSerialize(keyValue)) ? JSON.stringify(keyValue) : keyValue;

    return (<any>global)[this.storageType].setItem(keyName, newValue);
  }

  /**
  * Writes data items to WebStorage type
  * @param {Array} item
  * @returns {*}
  */
  setItems(input: PayloadOptions[]) {
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
  key(index: number) {
    return (<any>global)[this.storageType].key(index);
  }

  /**
   * Returns the length of WebStorage type
   * @returns {Integer}
   */
  length() {
    return (<any>global)[this.storageType].length;
  }

 /**
  * Clears WebStorage type
  * @returns {*}
  */
  clear() {
    return (<any>global)[this.storageType].clear;
  }

  /**
   * Registers an event listener on the window or custom element
   * @param {Element|Window} element
   * @returns {*}
   */
  listen(element: Element | Window = window) {
    element.addEventListener(this.title, event => this.eventHandler(event));
  }

  /**
   * Removes an event listener on the window or custom element
   * @param {Element|Window} element
   * @returns {*}
   */
  mute(element: Element | Window = window) {
      element.removeEventListener(this.title, event => this.eventHandler(event));
  }

  /**
   * Dispatches an event to WebPorridge listeners
   * @param {String} action
   * @param {*} payload
   * @returns {*}
   */
  dispatch(action: string, payload: Number | PayloadOptions) {
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

    let key, value, subKey;

    switch ((<any>event).detail.action) {
      case 'getItem':
        key = (<any>event).detail.payload.key;
        subKey = (<any>event).detail.payload.subKey || '';

        return this.getItem(key, subKey);

      case 'removeItem':
        key = (<any>event).detail.payload.key;
        subKey = (<any>event).detail.payload.subKey || '';

        return this.removeItem(key, subKey);

      case 'setItem':
        key = (<any>event).detail.payload.key;
        value = (<any>event).detail.payload.value;
        subKey = (<any>event).detail.payload.subKey || '';

        return this.setItem(key, value, subKey);

      case 'key':
        return this.key((<any>event).detail.payload);

      case 'length':
        return this.length();

      case 'clear':
        return this.clear();

      default:
        break;
    }
  }
}
