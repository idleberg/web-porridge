import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ decodeBase64: true});

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

test('undefined', async t => {
  await db.clear();

  const actual = await db.key(0);

  t.is(actual, undefined);
});

test('Single Item', async t => {
  const expected = 'demo';

  await db.clear();
  await db.setItem(expected, 'Hello World!');

  const actual = await db.key(0);

  t.is(actual, expected);
});
