var t=["[object Array]","[object Boolean]","[object Null]","[object Object]"];function r(r){try{var n=JSON.parse(r),e=Object.prototype.toString.call(n);return t.includes(e)||"[object Number]"===e&&b(r)}catch(t){return!1}}function n(r){var n=Object.prototype.toString.call(r);return t.includes(n)}function e(t,n){void 0===n&&(n=!0);var e=u(t)&&function(t){return new RegExp("^".concat("(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?","$"),"gi").test(t)}(t)?c(t):t;return e&&r(e)&&n?JSON.parse(e):e}function o(t){var r=n(t)?JSON.stringify(t):String(t);return Buffer.from(r).toString("base64")}function c(t){return Buffer.from(t,"base64").toString("binary")}function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function a(t){return"[object Object]"===Object.prototype.toString.call(t)}function u(t){return"[object String]"===Object.prototype.toString.call(t)}function b(t){return!isNaN(parseFloat(t))&&parseFloat(t.toString()).toString()===t.toString()}export{c as base64Decode,o as base64Encode,i as isArray,a as isObject,b as isSerializableNumber,u as isString,e as maybeBase64Decode,r as maybeDeserialize,n as maybeSerialize};