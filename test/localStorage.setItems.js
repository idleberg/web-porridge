import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridge } from '../lib';
const localPorridge = new WebPorridge('localStorage');

import browserEnv from 'browser-env';
import test from 'ava';

browserEnv(['window']);

import * as shared from './shared';

test('String', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: shared.actualString
    },
    {
      key: 'secondItem',
      value: shared.actualString
    },
    [
      'thirdItem',
      shared.actualString
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    shared.actualString,
    shared.actualString,
    shared.actualString
  ];

  t.deepEqual(actual, expected);
});

test('Valid JSON', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: shared.actualObject
    },
    {
      key: 'secondItem',
      value: shared.actualObject
    },
    [
      'thirdItem',
      shared.actualObject
    ]
  ]);

  const actual = [
    JSON.parse(localStorage.getItem('firstItem')),
    JSON.parse(localStorage.getItem('secondItem')),
    JSON.parse(localStorage.getItem('thirdItem'))
  ];

  const expected = [
    shared.actualObject,
    shared.actualObject,
    shared.actualObject
  ];

  t.deepEqual(actual, expected);
});

test('Invalid JSON', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: shared.invalidJSON
    },
    {
      key: 'secondItem',
      value: shared.invalidJSON
    },
    [
      'thirdItem',
      shared.invalidJSON
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem'),
  ];

  const expected = [
    shared.invalidJSON,
    shared.invalidJSON,
    shared.invalidJSON
  ]

  t.deepEqual(actual, expected);
});

test('Object key', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: shared.actualObject
    },
    {
      key: 'secondItem',
      value: shared.actualObject
    },
    [
      'thirdItem',
      shared.actualObject
    ]
  ]);

  localPorridge.setItems([
    {
      key: 'firstItem',
      value: shared.actualString,
      subKey: 'nested'
    },
    {
      key: 'secondItem',
      value: shared.actualString,
      subKey: 'nested'
    },
    [
      'thirdItem',
      shared.actualString,
      'nested'
    ]
  ]);

  const actual = [
    JSON.parse(localStorage.getItem('firstItem')).nested,
    JSON.parse(localStorage.getItem('secondItem')).nested,
    JSON.parse(localStorage.getItem('thirdItem')).nested
  ];

  const expected = [
    shared.actualString,
    shared.actualString,
    shared.actualString
  ];

  t.deepEqual(actual, expected);
});

test('true', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: true
    },
    {
      key: 'secondItem',
      value: true
    },
    [
      'thirdItem',
      true
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    'true',
    'true',
    'true'
  ];

  t.deepEqual(actual, expected);
});

test('false', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: false
    },
    {
      key: 'secondItem',
      value: false
    },
    [
      'thirdItem',
      false
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    'false',
    'false',
    'false'
  ];

  t.deepEqual(actual, expected);
});

test('null', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: null
    },
    {
      key: 'secondItem',
      value: null
    },
    [
      'thirdItem',
      null
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    'null',
    'null',
    'null'
  ];

  t.deepEqual(actual, expected);
});

test('Int', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: 1
    },
    {
      key: 'secondItem',
      value: 1
    },
    [
      'thirdItem',
      1
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    '1',
    '1',
    '1'
  ];

  t.deepEqual(actual, expected);
});

test('Float', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: 1.2
    },
    {
      key: 'secondItem',
      value: 1.2
    },
    [
      'thirdItem',
      1.2
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    '1.2',
    '1.2',
    '1.2'
  ];

  t.deepEqual(actual, expected);
});
