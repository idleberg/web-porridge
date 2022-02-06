# web-porridge

[![npm](https://flat.badgen.net/npm/license/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![npm](https://flat.badgen.net/npm/v/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![CI](https://img.shields.io/github/workflow/status/idleberg/web-porridge/CI?style=flat-square)](https://github.com/idleberg/web-porridge/actions)
[![David](https://flat.badgen.net/david/dep/idleberg/web-porridge)](https://david-dm.org/idleberg/web-porridge)

Feature-enhanced wrapper for [Web Storage API][] and [IndexedDB API][], one interface to rule them all

**Features**

-   structured data
-   automatic (de)serialization
-   Object-level read & write access
-   data expiry

## Installation

`npm install web-porridge -S`

## Usage

### Module

All methods and properties of the [Web Storage API][] have equivalents on `localPorridge` / `sessionPorridge`, completed by additional methods for batch operations.

```ts
import { WebPorridge, WebPorridgeDB } from 'web-porridge';

const localPorridge = new WebPorridge('localStorage' /* optional */);
const sessionPorridge = new WebPorridge('sessionStorage');
const indexedDB = new WebPorridgeDB();
```

### Browser

It's intended to import the library in your code, but you can also use the `dist`-files or load them from a CDN. This library supports all modern browsers. You will need to BYOP (”Bring your own Polyfills”) to get it working in old browsers.

<details>
<summary><strong>Example</strong></summary>

```html
<script src="https://cdn.jsdelivr.net/npm/web-porridge@latest/lib/web-porridge.esm.js"></script>

<script type="module">
    document.addEventListener('DOMContentLoaded', function () {
        const localPorridge = new WebPorridge('localStorage');
        const sessionPorridge = new WebPorridge('sessionStorage');
    });
</script>
```

:warning: When you embed the module a CDN such as JSDelivr, make sure to replace `latest`-part in the URL for a specific version. Otherwise, your page speed might suffer.

</details>

### Methods

#### getItem

Usage: `getItem(key, options?)`

Returns the value of a single storage key, automatically parses JSON strings and, optionally, decodes Base64. Supports returning only the value inside an object through the use of [dot notation][] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.getItem('firstItem');
localPorridge.getItem('secondItem', { key: 'dot.notation.subkey' });
```

</details>

#### setItem

Usage: `setItem(key, value, options?)`

Writes a single key/value pair to the storage, automatically stringifies objects. Supports overwriting a single value inside an object through the use of [dot notation][] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.setItem('firstItem', 'Hello World');

localPorridge.setItem('secondItem', { name: 'John Appleseed' });
localPorridge.setItem('secondItem', 'Ada Lovelace', { key: 'name' });
```

</details>

#### removeItem

Usage: `removeItem(key, dot.notation.subkey?)`

Deletes a single storage key or object key through the use of [dot notation][] syntax.

<details>
<summary><strong>Example</strong></summary>

```ts
localPorridge.removeItem('firstItem');
localPorridge.removeItem('secondItem', 'dot.notation.subkey');
```

</details>

#### clear

See [`clear()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear) on MDN.

#### key

See [`key()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/key) on MDN

#### length

See [`length`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/length) on MDN

## License

This work is licensed under [The MIT License](LICENSE)

[dot notation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#Dot_notation
[web storage api]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[indexeddb api]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
