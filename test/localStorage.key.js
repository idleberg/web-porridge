import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

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
