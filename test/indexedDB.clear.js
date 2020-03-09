require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { db } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

browserEnv(['window']);

test('Default', async t => {
  await db.setItem('demo', 'Hello World!');
  await db.clear();

  const actual = await db.length;

  t.is(actual, 0);
});
