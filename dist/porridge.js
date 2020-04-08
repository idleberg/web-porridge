!function(e,t){for(var r in t)e[r]=t[r]}(window,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);t.WebPorridge=n.default},function(e,t,r){"use strict";(function(e){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var o=r(3),i=r(5),a=function(){function t(e,t){if(void 0===t&&(t={}),this.options={decodeBase64:!1,decodeJSON:!0},!e)throw Error("Storage type not declared in constructor");switch(e){case"localStorage":this.title="localPorridge";break;case"sessionStorage":this.title="sessionPorridge";break;default:throw"Invalid storage type specified"}this.options=n(n({},this.options),t),this.storageType=e}return t.prototype.getItem=function(t,r,a){void 0===r&&(r=""),void 0===a&&(a={}),a=n(n({},this.options),a);var s=e[this.storageType].getItem(t);if(r){var u=this.getItem(t,"",a)||{};return o.get(u,r)}return s&&i.maybeDeserialize(s)&&!0===a.decodeJSON?JSON.parse(s):a.decodeBase64?i.maybeBase64Decode(s,a):s},t.prototype.getItems=function(e,t){var r=this;if(void 0===t&&(t={}),i.isArray(e))return e.map((function(e){return"string"==typeof e?r.getItem(e,null,t):i.isObject(e)?r.getItem(e.key,e.subKey,t):i.isArray(e)?r.getItem(e[0],e[1],t):void 0}))},t.prototype.removeItem=function(t,r){if(void 0===r&&(r=""),r){var n=this.getItem(t)||{};return o.delete(n,r),this.setItem(t,n)}return e[this.storageType].removeItem(t)},t.prototype.removeItems=function(e){var t=this;if(i.isArray(e))return e.map((function(e){return"string"==typeof e?t.removeItem(e):i.isObject(e)?t.removeItem(e.key,e.subKey):i.isArray(e)?t.removeItem(e[0],e[1]):void 0}))},t.prototype.setItem=function(t,r,n){if(void 0===n&&(n=""),n){var a=this.getItem(t)||{};return o.set(a,n,r),this.setItem(t,a)}var s=i.maybeSerialize(r)?JSON.stringify(r):r;return e[this.storageType].setItem(t,s)},t.prototype.setItems=function(e){var t=this;if(i.isArray(e))return e.map((function(e){return i.isObject(e)?t.setItem(e.key,e.value,e.subKey):i.isArray(e)?t.setItem(e[0],e[1],e[2]):void 0}))},t.prototype.key=function(t){return e[this.storageType].key(t)},Object.defineProperty(t.prototype,"length",{get:function(){return e[this.storageType].length},enumerable:!0,configurable:!0}),t.prototype.clear=function(){return e[this.storageType].clear()},t.prototype.listen=function(e){var t=this;void 0===e&&(e=window),e.addEventListener(this.title,(function(e){return t.eventHandler(e)}))},t.prototype.mute=function(e){var t=this;void 0===e&&(e=window),e.removeEventListener(this.title,(function(e){return t.eventHandler(e)}))},t.prototype.dispatch=function(t,r){i.validateAction(t);var n=new CustomEvent(this.title,{detail:{action:t,payload:r}});e.dispatchEvent(n)},t.prototype.eventHandler=function(e){var t,r,n,o;switch(i.validateAction(e.detail.action),e.detail.action){case"getItem":return t=e.detail.payload.key,n=e.detail.payload.subKey||"",o=e.detail.options||{},this.getItem(t,n,o);case"getItems":return t=e.detail.payload,o=e.detail.options||{},this.getItems(t,o);case"removeItem":return t=e.detail.payload.key,n=e.detail.payload.subKey||"",this.removeItem(t,n);case"removeItems":return t=e.detail.payload,this.removeItems(t);case"setItem":return t=e.detail.payload.key,r=e.detail.payload.value,n=e.detail.payload.subKey||"",this.setItem(t,r,n);case"setItems":return t=e.detail.payload,this.setItems(t);case"key":return this.key(e.detail.payload);case"length":return this.length();case"clear":return this.clear()}},t}();t.default=a}).call(this,r(2))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";const n=r(4),o=["__proto__","prototype","constructor"];function i(e){const t=e.split("."),r=[];for(let e=0;e<t.length;e++){let n=t[e];for(;"\\"===n[n.length-1]&&void 0!==t[e+1];)n=n.slice(0,-1)+".",n+=t[++e];r.push(n)}return r.some(e=>o.includes(e))?[]:r}e.exports={get(e,t,r){if(!n(e)||"string"!=typeof t)return void 0===r?e:r;const o=i(t);if(0!==o.length){for(let t=0;t<o.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,o[t]))return r;if(null==(e=e[o[t]])){if(t!==o.length-1)return r;break}}return e}},set(e,t,r){if(!n(e)||"string"!=typeof t)return e;const o=e,a=i(t);for(let t=0;t<a.length;t++){const o=a[t];n(e[o])||(e[o]={}),t===a.length-1&&(e[o]=r),e=e[o]}return o},delete(e,t){if(!n(e)||"string"!=typeof t)return;const r=i(t);for(let t=0;t<r.length;t++){const o=r[t];if(t===r.length-1)return void delete e[o];if(e=e[o],!n(e))return}},has(e,t){if(!n(e)||"string"!=typeof t)return!1;const r=i(t);if(0===r.length)return!1;for(let t=0;t<r.length;t++){if(!n(e))return!1;if(!(r[t]in e))return!1;e=e[r[t]]}return!0}}},function(e,t,r){"use strict";e.exports=e=>{const t=typeof e;return null!==e&&("object"===t||"function"===t)}},function(e,t,r){"use strict";function n(e){try{var t=JSON.parse(e),r=Object.prototype.toString.call(t);return["[object Array]","[object Boolean]","[object Null]","[object Object]"].includes(r)||"[object Number]"===r&&a(e)}catch(e){return!1}}function o(e){var t=Object.prototype.toString.call(e);return["[object Array]","[object Boolean]","[object Null]","[object Number]","[object Object]"].includes(t)}function i(e){return Buffer.from(e,"base64").toString("binary")}function a(e){return!isNaN(parseFloat(e))&&parseFloat(e.toString()).toString()===e.toString()}Object.defineProperty(t,"__esModule",{value:!0}),t.maybeDeserialize=n,t.maybeSerialize=o,t.maybeBase64Decode=function(e,t){void 0===t&&(t={});var r,o=(r=e,"[object String]"===Object.prototype.toString.call(r)&&function(e){return new RegExp("^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?$","gi").test(e)}(e)?i(e):e);return o&&n(o)&&t.decodeJSON?JSON.parse(o):o},t.base64Encode=function(e){var t=o(e)?JSON.stringify(e):e;return Buffer.from(t).toString("base64")},t.base64Decode=i,t.validateAction=function(e){if(!["clear","getItem","getItems","key","length","removeItem","removeItems","setItem","setItems"].includes(e))throw"Invalid action argument provided"},t.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},t.isObject=function(e){return"[object Object]"===Object.prototype.toString.call(e)},t.isSerializableNumber=a}]));
//# sourceMappingURL=porridge.js.map