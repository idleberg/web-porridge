import 'localstorage-polyfill';
import { WebPorridge } from '../lib/web-porridge.esm.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new WebPorridge('localStorage');

test('Empty', t => {
  localStorage.setItem('demo', 'Hello World!');
  localPorridge.clear();

  const actual = localStorage.length;

  t.is(actual, 0);
});

test('Not Empty', t => {
  localPorridge.clear();
  localStorage.setItem('demo', 'Hello World!');

  const actual = localStorage.length;

  t.is(actual, 1);
});
