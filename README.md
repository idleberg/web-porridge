# web-porridge

[![npm](https://flat.badgen.net/npm/license/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![npm](https://flat.badgen.net/npm/v/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/web-porridge)](https://circleci.com/gh/idleberg/web-porridge)
[![David](https://flat.badgen.net/david/dep/idleberg/web-porridge)](https://david-dm.org/idleberg/web-porridge)

Feature-enhanced wrappers for the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface

- transparent (de)serialization
- transparent Base64 decoding (optional)
- Object-level read & write access
- batch operations
- support for events
- async transaction option (through [IndexedDB][indexeddb])
- about 2kb minified & gzipped (4kb for IndexedDB)

## Installation

`npm install web-porridge -S`

## Usage

### Module

All methods and properties of the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) have equivalents on `localPorridge` / `sessionPorridge`, completed by additional methods for batch operations.

```ts
import { localPorridge, sessionPorridge } from 'web-porridge';

// Optionally, use as drop-in replacement
window['localStorage'] = localPorridge;
window['sessionStorage'] = sessionPorridge;
```

Alternatively, you can import the class and instantiate with custom defaults, e.g. to globally enable Base64 decoding or to disable JSON decoding.

```ts
import { WebPorridge } from 'web-porridge';

const localPorridge = new WebPorridge('localStorage', {
    base64: true,
    json: false
});
```

**Note:** The Base64-decoding feature has primarily been added with [Amazon Cognito JWTs][cognito] in mind, but since it is impossible to tell apart text strings from Base64 encoded strings, it is now disabled by default. This behaviour can toggled globally (as seen in the example above) or in the method call options.

### Browser

It's intended to import the library in your code, but you can also use the `dist`-files or load them from a CDN. This library supports all modern browsers. You will need to BYOP (”Bring your own Polyfills”) to get it working in old browsers.

<details>
<summary><strong>Example</strong></summary>

```html
<script src="https://cdn.jsdelivr.net/npm/web-porridge@latest/dist/porridge.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const localPorridge = new WebPorridge('localStorage');
        const sessionPorridge = new WebPorridge('sessionStorage');
    });
</script>
```

⚠️ For performance reasons, it's recommend using an explicit version number (such as `0.15.2`) in URLs when loading from a CDN

</details>

### Methods

#### getItem

Usage: `getItem(key, dot.notation.subkey? = '', options = {})`

Returns the value of a single storage key, automatically parses JSON strings and, optionally, decodes Base64. Supports returning only the value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.getItem('firstItem');
localPorridge.getItem('secondItem', 'dot.notation.subkey');
```
</details>

The boolean options `base64` and `json` can be used to toggle decoding of the respective values.

#### getItems

Usage: `getItems([...], options = {})`

Returns value of many storage keys, automatically parses JSON strings and, optionally, decodes Base64. Supports returning only the value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.getItem([
    // String!
    'firstItem',
    {
        // Object!
        key: 'secondItem',
        subKey: 'dot.notation.subkey'
    },
    [
        // Array!
        'thirdItem',
        'dot.notation.subkey'
    ]
]);
```
</details>

The boolean options `base64` and `json` can be used to toggle decoding of the respective values.

#### setItem

Usage: `setItem(key, value, dot.notation.subkey? = '')`

Writes a single key/value pair to the storage, automatically stringifies objects. Supports overwriting a single value inside an object through the use of [dot notation][dot-notation] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.setItem('firstItem', 'Hello World');

localPorridge.setItem('secondItem', { name: 'John Appleseed' });
localPorridge.setItem('secondItem', 'Ada Lovelace', 'name');
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
        // Object!
        key: 'firstItem',
        value: 'Hello World!'
    },
    {
        // Another Object!
        key: 'secondItem',
        value: 'Appleseed',
        subKey: 'personal.lastName'
    },
    [
        // Array!
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
    // String!
    'firstItem',
    {
        // Object!
        key: 'secondItem',
        subKey: 'dot.notation.subkey'
    },
    [
        // Array!
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
localPorridge.dispatch('setItem', {
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

### IndexedDB

You can use the same interface to write key/value pairs to [IndexedDB][indexeddb] instead of Web Storage. This allows for asynchronous transactions while using the more familiar API.

**Note:** All [methods](#methods) and [properties](#properties) provided by the WebPorridge API are supported!

```ts
import { db } from 'web-porridge';

(async () => {
    const inputValue = 'Hello World!';

    await db.setItem('demo', inputValue);
    const outputValue = await db.getItem('demo');

    console.log(inputValue === outputValue);
    // true

    db.clear();
})();
```

Again, you can instantiate the class yourself to override its defaults.

```ts
import { WebPorridgeDB } from 'web-porridge';

const db = new WebPorridgeDB({
    db: 'Custom DB',
    base64: true,
    json: false,
    store: 'Custom Store'
});
```

When IndexedDB is supported by the browser, you can use this interface as drop-in replacement for Web Storage, including `sessionStorage`.

<details>
<summary><strong>Example</strong></summary>

```ts
import { db } from 'web-porridge';

window['sessionStorage'] = db;
window.addEventListener('beforeunload', () => sessionStorage.clear());
```
</details>

#### Browser

It's recommended to import the library in your code, but you can also use the `dist`-files or load them from a CDN.

<details>
<summary><strong>Example</strong></summary>

```html
<script src="https://cdn.jsdelivr.net/npm/web-porridge@latest/dist/porridge-db.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const db = new WebPorridgeDB();
    });
</script>
```

⚠️ For performance reasons, it's recommend using an explicit version number (such as `0.15.2`) in URLs when loading from a CDN

</details>

### Helpers

This module exposes its two helper function to encode and decode Base64:

<details>
<summary><strong>Example</strong></summary>

```ts
import { sessionPorridge, base64Encode, base64Decode } from 'web-porridge';

sessionPorridge.setItem('demo', base64Encode('Hello World!'));
const decodedStorage = base64Decode(sessionStorage.getItem('demo'));

const decodedPorridge = sessionPorridge.getItem('demo', { base64: true });

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
[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[cognito]: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
