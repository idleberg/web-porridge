# web-porridge

[![npm](https://flat.badgen.net/npm/license/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![npm](https://flat.badgen.net/npm/v/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/web-porridge)](https://circleci.com/gh/idleberg/web-porridge)
[![David](https://flat.badgen.net/david/dep/idleberg/web-porridge)](https://david-dm.org/idleberg/web-porridge)

Feature-enhanced wrappers for the [WebStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface

- transparent (de)serialization
- transparent Base64 decoding
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

Returns the value of a storage key, automatically parses JSON strings and transparently decodes Base64. Supports returning only the value inside an object through the use of [dot notation][dot-notation] syntax.

#### setItem

Usage: `setItem(key, value, dot.notation.subkey? = '')`

Writes a key/value pair to the storage, automaticall stringifies objecs. Supports overwriting a single value inside an object through the use of [dot notation][dot-notation] syntax.

#### removeItem

Usage: `removeItem(key, dot.notation.subkey? = '')`

Deletes a storage key or any object key through the use of [dot notation][dot-notation] syntax.

#### clear

> The `clear()` method of the [`Storage`][storage] interface clears all keys stored in a given `Storage` object.

#### key

> The **`key()`** method of the [`Storage`][storage] interface, when passed a number n, returns the name of the nth key in a given `Storage` object. The order of keys is user-agent defined, so you should not rely on it.

### Properties

#### length

> The *`length`* read-only property of the [`Storage`][storage] interface returns the number of data items stored in a given `Storage` object.

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

### Helpers

This module exports two helper function to encode and decode Base64:

```ts
import { sessionPorridge } from 'web-porridge';
import { encode, decode } from 'web-porridge/base64';

const encodedItem = encode('Hello World!');
sessionPorridge.setItem('demo', encodedItem);
const decodedItem = sessionPorridge.getItem('demo');

console.log(decodedItem === 'Hello World!');
// true
```

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/web-porridge) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`

[dot-notation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#Dot_notation
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
