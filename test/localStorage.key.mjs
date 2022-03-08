import 'localstorage-polyfill';
import { Porridge } from '../lib/web-porridge.js';
import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);
const localPorridge = new Porridge('localStorage');

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
