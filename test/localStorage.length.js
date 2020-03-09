require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { localPorridge } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

browserEnv(['window']);

test('Empty', t => {
  localStorage.clear();

  const actual = localPorridge.length;

  t.is(actual, 0);
});

test('Single Item', t => {
  localStorage.clear();
  localStorage.setItem('demo', 'Hello World!');

  const actual = localPorridge.length;

  t.is(actual, 1);
});
