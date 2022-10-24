# web-porridge

[![npm](https://flat.badgen.net/npm/license/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![npm](https://flat.badgen.net/npm/v/web-porridge)](https://www.npmjs.org/package/web-porridge)
[![CI](https://img.shields.io/github/workflow/status/idleberg/web-porridge/CI?style=flat-square)](https://github.com/idleberg/web-porridge/actions)
[![Snyk](https://flat.badgen.net/snyk/idleberg/web-porridge)](https://snyk.io/vuln/npm:web-porridge)

Feature-enhanced wrapper for both, [Storage API][] and [IndexedDB API][], sharing a common, familiar interface.

**Features**

-   stores structured data
-   automatic (de)serialization
-   Object-level read & write access
-   data expiry
-   additional convenience methods

## Installation

`npm install web-porridge -S`

## Usage

### Import

```ts
import { Porridge, PorridgeDB } from 'web-porridge';

const localPorridge = new Porridge();
const idb = new PorridgeDB();
```

Alternatively, you can import the module from [Skypack][]:

```ts
import { Porridge, PorridgeDB } from 'https://cdn.skypack.dev/web-porridge';

const localPorridge = new Porridge();
const idb = new PorridgeDB();
```

### Instance

#### Porridge

Usage: `new Porridge(store: 'localStorage' | 'sessionStorage' = 'localStorage')`

#### PorridgeDB

Usage: `new PorridgeDB(options?: {db: string; name: string})`

### Methods

All methods and properties of the [Storage API][] have equivalents on `localPorridge` / `sessionPorridge`, completed by additional methods for batch operations.

The following methods are available for both, Storage and IndexedDB. However, the key difference is that the former API is synchronous, while the latter is _mostly_ asynchronous.

#### setItem()

Usage: `setItem(key: string, value: any, options?)`

When passed a key name and value, will add that key to the given Storage object, or update that key's value if it already exists.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.setItem('firstItem', 'Hello World');

localPorridge.setItem('secondItem', { name: 'John Appleseed' });
localPorridge.setItem('secondItem', 'Ada Lovelace', { prop: 'name' });
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.setItem('firstItem', 'Hello World');

await idb.setItem('secondItem', { name: 'John Appleseed' });
await idb.setItem('secondItem', 'Ada Lovelace', { prop: 'name' });
```

</details>

#### getItem()

Usage: `getItem(key: string, options?)`

When passed a key name, will return that key's value, or `null` if the key does not exist, in the given Storage object.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.getItem('firstItem');
localPorridge.getItem('secondItem', { prop: 'dot.notation.property' });
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.getItem('firstItem');
await idb.getItem('secondItem', { prop: 'dot.notation.property' });
```

</details>

#### removeItem()

Usage: `removeItem(key: string, options?)`

When passed a key name, will remove that key from the given Storage object if it exists.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.removeItem('firstItem');
localPorridge.removeItem('secondItem', { prop: 'dot.notation.property' });
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.removeItem('firstItem');
await idb.removeItem('secondItem', { prop: 'dot.notation.property' });
```

</details>

#### clear()

Usage: `clear()`

Clears all keys stored in a given Storage object.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.clear();
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.clear();
```

</details>

#### key()

Usage: `key(index: number)`

When passed a number n, returns the name of the nth key in a given `Storage` object.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.key(0);
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.key(0);
```

</details>

#### length

Usage: `length`

Returns the number of data items stored in a given Storage object.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.length;
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.length;
```

</details>

#### hasItem()

Usage: `hasItem(key: string)`

When passed a key name, returns a boolean indicating whether that key exists in a given Storage object.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.hasItem('firstItem');
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.hasItem('firstItem');
```

</details>

#### keys()

Usage: `keys()`

Returns an array of a given object's Storage own enumerable property names, iterated in the same order that a normal loop would.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.keys();
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.keys();
```

</details>

#### values()

Usage: `values()`

Returns an array of a given Storage object's own enumerable property values, iterated in the same order that a normal loop would.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.values();
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.values();
```

</details>

#### entries()

Usage: `entries()`

Returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs, iterated in the same order that a normal loop would.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.entries();
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.entries();
```

</details>

#### didExpire()

Usage: `didExpire(key: string)`

When passed a key name, will return whether that key has expired.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.didExpire('firstItem');
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
await idb.didExpire('firstItem');
```

</details>

#### observe()

Usage: `observe(key: string, callback, targetOrigins = [])`

When passed a key name and callback function, it will listen to changes to the given Storage object's value. Optionally, changes can also be [broadcasted](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to cross-origin targets.

<details>
<summary><strong>Storage</strong></summary>

```ts
localPorridge.observe('demo', ({ key, value }) => {
	console.log(`${key} has changed to:`, value);
});
```

</details>

<details>
<summary><strong>IndexedDB</strong></summary>

```ts
idb.observe('demo', ({ key, value }) => {
	console.log(`${key} has changed to:`, value);
});
```

</details>

### Options

#### expires

Type: `string`

Sets an expiry date for the storage value. Can be anything that can be parsed by `new Date()`.

#### prop

Type: `string`

Specifies an object property as a dot notation string. Allows granular reads and updates.

## License

This work is licensed under [The MIT License](LICENSE)

[dot notation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#Dot_notation
[storage api]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[indexeddb api]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[skypack]: https://www.skypack.dev/view/web-porridge
