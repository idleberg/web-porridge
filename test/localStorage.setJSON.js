import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

const { localPorridge } = require('../lib');
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
  localPorridge.setJSON('demo', actualString);

  const actual = localStorage.getItem('demo');

  t.is(actualString, actual);
});

test('Valid JSON', t => {
  localPorridge.setJSON('demo', actualObject);

  const actual = JSON.parse(localStorage.getItem('demo'));

  t.deepEqual(actualObject, actual);
});

test('Invalid JSON', t => {
  localPorridge.setJSON('demo', invalidJSON);

  const actual = localStorage.getItem('demo');

  t.is(invalidJSON, actual);
});

test('Object key', t => {
  localPorridge.setJSON('demo', actualObject);
  localPorridge.setJSON('demo', actualString, 'nested');

  const actual = JSON.parse(localStorage.getItem('demo')).nested;

  t.deepEqual(actualString, actual);
});

test('true', t => {
  localPorridge.setJSON('demo', true);

  const actual = localStorage.getItem('demo');

  t.is('true', actual);
});

test('false', t => {
  localPorridge.setJSON('demo', false);

  const actual = localStorage.getItem('demo');

  t.is('false', actual);
});

test('null', t => {
  localPorridge.setJSON('demo', null);

  const actual = localStorage.getItem('demo');

  t.is('null', actual);
});

test('Int', t => {
  localPorridge.setJSON('demo', 1);

  const actual = localStorage.getItem('demo');

  t.is('1', actual);
});

test('Float', t => {
  localPorridge.setJSON('demo', 1.2);

  const actual = localStorage.getItem('demo');

  t.is('1.2', actual);
});
