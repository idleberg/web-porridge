import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB();

import browserEnv from 'browser-env';
import test from 'ava';
import { v4 as uuid } from 'uuid';

browserEnv(['window']);

import * as shared from './shared';

test('String', async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, shared.actualString);
  await db.setItem(secondItem, shared.actualString);

  await db.removeItems([firstItem, secondItem]);

  const actual = [
    localStorage.getItem(firstItem),
    localStorage.getItem(secondItem),
  ];

  t.deepEqual([null, null], actual);
});

test('Object key', async t => {
  const firstItem = uuid();
  const secondItem = uuid();
  const thirdItem = uuid();

  await db.setItem(firstItem, shared.actualString);
  await db.setItem(secondItem, shared.actualObject);
  await db.setItem(thirdItem, shared.actualObject);

  await db.removeItems([
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

  const actual = [
    await db.getItem(firstItem),
    await db.getItem(secondItem),
    await db.getItem(thirdItem),
  ];

  const expected = [
    null,
    {},
    {}
  ];

  t.deepEqual(actual, expected);
});
