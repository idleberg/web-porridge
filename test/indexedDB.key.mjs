import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { PorridgeDB } from '../lib/web-porridge.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new PorridgeDB();

test.beforeEach(async () => {
	await db.clear();
});

test.serial('undefined', async t => {
  await db.clear();

  const actual = await db.key(0);

  t.is(actual, undefined);
});

test.serial('Single Item', async t => {
  const expected = 'demo';

  await db.clear();
  await db.setItem(expected, 'Hello World!');

  const actual = await db.key(0);

  t.is(actual, expected);
});
