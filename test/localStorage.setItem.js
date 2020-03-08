require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { localPorridge } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

browserEnv(['window']);

const {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} = require('./shared');

test('String', t => {
  localPorridge.setItem('demo', actualString);

  const actual = localStorage.getItem('demo');

  t.is(actualString, actual);
});

test('Valid JSON', t => {
  localPorridge.setItem('demo', actualObject);

  const actual = JSON.parse(localStorage.getItem('demo'));

  t.deepEqual(actualObject, actual);
});

test('Invalid JSON', t => {
  localPorridge.setItem('demo', invalidJSON);

  const actual = localStorage.getItem('demo');

  t.is(invalidJSON, actual);
});

test('Object key', t => {
  localPorridge.setItem('demo', actualObject);
  localPorridge.setItem('demo', actualString, 'nested');

  const actual = JSON.parse(localStorage.getItem('demo')).nested;

  t.deepEqual(actualString, actual);
});

test('true', t => {
  localPorridge.setItem('demo', true);

  const actual = localStorage.getItem('demo');

  t.is('true', actual);
});

test('false', t => {
  localPorridge.setItem('demo', false);

  const actual = localStorage.getItem('demo');

  t.is('false', actual);
});

test('null', t => {
  localPorridge.setItem('demo', null);

  const actual = localStorage.getItem('demo');

  t.is('null', actual);
});

test('Int', t => {
  localPorridge.setItem('demo', 1);

  const actual = localStorage.getItem('demo');

  t.is('1', actual);
});

test('Float', t => {
  localPorridge.setItem('demo', 1.2);

  const actual = localStorage.getItem('demo');

  t.is('1.2', actual);
});
