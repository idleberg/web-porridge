import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} from './shared';

test(`String`, t => {
  localStorage.setItem('firstItem', actualString);
  localStorage.setItem('secondItem', actualString);

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([actualString, actualString], actual);
});

test(`Valid JSON`, t => {
  localStorage.setItem('firstItem', JSON.stringify(actualObject));
  localStorage.setItem('secondItem', JSON.stringify(actualObject));

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([actualObject, actualObject], actual);
});

test(`Valid JSON (no decoding)`, t => {
  const jsonString = JSON.stringify(actualObject);

  localStorage.setItem('firstItem', jsonString);
  localStorage.setItem('secondItem', jsonString);

  const actual = localPorridge.getItems(['firstItem', 'secondItem'], { json: false });

  t.deepEqual([jsonString, jsonString], actual);
});

test(`Invalid JSON`, t => {
  localStorage.setItem('firstItem', invalidJSON);
  localStorage.setItem('secondItem', invalidJSON);

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([invalidJSON, invalidJSON], actual);
});

test(`Object key`, t => {
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

test(`true`, t => {
  localStorage.setItem('firstItem', 'true');
  localStorage.setItem('secondItem', 'true');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([true, true], actual);
});

test(`false`, t => {
  localStorage.setItem('firstItem', 'false');
  localStorage.setItem('secondItem', 'false');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([false, false], actual);
});

test(`null`, t => {
  localStorage.setItem('firstItem', 'null');
  localStorage.setItem('secondItem', 'null');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([null, null], actual);
});

test(`Int`, t => {
  localStorage.setItem('firstItem', '1');
  localStorage.setItem('secondItem', '1');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([1, 1], actual);
});

test(`Float`, t => {
  localStorage.setItem('firstItem', '1.2');
  localStorage.setItem('secondItem', '1.20');
  localStorage.setItem('thirdItem', '120');

  const actual = localPorridge.getItems(['firstItem', 'secondItem', 'thirdItem']);

  t.deepEqual([1.2, '1.20', 120], actual);
});
