require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { localPorridge } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

browserEnv(['window']);

test('Default', t => {
  localStorage.setItem('demo', 'Hello World!');
  localPorridge.clear();

  const actual = localStorage.length;

  t.is(actual, 0);
});
