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

test('String', async t => {
  const itemName = uuid();

  await db.setItem(itemName, actualString);
  await db.removeItem(itemName);

  const expected = null;
  const actual = await db.getItem(itemName)

  t.is(actual, expected);
});

test('Object key', async t => {
const itemName = uuid();

  await db.setItem(itemName, {
    ...actualObject,
    deleteMe: true
  });
  await db.removeItem(itemName, 'deleteMe');

  const actual = await db.getItem(itemName)

  t.deepEqual(actual, actualObject);
});
