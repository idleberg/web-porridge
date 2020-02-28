const { localPorridge } = require('../lib');
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
