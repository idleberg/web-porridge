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
  const itemName = uuid();

  await db.setItem(itemName, shared.actualString);
  await db.removeItem(itemName);

  const expected = null;
  const actual = await db.getItem(itemName)

  t.is(actual, expected);
});

test('Object key', async t => {
const itemName = uuid();

  await db.setItem(itemName, {
    ...shared.actualObject,
    deleteMe: true
  });
  await db.removeItem(itemName, 'deleteMe');

  const actual = await db.getItem(itemName)

  t.deepEqual(actual, shared.actualObject);
});
