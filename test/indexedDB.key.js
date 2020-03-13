require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { WebPorridgeDB } = require('../lib');
const db = new WebPorridgeDB({ decodeBase64: true});

const browserEnv = require('browser-env');
const test = require('ava');

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
