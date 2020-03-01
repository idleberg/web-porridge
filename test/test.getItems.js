const { localPorridge } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

require('localstorage-polyfill');
browserEnv(['window']);

const {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} = require('./shared');

test(`getItems(): String`, t => {
  localStorage.setItem('firstItem', actualString);
  localStorage.setItem('secondItem', actualString);

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([actualString, actualString], actual);
});

test(`getItems(): Valid JSON`, t => {
  localStorage.setItem('firstItem', JSON.stringify(actualObject));
  localStorage.setItem('secondItem', JSON.stringify(actualObject));

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([actualObject, actualObject], actual);
});

test(`getItems(): Valid JSON (no decoding)`, t => {
  const jsonString = JSON.stringify(actualObject);

  localStorage.setItem('firstItem', jsonString);
  localStorage.setItem('secondItem', jsonString);

  const actual = localPorridge.getItems(['firstItem', 'secondItem'], { decodeJSON: false});

  t.deepEqual([jsonString, jsonString], actual);
});

test(`getItems(): Invalid JSON`, t => {
  localStorage.setItem('firstItem', invalidJSON);
  localStorage.setItem('secondItem', invalidJSON);

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([invalidJSON, invalidJSON], actual);
});

test(`getItems(): Object key`, t => {
  localStorage.setItem('firstItem', JSON.stringify(actualObject));
  localStorage.setItem('secondItem', JSON.stringify(actualObject));
  localStorage.setItem('thirdItem', JSON.stringify(actualObject));

  const actual = localPorridge.getItems([
    'firstItem',
    {
      key: 'secondItem',
      subKey: 'nested'
    },
    [
      'thirdItem',
      'nested'
    ]
  ]);

  const expected = [
    actualObject,
    'Bye World!',
    'Bye World!'
  ]

  t.deepEqual(actual, expected);
});

test(`getItems(): true`, t => {
  localStorage.setItem('firstItem', 'true');
  localStorage.setItem('secondItem', 'true');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([true, true], actual);
});

test(`getItems(): false`, t => {
  localStorage.setItem('firstItem', 'false');
  localStorage.setItem('secondItem', 'false');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([false, false], actual);
});

test(`getItems(): null`, t => {
  localStorage.setItem('firstItem', 'null');
  localStorage.setItem('secondItem', 'null');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([null, null], actual);
});

test(`getItems(): Int`, t => {
  localStorage.setItem('firstItem', '1');
  localStorage.setItem('secondItem', '1');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([1, 1], actual);
});

test(`getItems(): Float`, t => {
  localStorage.setItem('firstItem', '1.2');
  localStorage.setItem('secondItem', '1.20');
  localStorage.setItem('thirdItem', '120');

  const actual = localPorridge.getItems(['firstItem', 'secondItem', 'thirdItem']);

  t.deepEqual([1.2, '1.20', 120], actual);
});
