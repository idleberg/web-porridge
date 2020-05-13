import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

const { localPorridge } = require('../lib');
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

test('Default', t => {
  localStorage.setItem('demo', 'Hello World!');
  localPorridge.clear();

  const actual = localStorage.length;

  t.is(actual, 0);
});
