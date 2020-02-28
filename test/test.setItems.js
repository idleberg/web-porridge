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
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: actualString
    },
    {
      key: 'secondItem',
      value: actualString
    },
    [
      'thirdItem',
      actualString
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem')
  ];

  const expected = [
    actualString,
    actualString,
    actualString
  ];

  t.deepEqual(actual, expected);
});

test('Valid JSON', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: actualObject
    },
    {
      key: 'secondItem',
      value: actualObject
    },
    [
      'thirdItem',
      actualObject
    ]
  ]);

  const actual = [
    JSON.parse(localStorage.getItem('firstItem')),
    JSON.parse(localStorage.getItem('secondItem')),
    JSON.parse(localStorage.getItem('thirdItem'))
  ];

  const expected = [
    actualObject,
    actualObject,
    actualObject
  ];

  t.deepEqual(actual, expected);
});

test('Invalid JSON', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: invalidJSON
    },
    {
      key: 'secondItem',
      value: invalidJSON
    },
    [
      'thirdItem',
      invalidJSON
    ]
  ]);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
    localStorage.getItem('thirdItem'),
  ];

  const expected = [
    invalidJSON,
    invalidJSON,
    invalidJSON
  ]

  t.deepEqual(actual, expected);
});

test('Object key', t => {
  localPorridge.setItems([
    {
      key: 'firstItem',
      value: actualObject
    },
    {
      key: 'secondItem',
      value: actualObject
    },
    [
      'thirdItem',
      actualObject
    ]
  ]);

  localPorridge.setItems([
    {
      key: 'firstItem',
      value: actualString,
      subKey: 'nested'
    },
    {
      key: 'secondItem',
      value: actualString,
      subKey: 'nested'
    },
    [
      'thirdItem',
      actualString,
      'nested'
    ]
  ]);

  const actual = [
    JSON.parse(localStorage.getItem('firstItem')).nested,
    JSON.parse(localStorage.getItem('secondItem')).nested,
    JSON.parse(localStorage.getItem('thirdItem')).nested
  ];

  const expected = [
    actualString,
    actualString,
    actualString
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
