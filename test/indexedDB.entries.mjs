import 'fake-indexeddb/auto.js';
import { Navigator } from 'node-navigator';
import { WebPorridgeDB } from '../lib/web-porridge.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
global['navigator'] = new Navigator();
window.indexedDB = {}

const db = new WebPorridgeDB();
const values = [0, 1, 3];

test.beforeEach(async () => {
	await db.clear();
});

test.serial('true', async t => {
  Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

  const actual = await db.entries();
  const expected = values.map(item => {
    return [`demo${item}`, item];
  });

  t.deepEqual(actual, expected);
});

test.serial('false', async t => {
  Promise.all(values.map(async item => await db.setItem(`demo${item}`, item)));

  await db.clear();
  const actual = await db.entries();
  const expected = [];

  t.deepEqual(actual, expected);
});
