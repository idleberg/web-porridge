import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

const { localPorridge } = require('../lib');
import browserEnv from 'browser-env';
import test from 'ava';

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
