import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

test('Default', t => {
  localStorage.setItem('demo', 'Hello World!');
  localPorridge.clear();

  const actual = localStorage.length;

  t.is(actual, 0);
});
