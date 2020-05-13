import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB({ decodeBase64: true});

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

test('undefined', async t => {
  await db.clear();

  const actual = await db.length;

  t.is(actual, 0);
});

test('Single Item', async t => {
  await db.clear();
  await db.setItem('demo', 'Hello World!');

  const actual = await db.length;

  t.is(actual, 1);
});
