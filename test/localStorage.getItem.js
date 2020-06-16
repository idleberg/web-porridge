import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

const { WebPorridge } = require('../lib');
const localPorridge = new WebPorridge(
  'localStorage',
  {
    base64: true
  }
);

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} from './shared';

test('String', t => {
  localStorage.setItem('demo', actualString);

  const expected = localPorridge.getItem('demo');

  t.is(actualString, expected);
});

test('Valid JSON', t => {
  localStorage.setItem('demo', JSON.stringify(actualObject));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(actualObject, actual);
});

test('Valid JSON (no decoding)', t => {
  const jsonString = JSON.stringify(actualObject);

  localStorage.setItem('demo', jsonString);

  const actual = localPorridge.getItem('demo', '', { json: false});

  t.is(jsonString, actual);
});

test('Invalid JSON', t => {
  localStorage.setItem('demo', invalidJSON);

  const actual = localPorridge.getItem('demo');

  t.is(invalidJSON, actual);
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

test('Base64 String', t => {
  localStorage.setItem('demo', actualBase64String);

  const actual = localPorridge.getItem('demo');

  t.is(actualString, actualString);
});

test('Base64 Valid JSON', t => {
  localStorage.setItem('demo', actualBase64Object);

  const actual = localPorridge.getItem('demo');

  t.deepEqual(actualObject, actual);
});

test('Base64 Invalid JSON', t => {
  localStorage.setItem('demo', invalidBase64JSON);

  const actual = localPorridge.getItem('demo');

  t.is(invalidJSON, actual);
});

test('Object key', t => {

  localStorage.setItem('demo', JSON.stringify(actualObject));

  const actual = localPorridge.getItem('demo', 'nested');

  t.is('Bye World!', actual);
});
