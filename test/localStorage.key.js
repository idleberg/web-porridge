require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { localPorridge } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

browserEnv(['window']);

test('undefined', t => {
  localStorage.clear();

  const actual = localPorridge.key(0);

  t.is(actual, undefined);
});

test('Single Item', t => {
  const expected = 'demo';

  localStorage.clear();
  localStorage.setItem(expected, 'Hello World!');

  const actual = localPorridge.key(0);

  t.is(actual, expected);
});
