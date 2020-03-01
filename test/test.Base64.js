const { localPorridge } = require('../lib');
const { encode, decode } = require('../lib/base64');
const browserEnv = require('browser-env');
const test = require('ava');

require('localstorage-polyfill');
browserEnv(['window']);

const {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} = require('./shared');

test(`Base64: Valid JSON`, t => {
  localStorage.setItem('demo', encode(JSON.stringify(actualObject)));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.deepEqual(decodedStorage, decodedPorridge)
});

test(`Base64: Valid JSON (no decoding)`, t => {
  const encodedObject = encode(JSON.stringify(actualObject));

  localStorage.setItem('demo', encodedObject);

  const decodedPorridge = localPorridge.getItem('demo', null, { decodeBase64: false});

  t.deepEqual(encodedObject, decodedPorridge)
});

test(`Base64: Invalid JSON`, t => {
  localStorage.setItem('demo', encode(invalidJSON));

  const decodedStorage = decode(localStorage.getItem('demo'));
  const decodedPorridge = localPorridge.getItem('demo');

  t.deepEqual(decodedStorage, decodedPorridge)
});

test(`Base64: true`, t => {
  localStorage.setItem('demo', encode(true));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: false`, t => {
  localStorage.setItem('demo', encode(false));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: null`, t => {
  localStorage.setItem('demo', encode(null));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: Int`, t => {
  localStorage.setItem('demo', encode(1));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: Float`, t => {
  localStorage.setItem('demo', encode(1.2));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});
