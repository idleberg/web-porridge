import * as dotProp from 'dot-prop';

const serializables = [
  '[object Array]',
  '[object Object]'
];

/**
 * Checks whether input data requires deserialization after readin it from WebStorage
 * @param {*} data
 * @returns {boolean}
 */
function maybeDeserialize(data): boolean {
  try {
    const result = JSON.parse(data);
    const type: string = Object.prototype.toString.call(result);

    return serializables.includes(type);
  } catch (error) {

    return false;
  }
}

/**
 * Checks whether input data requires serialization prior to writing it to WebStorage
 * @param {*} data
 * @returns {boolean}
 */
function maybeSerialize(data: string | Object): boolean {
   const type: string = Object.prototype.toString.call(data);

  return serializables.includes(type);
}

function isValidAction(action: string) {
  return [
    'clear',
    'getItem',
    'removeItem',
    'setItem',
  ].includes(action);
}

/**
 * Reads data from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {Object} userOptions
 * @returns {*}
 */
function getItem(storage: string, keyName: string, subKeyName: string = '') {
  const value = (<any>global)[storage].getItem(keyName);

  if (subKeyName) {
    const currentItem = getItem(storage, keyName) || {};
    return dotProp.get(currentItem, subKeyName);
  }

  return (value && maybeDeserialize(value)) ? JSON.parse(value) : value;
}

/**
 * Removes data from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {Object} userOptions
 */
function removeItem(storage: string, keyName: string, subKeyName: string = '') {
  if (subKeyName) {
    const currentItem = getItem(storage, keyName) || {};
    dotProp.delete(currentItem, subKeyName);

    return setItem(storage, keyName, currentItem);
  }

  return (<any>global)[storage].removeItem(keyName);
}

/**
 * Reads from WebStorage type
 * @param {String} storage
 * @param {String} item
 * @param {*} value
 * @param {Object} userOptions
 * @returns {*}
 */
function setItem(storage: string, keyName: string, keyValue: any, subKeyName: string = '') {
  if (subKeyName) {
    const currentItem = getItem(storage, keyName) || {};
    dotProp.set(currentItem, subKeyName, keyValue);

    return setItem(storage, keyName, currentItem);
  }

  const newValue = (maybeSerialize(keyValue)) ? JSON.stringify(keyValue) : keyValue;

  return (<any>global)[storage].setItem(keyName, newValue);
}

/**
 * Returns the length of WebStorage type
 * @param {String} storage
 * @param {Integer} index
 * @returns {*}
 */
function key(storage: string, index: number) {
  return (<any>global)[storage].key(index);
}

/**
 * Returns the length of WebStorage type
 * @param {String} storage
 * @returns {Integer}
 */
function length(storage: string) {
  return (<any>global)[storage].length;
}

/**
 * Clears WebStorage type
 * @param {String} storage
 * @returns {*}
 */
function clear(storage: string) {
  return (<any>global)[storage].clear;
}

/**
 * Registers an event listener on the window or custom element
 * @param {String} storage
 * @param {Element|Window} element
 * @returns {*}
 */
function listen(storage: string, element: Element | Window = window) {
  element.addEventListener(storage, event => eventHandler(storage, event));
}

/**
 * Removes an event listener on the window or custom element
 * @param {String} storage
 * @param {Element|Window} element
 * @returns {*}
 */
function mute(storage: string, element: Element | Window = window) {
    element.removeEventListener(storage, event => eventHandler(storage, event));
}

/**
 * Dispatches an event to WebPorridge listeners
 * @param {String} storage
 * @param {String} action
 * @param {*} payload
 * @returns {*}
 */
function dispatch(storage: string, action: string, payload: any) {
  if (!isValidAction(action)) {
    throw 'Invalid action argument provided';
  }

  const customEvent = new CustomEvent(
    storage,
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
 * @param {String} storage
 * @param {Event} event
 * @returns {void}
 */
function eventHandler(storage: string, event: Event) {
    let key, value, subkey;

    switch ((<any>event).detail.action) {
      case 'getItem':
        key = (<any>event).detail.payload.key;
        subkey = (<any>event).detail.payload.subkey || '';

        return getItem(storage, key, subkey);

      case 'removeItem':
        key = (<any>event).detail.payload.key;
        subkey = (<any>event).detail.payload.subkey || '';

        return removeItem(storage, key, subkey);

      case 'setItem':
        key = (<any>event).detail.payload.key;
        value = (<any>event).detail.payload.value;
        subkey = (<any>event).detail.payload.subkey || '';

        return setItem(storage, key, value, subkey);

      case 'key':
        return key(storage, (<any>event).detail.payload);

      case 'length':
        return length(storage);

      case 'clear':
        return clear(storage);

      default:
        throw 'Invalid action argument provided';
    }
}

export {
  clear,
  dispatch,
  getItem,
  key,
  length,
  listen,
  mute,
  removeItem,
  setItem
};
