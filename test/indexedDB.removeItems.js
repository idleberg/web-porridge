require("fake-indexeddb/auto");
require('localstorage-polyfill');

const { WebPorridgeDB } = require('../lib');
const db = new WebPorridgeDB({ decodeBase64: true});

const browserEnv = require('browser-env');
const test = require('ava');
const uuid  = require('uuid').v4;

browserEnv(['window']);

const {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON,
} = require('./shared');

test('String', async t => {
  const firstItem = uuid();
  const secondItem = uuid();

  await db.setItem(firstItem, actualString);
  await db.setItem(secondItem, actualString);

  await db.removeItems([firstItem, secondItem]);

  const actual = [
    localStorage.getItem(firstItem),
    localStorage.getItem(secondItem),
  ];

  t.deepEqual([null, null], actual);
});

test('Object key', async t => {
  const firstItem = uuid();
  const secondItem = uuid();
  const thirdItem = uuid();

  await db.setItem(firstItem, actualString);
  await db.setItem(secondItem, actualObject);
  await db.setItem(thirdItem, actualObject);

  await db.removeItems([
    firstItem,
    {
      key: secondItem,
      subKey: 'nested'
    },
    [
      thirdItem,
      'nested'
    ]
  ]);

  const actual = [
    await db.getItem(firstItem),
    await db.getItem(secondItem),
    await db.getItem(thirdItem),
  ];

  const expected = [
    null,
    {},
    {}
  ];

  t.deepEqual(actual, expected);
});
