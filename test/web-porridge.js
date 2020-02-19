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
const actualBase64String = 'SGVsbG8gV29ybGQh';
const actualBase64Object = 'eyJuZXN0ZWQiOiJIZWxsbyBXb3JsZCEifQ==';
const invalidBase64JSON = 'eyJuZXN0ZWQiOiJIZWxsbyBXb3JsZCEi';


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

test(`getItem() false`, t => {
	localStorage.setItem('demo', 'false');

  const expected = false;
  const actual = localPorridge.getItem('demo');

	t.is(actual, expected);
});

test(`getItem() Int`, t => {
	localStorage.setItem('demo', '1');

  const expected = 1;
  const actual = localPorridge.getItem('demo');

	t.is(actual, expected);
});

test(`getItem() Float`, t => {
	localStorage.setItem('demo', '1.2');

  const expected = 1.2;
  const actual = localPorridge.getItem('demo');

	t.is(actual, expected);
});

test(`getItem() null`, t => {
	localStorage.setItem('demo', 'null');

  const expected = null;
  const actual = localPorridge.getItem('demo');

	t.is(actual, expected);
});

test(`getItem() Base64 String`, t => {
	localStorage.setItem('demo', actualBase64String);

  const actual = localPorridge.getItem('demo');

	t.is(actualString, actualString);
});

test(`getItem() Base64 Valid JSON`, t => {
	localStorage.setItem('demo', actualBase64Object);

  const actual = localPorridge.getItem('demo');

	t.deepEqual(actualObject, actual);
});

test(`getItem() Base64 Invalid JSON`, t => {
	localStorage.setItem('demo', invalidBase64JSON);

  const actual = localPorridge.getItem('demo');

	t.is(invalidJSON, actual);
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

test(`setItem() true`, t => {
	localPorridge.setItem('demo', true);

  const expected = localStorage.getItem('demo');

	t.is('true', expected);
});

test(`setItem() false`, t => {
	localPorridge.setItem('demo', false);

  const expected = localStorage.getItem('demo');

	t.is('false', expected);
});

test(`setItem() null`, t => {
	localPorridge.setItem('demo', null);

  const expected = localStorage.getItem('demo');

	t.is('null', expected);
});

test(`setItem() Int`, t => {
	localPorridge.setItem('demo', 1);

  const expected = localStorage.getItem('demo');

	t.is('1', expected);
});

test(`setItem() Float`, t => {
	localPorridge.setItem('demo', 1.2);

  const expected = localStorage.getItem('demo');

	t.is('1.2', expected);
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
