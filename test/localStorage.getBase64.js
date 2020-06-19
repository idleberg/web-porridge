import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

const { WebPorridge } = require('../lib');
const localPorridge = new WebPorridge(
  'localStorage'
);

import { base64Decode, base64Encode } from '../lib';
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

test('Valid JSON', t => {
  localStorage.setItem('demo', base64Encode(JSON.stringify(actualObject)));

  const expected = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const actual = localPorridge.getBase64('demo');

  t.deepEqual(expected, actual)
});

test('Valid JSON (no decoding)', t => {
  const encodedObject = base64Encode(JSON.stringify(actualObject));

  localStorage.setItem('demo', encodedObject);

  const decodedPorridge = localPorridge.getBase64('demo', null, { json: false });

  t.is(JSON.stringify(actualObject), decodedPorridge)
});

test('null', t => {
  localStorage.setItem('demo', base64Encode(null));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getBase64('demo');

  t.is(decodedStorage, decodedPorridge)
});

test('Int', t => {
  localStorage.setItem('demo', base64Encode(1));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getBase64('demo');

  t.is(decodedStorage, decodedPorridge)
});

test('Float', t => {
  localStorage.setItem('demo', base64Encode(1.2));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getBase64('demo');

  t.is(decodedStorage, decodedPorridge)
});
