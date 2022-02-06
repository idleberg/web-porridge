import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { WebPorridgeDB } from '../lib/web-porridge.esm.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new WebPorridgeDB();

test.beforeEach(async () => {
	await db.clear();
});

test.serial('Empty', async t => {
  await db.setItem('demo', 'Hello World!');
  await db.clear();

  const actual = await db.length;

  t.is(actual, 0);
});

test.serial('Single Item', async t => {
  await db.clear();
  await db.setItem('demo', 'Hello World!');

  const actual = await db.length;

  t.is(actual, 1);
});
