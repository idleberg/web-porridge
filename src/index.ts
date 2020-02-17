import * as dotProp from 'dot-prop';

import {
  validateAction,
  maybeDeserialize,
  maybeSerialize
} from './util';

class WebPorridge {
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
   * Reads data from WebStorage type
   * @param {String} item
   * @param {Object} userOptions
   * @returns {*}
   */
  getItem(keyName: string, subKeyName: string = '') {
    const value = (<any>global)[this.storageType].getItem(keyName);

    if (subKeyName) {
      const currentItem = this.getItem(keyName) || {};
      return dotProp.get(currentItem, subKeyName);
    }

    return (value && maybeDeserialize(value)) ? JSON.parse(value) : value;
  }

  /**
   * Removes data from WebStorage type
   * @param {String} item
   * @param {Object} userOptions
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
  * Reads from WebStorage type
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
  dispatch(action: string, payload: any) {
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

    let key, value, subkey;

    switch ((<any>event).detail.action) {
      case 'getItem':
        key = (<any>event).detail.payload.key;
        subkey = (<any>event).detail.payload.subkey || '';

        return this.getItem(key, subkey);

      case 'removeItem':
        key = (<any>event).detail.payload.key;
        subkey = (<any>event).detail.payload.subkey || '';

        return this.removeItem(key, subkey);

      case 'setItem':
        key = (<any>event).detail.payload.key;
        value = (<any>event).detail.payload.value;
        subkey = (<any>event).detail.payload.subkey || '';

        return this.setItem(key, value, subkey);

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

const localPorridge = new WebPorridge('local');
const sessionPorridge = new WebPorridge('session');

export {
  localPorridge,
  sessionPorridge
};
