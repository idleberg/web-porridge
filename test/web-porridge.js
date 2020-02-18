const { localPorridge } = require('../lib');
const browserEnv = require('browser-env');
const test = require('ava');

require('localstorage-polyfill');
browserEnv(['window']);

const actualString = 'Hello World!';
const actualObject = {
  nested: actualString
};
const invalidJSON = '{"nested":"Hello World!"';


test(`getItem() String`, t => {
	localStorage.setItem('demo', actualString);

  const expected = localPorridge.getItem('demo');

	t.is(actualString, expected);
});

test(`getItem() Valid JSON`, t => {
	localStorage.setItem('demo', JSON.stringify(actualObject));

  const actual = localPorridge.getItem('demo');

	t.deepEqual(actualObject, actual);
});

test(`getItem() Invalid JSON`, t => {
	localStorage.setItem('demo', invalidJSON);

  const actual = localPorridge.getItem('demo');

	t.is(invalidJSON, actual);
});

test(`getItem() true`, t => {
	localStorage.setItem('demo', 'true');

  const expected = true;
  const actual = localPorridge.getItem('demo');

	t.is(actual, expected);
});

test(`getItem() Object key`, t => {

	localStorage.setItem('demo', JSON.stringify(actualObject));

  const expected = localPorridge.getItem('demo', 'nested');

	t.is(actualString, expected);
});

test(`setItem() String`, t => {
	localPorridge.setItem('demo', actualString);

  const expected = localStorage.getItem('demo');

	t.is(actualString, expected);
});

test(`setItem() JSON`, t => {
	localPorridge.setItem('demo', actualObject);

  const expected = JSON.parse(localStorage.getItem('demo'));

	t.deepEqual(actualObject, expected);
});

test(`setItem() Object key`, t => {
	localPorridge.setItem('demo', actualString, 'nested');

  const expected = JSON.parse(localStorage.getItem('demo')).nested;

	t.deepEqual(actualString, expected);
});

test(`removeItem() String`, t => {
	localStorage.setItem('demo', actualString);
  localPorridge.removeItem('demo');

  const actual = localStorage.getItem('demo')
  const expected = null;

	t.is(actual, expected);
});

test(`removeItem() Object key`, t => {
	localStorage.setItem('demo', JSON.stringify({
    ...actualObject,
    deleteMe: true
  }));
  localPorridge.removeItem('demo', 'deleteMe');

  const actual = localStorage.getItem('demo')
  const expected = null;

	t.is(actual, JSON.stringify(actualObject));
});
