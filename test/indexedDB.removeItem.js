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
  const itemName = uuid();

  await db.setItem(itemName, actualString);
  await db.removeItem(itemName);

  const expected = null;
  const actual = await db.getItem(itemName)

  t.is(actual, expected);
});

test('Object key', async t => {
const itemName = uuid();

  await db.setItem(itemName, {
    ...actualObject,
    deleteMe: true
  });
  await db.removeItem(itemName, 'deleteMe');

  const actual = await db.getItem(itemName)

  t.deepEqual(actual, actualObject);
});
