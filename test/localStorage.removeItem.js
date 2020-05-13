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
  localStorage.setItem('demo', actualString);
  localPorridge.removeItem('demo');

  const expected = null;
  const actual = localStorage.getItem('demo')

  t.is(actual, expected);
});

test('Object key', t => {
  localStorage.setItem('demo', JSON.stringify({
    ...actualObject,
    deleteMe: true
  }));
  localPorridge.removeItem('demo', 'deleteMe');

  const actual = localStorage.getItem('demo')

  t.is(actual, JSON.stringify(actualObject));
});
