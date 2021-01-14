import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import * as shared from './shared';

test('String', t => {
  localStorage.setItem('demo', shared.actualString);

  const expected = localPorridge.getItem('demo');

  t.is(shared.actualString, expected);
});


test('Valid JSON', t => {
  localStorage.setItem('demo', JSON.stringify(shared.actualObject));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(shared.actualObject, actual);
});

test('Valid JSON (no decoding)', t => {
  const jsonString = JSON.stringify(shared.actualObject);

  localStorage.setItem('demo', jsonString);

  const actual = localPorridge.getItem('demo', '', { json: false });

  t.is(jsonString, actual);
});

test('Invalid JSON', t => {
  localStorage.setItem('demo', shared.invalidJSON);

  const actual = localPorridge.getItem('demo');

  t.is(shared.invalidJSON, actual);
});

test('true', t => {
  localStorage.setItem('demo', 'true');

  const expected = true;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test('false', t => {
  localStorage.setItem('demo', 'false');

  const expected = false;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test('Int', t => {
  localStorage.setItem('demo', '1');

  const expected = 1;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test('Float', t => {
  localStorage.setItem('demo', '1.2');

  const expected = 1.2;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test('null', t => {
  localStorage.setItem('demo', 'null');

  const expected = null;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test('Object key', t => {

  localStorage.setItem('demo', JSON.stringify(shared.actualObject));

  const actual = localPorridge.getItem('demo', 'nested');

  t.is('Bye World!', actual);
});
