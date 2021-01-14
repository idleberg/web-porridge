import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB();

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

test('Default', async t => {
  await db.setItem('demo', 'Hello World!');
  await db.clear();

  const actual = await db.length;

  t.is(actual, 0);
});
