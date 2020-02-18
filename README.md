# web-porridge

[![npm](https://flat.badgen.net/npm/license/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![npm](https://flat.badgen.net/npm/v/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/web-porridge)](https://circleci.com/gh/idleberg/web-porridge)
[![David](https://flat.badgen.net/david/dep/idleberg/web-porridge)](https://david-dm.org/idleberg/web-porridge)

Feature-enhanced wrappers for the [WebStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface

- transparent (de)serialization
- Object-level read & write access
- support for events

## Installation

`npm install web-porridge -S`

## Usage

**Example:**

```ts
import { localPorridge, sessionPorridge } from 'web-porridge';

// Populate some data
const demoData = {
    personal: {
        firstName: 'John',
        lastName: 'Appleseed',
        deleteMe: true
    }
};

// Initialize
localPorridge.setItem('demo', 'Session ready?');
sessionPorridge.setItem('sessionStart', Date.now());

// Write a JSON string
localPorridge.setItem('demo', demoData);

// John who?
localPorridge.getItem('demo', 'personal.lastName');

// Update last name
localPorridge.setItem('demo', 'McEnroe', 'personal.lastName');

// Remove item from Object
localPorridge.removeItem('demo', 'personal.deleteMe');

// Read below for more info!
localPorridge.removeItem('demo');
sessionPorridge.setItem('sessionEnd', Date.now());

// PS, for consistency there are naked wrappers available
localPorridge.key(0);
localPorridge.length;
localPorridge.clear();
```

### Methods

#### getItem

Usage: `getItem(key, dot.notation.subkey? = '')`

Returns the value of a storage key, automatically parses JSON strings. Supports returning only the value inside an object through the use of [dot notation][dot-notation] syntax.

📘 *[`Storage.getItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) on MDN*

#### setItem

Usage: `setItem(key, value, dot.notation.subkey? = '')`

Writes a key/value pair to the storage, automaticall stringifies objecs. Supports overwriting a single value inside an object through the use of [dot notation][dot-notation] syntax.

📘 *[`Storage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) on MDN*

#### removeItem

Usage: `removeItem(key, dot.notation.subkey? = '')`

Deletes a storage key or any object key through the use of [dot notation][dot-notation] syntax.

📘 *[`Storage.removeItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem) on MDN*

#### clear

> The `clear()` method of the [`Storage`][storage] interface clears all keys stored in a given `Storage` object.

📘 *[`Storage.clear()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear) on MDN*

#### key

> The **`key()`** method of the [`Storage`][storage] interface, when passed a number n, returns the name of the nth key in a given `Storage` object. The order of keys is user-agent defined, so you should not rely on it.

📘 *[`Storage.key()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/key) on MDN*

### Properties

#### length

> The *`length`* read-only property of the [`Storage`][storage] interface returns the number of data items stored in a given `Storage` object.

📘 *[`Storage.length`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length) on MDN*

### Events

The library provides methods to setup event listeners and dispatch WebPorridge actions. These actions are name after the [WebPorridge methods](#methods).

**Example:**

```ts
import { localPorridge } from 'web-porridge';

// Initialize event listeners
localPorridge.listen();

// Dispatch event
localPorridge.dispatch(
    'setItem', {
        key: 'demo',
        value: 'Hello World!'
    }
);

// Remove event listeners
localPorridge.mute();
```

#### listen

Usage: `listen(element: Element)`

Adds an event listener for WebPorridge actions

#### mute

Usage: `mute(element: Element)`

Removes an event listener

#### dispatch

Usage: `dispatch(action: string, payload: any)`

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/web-porridge) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`

[dot-notation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
