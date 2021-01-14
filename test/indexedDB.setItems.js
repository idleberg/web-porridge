import 'fake-indexeddb/auto';
import 'localstorage-polyfill';

import { WebPorridgeDB } from '../lib';
const db = new WebPorridgeDB();

import { v4 as uuid } from 'uuid';
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

test('String', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: actualString
    },
    {
      key: `second${itemName}`,
      value: actualString
    },
    [
      `third${itemName}`,
      actualString
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    actualString,
    actualString,
    actualString
  ];

  t.deepEqual(actual, expected);
});

test('Valid JSON', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: actualObject
    },
    {
      key: `second${itemName}`,
      value: actualObject
    },
    [
      `third${itemName}`,
      actualObject
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    actualObject,
    actualObject,
    actualObject
  ];

  t.deepEqual(actual, expected);
});

test('Invalid JSON', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: invalidJSON
    },
    {
      key: `second${itemName}`,
      value: invalidJSON
    },
    [
      `third${itemName}`,
      invalidJSON
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`),
  ];

  const expected = [
    invalidJSON,
    invalidJSON,
    invalidJSON
  ]

  t.deepEqual(actual, expected);
});

test('Object key', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: actualObject
    },
    {
      key: `second${itemName}`,
      value: actualObject
    },
    [
      `third${itemName}`,
      actualObject
    ]
  ]);

  await db.setItems([
    {
      key: `first${itemName}`,
      value: actualString,
      subKey: 'nested'
    },
    {
      key: `second${itemName}`,
      value: actualString,
      subKey: 'nested'
    },
    [
      `third${itemName}`,
      actualString,
      'nested'
    ]
  ]);

  const actual = [
   (await db.getItem(`first${itemName}`)).nested,
   (await db.getItem(`second${itemName}`)).nested,
   (await db.getItem(`third${itemName}`)).nested
  ];

  const expected = [
    actualString,
    actualString,
    actualString
  ];

  t.deepEqual(actual, expected);
});

test('true', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: true
    },
    {
      key: `second${itemName}`,
      value: true
    },
    [
      `third${itemName}`,
      true
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    true,
    true,
    true
  ];

  t.deepEqual(actual, expected);
});

test('false', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: false
    },
    {
      key: `second${itemName}`,
      value: false
    },
    [
      `third${itemName}`,
      false
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    false,
    false,
    false
  ];

  t.deepEqual(actual, expected);
});

test('null', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: null
    },
    {
      key: `second${itemName}`,
      value: null
    },
    [
      `third${itemName}`,
      null
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    null,
    null,
    null
  ];

  t.deepEqual(actual, expected);
});

test('Int', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: 1
    },
    {
      key: `second${itemName}`,
      value: 1
    },
    [
      `third${itemName}`,
      1
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    1,
    1,
    1
  ];

  t.deepEqual(actual, expected);
});

test('Float', async t => {
  const itemName = uuid();

  await db.setItems([
    {
      key: `first${itemName}`,
      value: 1.2
    },
    {
      key: `second${itemName}`,
      value: 1.2
    },
    [
      `third${itemName}`,
      1.2
    ]
  ]);

  const actual = [
    await db.getItem(`first${itemName}`),
    await db.getItem(`second${itemName}`),
    await db.getItem(`third${itemName}`)
  ];

  const expected = [
    1.2,
    1.2,
    1.2
  ];

  t.deepEqual(actual, expected);
});
