require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { db } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

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
