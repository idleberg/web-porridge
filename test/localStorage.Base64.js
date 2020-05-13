import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

const { WebPorridge } = require('../lib');
const localPorridge = new WebPorridge(
  'localStorage',
  {
    decodeBase64: true
  }
);

import { base64Decode, base64Encode } from '../lib/';
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

test(`Base64: Valid JSON`, t => {
  localStorage.setItem('demo', base64Encode(JSON.stringify(actualObject)));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.deepEqual(decodedStorage, decodedPorridge)
});

test(`Base64: Valid JSON (no decoding)`, t => {
  const encodedObject = base64Encode(JSON.stringify(actualObject));

  localStorage.setItem('demo', encodedObject);

  const decodedPorridge = localPorridge.getItem('demo', null, { decodeBase64: false});

  t.deepEqual(encodedObject, decodedPorridge)
});

test(`Base64: Invalid JSON`, t => {
  localStorage.setItem('demo', base64Encode(invalidJSON));

  const decodedStorage = base64Decode(localStorage.getItem('demo'));
  const decodedPorridge = localPorridge.getItem('demo');

  t.deepEqual(decodedStorage, decodedPorridge)
});

test(`Base64: true`, t => {
  localStorage.setItem('demo', base64Encode(true));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: false`, t => {
  localStorage.setItem('demo', base64Encode(false));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: null`, t => {
  localStorage.setItem('demo', base64Encode(null));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: Int`, t => {
  localStorage.setItem('demo', base64Encode(1));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: Float`, t => {
  localStorage.setItem('demo', base64Encode(1.2));

  const decodedStorage = JSON.parse(base64Decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});
