import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB();

import browserEnv from 'browser-env';
import test from 'ava';
import { v4 as uuid } from 'uuid';

browserEnv(['window']);

import * as shared from './shared';

test(`String`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, shared.actualString);
  await db.setItem(secondItem, shared.actualString);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([shared.actualString, shared.actualString], actual);
});

test(`Valid JSON`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, JSON.stringify(shared.actualObject));
  await db.setItem(secondItem, JSON.stringify(shared.actualObject));

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([shared.actualObject, shared.actualObject], actual);
});

test(`Valid JSON (no decoding)`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  const jsonString = JSON.stringify(shared.actualObject);

  await db.setItem(firstItem, jsonString);
  await db.setItem(secondItem, jsonString);

  const actual = await db.getItems([firstItem, secondItem], { json: false});

  t.deepEqual([jsonString, jsonString], actual);
});

test(`Invalid JSON`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, shared.invalidJSON);
  await db.setItem(secondItem, shared.invalidJSON);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([shared.invalidJSON, shared.invalidJSON], actual);
});

test(`Object key`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();
  const thirdItem = uuid();

  await db.setItem(firstItem, JSON.stringify(shared.actualObject));
  await db.setItem(secondItem, JSON.stringify(shared.actualObject));
  await db.setItem(thirdItem, JSON.stringify(shared.actualObject));

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
    shared.actualObject,
    'Bye World!',
    'Bye World!'
  ]

  t.deepEqual(actual, expected);
});

test(`true`, async t => {
 const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, true);
  await db.setItem(secondItem, true);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([true, true], actual);
});

test(`false`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, false);
  await db.setItem(secondItem, false);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([false, false], actual);
});

test(`null`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, null);
  await db.setItem(secondItem, null);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([null, null], actual);
});

test(`Int`, async t => {
 const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, 1);
  await db.setItem(secondItem, 1);

  const actual = await db.getItems([firstItem, secondItem]);

  t.deepEqual([1, 1], actual);
});

test(`Float`, async t => {
  const firstItem = uuid();
  const secondItem = uuid();
  const thirdItem = uuid();

  await db.setItem(firstItem, '1.2');
  await db.setItem(secondItem, '1.20');
  await db.setItem(thirdItem, '120');

  const actual = await db.getItems([firstItem, secondItem, thirdItem]);

  t.deepEqual([1.2, '1.20', 120], actual);
});
