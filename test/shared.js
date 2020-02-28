const { localPorridge } = require('../lib');
const { encode } = require('../lib/base64');

const actualString = 'Hello World!';
const actualObject = {
  nested: 'Bye World!'
};
const invalidJSON = '{"nested":"Hello World!"';
const actualBase64String = encode(actualString);
const actualBase64Object = encode(actualObject);
const invalidBase64JSON = encode(invalidJSON);

module.exports = {
  actualString: actualString,
  actualObject: actualObject,
  invalidJSON: invalidJSON,
  actualBase64String: actualBase64String,
  actualBase64Object: actualBase64Object,
  invalidBase64JSON: invalidBase64JSON
}
