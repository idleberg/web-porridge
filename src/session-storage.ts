import * as Util from './util';

const title = 'sessionPorridge';
const storage = 'sessionStorage';

/**
 * Reads data from WebStorage type
 * @param {String} item
 * @param {Object} userOptions
 * @returns {*}
 */
function getItem(keyName: string, subKeyName: string = '') {
  return Util.getItem(storage, keyName, subKeyName);
}

/**
 * Removes data from WebStorage type
 * @param {String} item
 * @param {Object} userOptions
 */
function removeItem(keyName: string, subKeyName: string = '') {
  return Util.removeItem(storage, keyName, subKeyName);
}

/**
 * Reads from WebStorage type
 * @param {String} item
 * @param {*} value
 * @param {Object} userOptions
 * @returns {*}
 */
function setItem(keyName: string, keyValue: any, subKeyName: string = '') {
  return Util.setItem(storage, keyName, keyValue, subKeyName);
}

/**
 * Returns the length of WebStorage type
 * @param {Integer} index
 * @returns {*}
 */
function key(index: number) {
  return (<any>global)[storage].key(index);
}

/**
 * Clears WebStorage type
 * @returns {*}
 */
function clear() {
  return Util.clear(storage);
}

/**
 * Returns the length of WebStorage type
 * @returns {Integer}
 */
function __length__() {
  return Util.length(storage);
}

const length = __length__();

/**
 * Registers an event listener on the window or custom element
 * @param {Element|Window} element
 * @returns {*}
 */
function listen(element: Element | Window = window) {
  return Util.listen(title, element);
}

/**
 * Removes an event listener on the window or custom element
 * @param {Element|Window} element
 * @returns {*}
 */
function mute(element: Element | Window = window) {
  return Util.mute(title, element);
}

/**
 * Dispatches an event to WebPorridge listeners
 * @param {String} action
 * @param {*} payload
 * @returns {*}
 */
function dispatch(action: string, payload: any) {
  return Util.dispatch(title, action, payload);
}

export default {
  listen,
  clear,
  dispatch,
  getItem,
  length,
  removeItem,
  mute,
  setItem
};
