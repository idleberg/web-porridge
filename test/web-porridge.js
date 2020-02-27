const { localPorridge } = require('../lib');
const { decode, encode } = require('../lib/base64');
const browserEnv = require('browser-env');
const test = require('ava');

require('localstorage-polyfill');
browserEnv(['window']);

const actualString = 'Hello World!';
const actualObject = {
  nested: 'Bye World!'
};
const invalidJSON = '{"nested":"Hello World!"';
const actualBase64String = encode(actualString);
const actualBase64Object = encode(actualObject);
const invalidBase64JSON = encode(invalidJSON);

test(`getItem(): String`, t => {
  localStorage.setItem('demo', actualString);

  const expected = localPorridge.getItem('demo');

  t.is(actualString, expected);
});

test(`getItem(): Valid JSON`, t => {
  localStorage.setItem('demo', JSON.stringify(actualObject));

  const actual = localPorridge.getItem('demo');

  t.deepEqual(actualObject, actual);
});

test(`getItem(): Invalid JSON`, t => {
  localStorage.setItem('demo', invalidJSON);

  const actual = localPorridge.getItem('demo');

  t.is(invalidJSON, actual);
});

test(`getItem(): true`, t => {
  localStorage.setItem('demo', 'true');

  const expected = true;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test(`getItem(): false`, t => {
  localStorage.setItem('demo', 'false');

  const expected = false;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test(`getItem(): Int`, t => {
  localStorage.setItem('demo', '1');

  const expected = 1;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test(`getItem(): Float`, t => {
  localStorage.setItem('demo', '1.2');

  const expected = 1.2;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test(`getItem(): null`, t => {
  localStorage.setItem('demo', 'null');

  const expected = null;
  const actual = localPorridge.getItem('demo');

  t.is(actual, expected);
});

test(`getItem(): Base64 String`, t => {
  localStorage.setItem('demo', actualBase64String);

  const actual = localPorridge.getItem('demo');

  t.is(actualString, actualString);
});

test(`getItem(): Base64 Valid JSON`, t => {
  localStorage.setItem('demo', actualBase64Object);

  const actual = localPorridge.getItem('demo');

  t.deepEqual(actualObject, actual);
});

test(`getItem(): Base64 Invalid JSON`, t => {
  localStorage.setItem('demo', invalidBase64JSON);

  const actual = localPorridge.getItem('demo');

  t.is(invalidJSON, actual);
});

test(`getItem(): Object key`, t => {

  localStorage.setItem('demo', JSON.stringify(actualObject));

  const actual = localPorridge.getItem('demo', 'nested');

  t.is('Bye World!', actual);
});

test(`getItems(): String`, t => {
  localStorage.setItem('firstItem', actualString);
  localStorage.setItem('secondItem', actualString);

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([actualString, actualString], actual);
});

test(`getItems(): Valid JSON`, t => {
  localStorage.setItem('firstItem', JSON.stringify(actualObject));
  localStorage.setItem('secondItem', JSON.stringify(actualObject));

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([actualObject, actualObject], actual);
});

test(`getItems(): Invalid JSON`, t => {
  localStorage.setItem('firstItem', invalidJSON);
  localStorage.setItem('secondItem', invalidJSON);

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([invalidJSON, invalidJSON], actual);
});

test(`getItems(): Object key`, t => {
  localStorage.setItem('firstItem', JSON.stringify(actualObject));
  localStorage.setItem('secondItem', JSON.stringify(actualObject));
  localStorage.setItem('thirdItem', JSON.stringify(actualObject));

  const actual = localPorridge.getItems([
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

  const expected = [
    actualObject,
    'Bye World!',
    'Bye World!'
  ]

  t.deepEqual(actual, expected);
});

test(`getItems(): true`, t => {
  localStorage.setItem('firstItem', 'true');
  localStorage.setItem('secondItem', 'true');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([true, true], actual);
});

test(`getItems(): false`, t => {
  localStorage.setItem('firstItem', 'false');
  localStorage.setItem('secondItem', 'false');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([false, false], actual);
});

test(`getItems(): null`, t => {
  localStorage.setItem('firstItem', 'null');
  localStorage.setItem('secondItem', 'null');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([null, null], actual);
});

test(`getItems(): Int`, t => {
  localStorage.setItem('firstItem', '1');
  localStorage.setItem('secondItem', '1');

  const actual = localPorridge.getItems(['firstItem', 'secondItem']);

  t.deepEqual([1, 1], actual);
});

test(`getItems(): Float`, t => {
  localStorage.setItem('firstItem', '1.2');
  localStorage.setItem('secondItem', '1.20');
  localStorage.setItem('thirdItem', '120');

  const actual = localPorridge.getItems(['firstItem', 'secondItem', 'thirdItem']);

  t.deepEqual([1.2, '1.20', 120], actual);
});

test(`setItem(): String`, t => {
  localPorridge.setItem('demo', actualString);

  const actual = localStorage.getItem('demo');

  t.is(actualString, actual);
});

test(`setItem(): Valid JSON`, t => {
  localPorridge.setItem('demo', actualObject);

  const actual = JSON.parse(localStorage.getItem('demo'));

  t.deepEqual(actualObject, actual);
});

test(`setItem(): Invalid JSON`, t => {
  localPorridge.setItem('demo', invalidJSON);

  const actual = localStorage.getItem('demo');

  t.is(invalidJSON, actual);
});

test(`setItem(): Object key`, t => {
  localPorridge.setItem('demo', actualObject);
  localPorridge.setItem('demo', actualString, 'nested');

  const actual = JSON.parse(localStorage.getItem('demo')).nested;

  t.deepEqual(actualString, actual);
});

test(`setItem(): true`, t => {
  localPorridge.setItem('demo', true);

  const actual = localStorage.getItem('demo');

  t.is('true', actual);
});

test(`setItem(): false`, t => {
  localPorridge.setItem('demo', false);

  const actual = localStorage.getItem('demo');

  t.is('false', actual);
});

test(`setItem(): null`, t => {
  localPorridge.setItem('demo', null);

  const actual = localStorage.getItem('demo');

  t.is('null', actual);
});

test(`setItem(): Int`, t => {
  localPorridge.setItem('demo', 1);

  const actual = localStorage.getItem('demo');

  t.is('1', actual);
});

test(`setItem(): Float`, t => {
  localPorridge.setItem('demo', 1.2);

  const actual = localStorage.getItem('demo');

  t.is('1.2', actual);
});

test(`setItems(): String`, t => {
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

test(`setItems(): Valid JSON`, t => {
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

test(`setItems(): Invalid JSON`, t => {
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

test(`setItems(): Object key`, t => {
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

test(`setItems(): true`, t => {
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

test(`setItems(): false`, t => {
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

test(`setItems(): null`, t => {
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

test(`setItems(): Int`, t => {
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

test(`setItems(): Float`, t => {
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

test(`removeItem(): String`, t => {
  localStorage.setItem('demo', actualString);
  localPorridge.removeItem('demo');

  const expected = null;
  const actual = localStorage.getItem('demo')

  t.is(actual, expected);
});

test(`removeItem(): Object key`, t => {
  localStorage.setItem('demo', JSON.stringify({
    ...actualObject,
    deleteMe: true
  }));
  localPorridge.removeItem('demo', 'deleteMe');

  const actual = localStorage.getItem('demo')

  t.is(actual, JSON.stringify(actualObject));
});

test(`removeItems(): String`, t => {
  localPorridge.setItem('firstItem', actualString);
  localPorridge.setItem('secondItem', actualString);

  localPorridge.removeItems(['firstItem', 'secondItem']);

  const actual = [
    localStorage.getItem('firstItem'),
    localStorage.getItem('secondItem'),
  ];

  t.deepEqual([null, null], actual);
});

test(`removeItems(): Object key`, t => {
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

test(`decode() String`, t => {
  localStorage.setItem('demo', encode(actualString));

  const decodedStorage = decode(localStorage.getItem('demo'));
  const decodedPorridge = localPorridge.getItem('demo');

  t.is(decodedStorage, decodedPorridge)
});

test(`Base64: Valid JSON`, t => {
  localStorage.setItem('demo', encode(JSON.stringify(actualObject)));

  const decodedStorage = JSON.parse(decode(localStorage.getItem('demo')));
  const decodedPorridge = localPorridge.getItem('demo');

  t.deepEqual(decodedStorage, decodedPorridge)
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
