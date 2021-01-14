import { base64Encode } from '../lib/util';

const actualString = 'Hello World!';
const actualObject = {
  nested: 'Bye World!'
};
const invalidJSON = '{"nested":"Hello World!"';
const actualBase64String = base64Encode(actualString);
const actualBase64Object = base64Encode(actualObject);
const invalidBase64JSON = base64Encode(invalidJSON);

export {
  actualString,
  actualObject,
  invalidJSON,
  actualBase64String,
  actualBase64Object,
  invalidBase64JSON
};
