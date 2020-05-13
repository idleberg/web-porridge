import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ decodeBase64: true});

import browserEnv from 'browser-env';
import test from 'ava';
import { v4 as uuid } from 'uuid';

browserEnv(['window']);

import {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} from './shared';

test(`getItems(): String`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, actualString);
  await db.setItem(secondItem, actualString);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([actualString, actualString], actual);
});

test(`getItems(): Valid JSON`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, JSON.stringify(actualObject));
  await db.setItem(secondItem, JSON.stringify(actualObject));

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([actualObject, actualObject], actual);
});

test(`getItems(): Valid JSON (no decoding)`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  const jsonString = JSON.stringify(actualObject);

  await db.setItem(firstItem, jsonString);
  await db.setItem(secondItem, jsonString);

  const actual = await db.getItems([firstItem, secondItem], { decodeJSON: false});

  t.deepEqual([jsonString, jsonString], actual);
});

test(`getItems(): Invalid JSON`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, invalidJSON);
  await db.setItem(secondItem, invalidJSON);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([invalidJSON, invalidJSON], actual);
});

test(`getItems(): Object key`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();
  const thirdItem = uuid();

  await db.setItem(firstItem, JSON.stringify(actualObject));
  await db.setItem(secondItem, JSON.stringify(actualObject));
  await db.setItem(thirdItem, JSON.stringify(actualObject));

  const actual = await db.getItems([
    firstItem,
    {
      key: secondItem,
      subKey: 'nested'
    },
    [
      thirdItem,
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

test(`getItems(): true`, async t => {
 const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, true);
  await db.setItem(secondItem, true);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([true, true], actual);
});

test(`getItems(): false`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, false);
  await db.setItem(secondItem, false);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([false, false], actual);
});

test(`getItems(): null`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, null);
  await db.setItem(secondItem, null);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([null, null], actual);
});

test(`getItems(): Int`, async t => {
 const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, 1);
  await db.setItem(secondItem, 1);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([1, 1], actual);
});

test(`getItems(): Float`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();
  const thirdItem = uuid();

  await db.setItem(firstItem, '1.2');
  await db.setItem(secondItem, '1.20');
  await db.setItem(thirdItem, '120');

  const actual = await db.getItems([firstItem, secondItem, thirdItem]);

  t.deepEqual([1.2, '1.20', 120], actual);
});
