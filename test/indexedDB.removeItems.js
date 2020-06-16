import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ base64: true});

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

test('String', async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, actualString);
  await db.setItem(secondItem, actualString);

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

  await db.setItem(firstItem, actualString);
  await db.setItem(secondItem, actualObject);
  await db.setItem(thirdItem, actualObject);

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
