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
  localPorridge.setItem('firstItem', actualString);
  localPorridge.setItem('secondItem', actualString);

  localPorridge.removeItems(['firstItem', 'secondItem']);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
  ];

  t.deepEqual([null, null], actual);
});

test('Object key', t => {
  localPorridge.setItem('firstItem', actualString);
  localPorridge.setItem('secondItem', actualObject);
  localPorridge.setItem('thirdItem', actualObject);

  localPorridge.removeItems([
    'firstItem',
    {
      key: 'secondItem',
      subKey: 'nested'
    },
    [
      'thirdItem',
      'nested'
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    JSON.parse(localStorage.getItem('secondItem')),
    JSON.parse(localStorage.getItem('thirdItem')),
  ];

  const expected = [
    null,
    {},
    {}
  ];

  t.deepEqual(actual, expected);
});
