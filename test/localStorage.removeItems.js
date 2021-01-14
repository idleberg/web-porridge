import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');


import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import * as shared from './shared';

test('String', t => {
  localPorridge.setItem('firstItem', shared.actualString);
  localPorridge.setItem('secondItem', shared.actualString);

  localPorridge.removeItems(['firstItem', 'secondItem']);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
  ];

  t.deepEqual([null, null], actual);
});

test('Object key', t => {
  localPorridge.setItem('firstItem', shared.actualString);
  localPorridge.setItem('secondItem', shared.actualObject);
  localPorridge.setItem('thirdItem', shared.actualObject);

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
