const { localPorridge, base64Encode } = require('../lib');

const actualString = 'Hello World!';
const actualObject = {
  nested: 'Bye World!'
};
const invalidJSON = '{"nested":"Hello World!"';
const actualBase64String = base64Encode(actualString);
const actualBase64Object = base64Encode(actualObject);
const invalidBase64JSON = base64Encode(invalidJSON);

module.exports = {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON
}
