# web-porridge

[![npm](https://flat.badgen.net/npm/license/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![npm](https://flat.badgen.net/npm/v/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/web-porridge)](https://circleci.com/gh/idleberg/web-porridge)
[![David](https://flat.badgen.net/david/dep/idleberg/web-porridge)](https://david-dm.org/idleberg/web-porridge)

Feature-enhanced wrappers for the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface

- transparent (de)serialization
- transparent Base64 decoding
- Object-level read & write access
- batch operations
- support for events

## Installation

`npm install web-porridge -S`

## Usage

All methods and properties of the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) have equivalents on `localPorridge` / `sessionPorridge`, completed by additional methods for batch operations.

### Methods

#### getItem

Usage: `getItem(key, dot.notation.subkey? = '')`

Returns the value of a single storage key, automatically parses JSON strings and transparently decodes Base64. Supports returning only the value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.getItem('firstItem');
localPorridge.getItem('secondItem', 'dot.notation.subkey');
```
</details>

#### getItems

Usage: `getItems([...])`

Returns value of many storage keys, automatically parses JSON strings and transparently decodes Base64. Supports returning only the value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.getItem([
    'firstItem',
    {
        key: 'secondItem',
        subKey: 'dot.notation.subkey'
    },
    [
        'thirdItem',
        'dot.notation.subkey'
    ]
]);
```
</details>

#### setItem

Usage: `setItem(key, value, dot.notation.subkey? = '')`

Writes a single key/value pair to the storage, automatically stringifies objects. Supports overwriting a single value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.setItem('firstItem', 'Hello World');

localPorridge.setItem('secondItem', { name: 'John Appleseed' });
localPorridge.setItem('secondItem', 'Ava Lovelace', 'name');
```
</details>

#### setItems

Usage: `setItems([...])`

Writes many key/value pairs to the storage, automatically stringifies objects. Supports overwriting a single value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.setItems([
    {
        key: 'firstItem',
        value: 'Hello World!'
    },
    {
        key: 'secondItem',
        value: 'Appleseed',
        subKey: 'personal.lastName'
    },
    [
        'thirdItem',
        'Lovelace',
        'personal.lastName'
    ]
]);
```
</details>

#### removeItem

Usage: `removeItem(key, dot.notation.subkey? = '')`

Deletes a single storage key or object key through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.removeItem('firstItem');
localPorridge.removeItem('secondItem', 'dot.notation.subkey');
```
</details>

#### removeItems

Usage: `removeItems([...])`

Deletes storage keys or object keys through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.removeItems([
    'firstItem',
    {
        key: 'secondItem',
        subKey: 'dot.notation.subkey'
    },
    [
        'thirdItem',
        'dot.notation.subkey'
    ]
]);
```
</details>

#### clear

> The `clear()` method of the [`Storage`][storage] interface clears all keys stored in a given `Storage` object.
>
> – [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear)

#### key

> The **`key()`** method of the [`Storage`][storage] interface, when passed a number n, returns the name of the nth key in a given `Storage` object. The order of keys is user-agent defined, so you should not rely on it.
>
> – [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage/key)

### Properties

#### length

> The *`length`* read-only property of the [`Storage`][storage] interface returns the number of data items stored in a given `Storage` object.
>
> – [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length)

### Events

The library provides methods to setup event listeners and dispatch WebPorridge actions. These actions are name after the [WebPorridge methods](#methods).

<details>
<summary><strong>Example</strong></summary>

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
</details>

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

<details>
<summary><strong>Example</strong></summary>

```ts
import { sessionPorridge } from 'web-porridge';
import { encode, decode } from 'web-porridge/base64';

sessionPorridge.setItem('demo', encode('Hello World!'));
const decodedStorage = decode(sessionStorage.getItem('demo'));

// Decoding Base64 string works transparently!
const decodedPorridge = sessionPorridge.getItem('demo');

console.log(decodedPorridge === decodedStorage);
// true
```
</details>

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome to support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/web-porridge) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`

[dot-notation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#Dot_notation
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
