!function(e,t){for(var r in t)e[r]=t[r]}(window,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WebPorridgeDB=void 0;var n=r(1);t.WebPorridgeDB=n.default},function(e,t,r){"use strict";(function(e){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}a((n=n.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0});var s=r(3),u=r(4),a=r(6),c=function(){function t(e){void 0===e&&(e={}),this.title="WebPorridge",this.options={dataBaseName:this.title,decodeBase64:!1,decodeJSON:!0,storeName:"(default)"},this.options=n(n({},this.options),e),this.store=new s.Store(this.options.dataBaseName,this.options.storeName)}return t.prototype.getItem=function(e,t,r){var c;return void 0===t&&(t=""),void 0===r&&(r={}),o(this,void 0,void 0,(function(){var o,l;return i(this,(function(i){switch(i.label){case 0:return r=n(n({},this.options),r),[4,s.get(e,this.store)];case 1:return o=null!==(c=i.sent())&&void 0!==c?c:null,t?[4,this.getItem(e,null,r)]:[3,3];case 2:return l=i.sent()||{},[2,u.get(l,t)];case 3:return[2,o&&a.maybeDeserialize(o)&&!0===r.decodeJSON?JSON.parse(o):r.decodeBase64?a.maybeBase64Decode(o,r):o]}}))}))},t.prototype.getItems=function(e,t){return void 0===t&&(t={}),o(this,void 0,void 0,(function(){var r,n,s=this;return i(this,(function(u){switch(u.label){case 0:return a.isArray(e)?(n=(r=Promise).all,[4,e.map((function(e){return o(s,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return"string"!=typeof e?[3,2]:[4,this.getItem(e,null,t)];case 1:return[2,r.sent()];case 2:return a.isObject(e)?[4,this.getItem(e.key,e.subKey,t)]:[3,4];case 3:return[2,r.sent()];case 4:return a.isArray(e)?[4,this.getItem(e[0],e[1],t)]:[3,6];case 5:return[2,r.sent()];case 6:return[2]}}))}))}))]):[3,3];case 1:return[4,n.apply(r,[u.sent()])];case 2:return[2,u.sent()];case 3:return[2]}}))}))},t.prototype.removeItem=function(e,t){return void 0===t&&(t=""),o(this,void 0,void 0,(function(){var r;return i(this,(function(n){switch(n.label){case 0:return t?[4,this.getItem(e)]:[3,3];case 1:return r=n.sent()||{},u.delete(r,t),[4,this.setItem(e,r)];case 2:return[2,n.sent()];case 3:return[4,s.del(e,this.store)];case 4:return[2,n.sent()]}}))}))},t.prototype.removeItems=function(e){return o(this,void 0,void 0,(function(){var t,r,n=this;return i(this,(function(s){switch(s.label){case 0:return a.isArray(e)?(r=(t=Promise).all,[4,e.map((function(e){return o(n,void 0,void 0,(function(){return i(this,(function(t){return"string"==typeof e?[2,this.removeItem(e)]:a.isObject(e)?[2,this.removeItem(e.key,e.subKey)]:a.isArray(e)?[2,this.removeItem(e[0],e[1])]:[2]}))}))}))]):[3,3];case 1:return[4,r.apply(t,[s.sent()])];case 2:return[2,s.sent()];case 3:return[2]}}))}))},t.prototype.setItem=function(e,t,r){return void 0===r&&(r=""),o(this,void 0,void 0,(function(){var n,o;return i(this,(function(i){switch(i.label){case 0:return r?[4,this.getItem(e)]:[3,3];case 1:return n=i.sent()||{},u.set(n,r,t),[4,this.setItem(e,n)];case 2:return[2,i.sent()];case 3:return o=a.maybeSerialize(t)?JSON.stringify(t):t,[4,s.set(e,o,this.store)];case 4:return[2,i.sent()]}}))}))},t.prototype.setItems=function(e){return o(this,void 0,void 0,(function(){var t,r,n=this;return i(this,(function(s){switch(s.label){case 0:return a.isArray(e)?(r=(t=Promise).all,[4,e.map((function(e){return o(n,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return a.isObject(e)?[4,this.setItem(e.key,e.value,e.subKey)]:[3,2];case 1:return[2,t.sent()];case 2:return a.isArray(e)?[4,this.setItem(e[0],e[1],e[2])]:[3,4];case 3:return[2,t.sent()];case 4:return[2]}}))}))}))]):[3,3];case 1:return[4,r.apply(t,[s.sent()])];case 2:return[2,s.sent()];case 3:return[2]}}))}))},t.prototype.key=function(e){return o(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,s.keys(this.store)];case 1:return[2,t.sent()[e]]}}))}))},Object.defineProperty(t.prototype,"length",{get:function(){return o(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,s.keys(this.store)];case 1:return[2,e.sent().length]}}))}))},enumerable:!1,configurable:!0}),t.prototype.clear=function(){return o(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,s.clear(this.store)];case 1:return[2,e.sent()]}}))}))},t.prototype.listen=function(e){var t=this;void 0===e&&(e=window),e.addEventListener(this.title,(function(e){return t.eventHandler(e)}))},t.prototype.mute=function(e){var t=this;void 0===e&&(e=window),e.removeEventListener(this.title,(function(e){return t.eventHandler(e)}))},t.prototype.dispatch=function(t,r){a.validateAction(t);var n=new CustomEvent(this.title,{detail:{action:t,payload:r}});e.dispatchEvent(n)},t.prototype.eventHandler=function(e){var t,r,n,o;switch(a.validateAction(e.detail.action),e.detail.action){case"getItem":return t=e.detail.payload.key,n=e.detail.payload.subKey||"",o=e.detail.options||{},this.getItem(t,n,o);case"getItems":return t=e.detail.payload,o=e.detail.options||{},this.getItems(t,o);case"removeItem":return t=e.detail.payload.key,n=e.detail.payload.subKey||"",this.removeItem(t,n);case"removeItems":return t=e.detail.payload,this.removeItems(t);case"setItem":return t=e.detail.payload.key,r=e.detail.payload.value,n=e.detail.payload.subKey||"",this.setItem(t,r,n);case"setItems":return t=e.detail.payload,this.setItems(t);case"key":return this.key(e.detail.payload);case"length":return this.length;case"clear":return this.clear()}},t}();t.default=c}).call(this,r(2))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";r.r(t),r.d(t,"Store",(function(){return n})),r.d(t,"get",(function(){return s})),r.d(t,"set",(function(){return u})),r.d(t,"del",(function(){return a})),r.d(t,"clear",(function(){return c})),r.d(t,"keys",(function(){return l}));class n{constructor(e="keyval-store",t="keyval"){this.storeName=t,this._dbp=new Promise((r,n)=>{const o=indexedDB.open(e,1);o.onerror=()=>n(o.error),o.onsuccess=()=>r(o.result),o.onupgradeneeded=()=>{o.result.createObjectStore(t)}})}_withIDBStore(e,t){return this._dbp.then(r=>new Promise((n,o)=>{const i=r.transaction(this.storeName,e);i.oncomplete=()=>n(),i.onabort=i.onerror=()=>o(i.error),t(i.objectStore(this.storeName))}))}}let o;function i(){return o||(o=new n),o}function s(e,t=i()){let r;return t._withIDBStore("readonly",t=>{r=t.get(e)}).then(()=>r.result)}function u(e,t,r=i()){return r._withIDBStore("readwrite",r=>{r.put(t,e)})}function a(e,t=i()){return t._withIDBStore("readwrite",t=>{t.delete(e)})}function c(e=i()){return e._withIDBStore("readwrite",e=>{e.clear()})}function l(e=i()){const t=[];return e._withIDBStore("readonly",e=>{(e.openKeyCursor||e.openCursor).call(e).onsuccess=function(){this.result&&(t.push(this.result.key),this.result.continue())}}).then(()=>t)}},function(e,t,r){"use strict";const n=r(5),o=["__proto__","prototype","constructor"];function i(e){const t=e.split("."),r=[];for(let e=0;e<t.length;e++){let n=t[e];for(;"\\"===n[n.length-1]&&void 0!==t[e+1];)n=n.slice(0,-1)+".",n+=t[++e];r.push(n)}return r.some(e=>o.includes(e))?[]:r}e.exports={get(e,t,r){if(!n(e)||"string"!=typeof t)return void 0===r?e:r;const o=i(t);if(0!==o.length){for(let t=0;t<o.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,o[t]))return r;if(null==(e=e[o[t]])){if(t!==o.length-1)return r;break}}return e}},set(e,t,r){if(!n(e)||"string"!=typeof t)return e;const o=e,s=i(t);for(let t=0;t<s.length;t++){const o=s[t];n(e[o])||(e[o]={}),t===s.length-1&&(e[o]=r),e=e[o]}return o},delete(e,t){if(!n(e)||"string"!=typeof t)return;const r=i(t);for(let t=0;t<r.length;t++){const o=r[t];if(t===r.length-1)return void delete e[o];if(e=e[o],!n(e))return}},has(e,t){if(!n(e)||"string"!=typeof t)return!1;const r=i(t);if(0===r.length)return!1;for(let t=0;t<r.length;t++){if(!n(e))return!1;if(!(r[t]in e))return!1;e=e[r[t]]}return!0}}},function(e,t,r){"use strict";e.exports=e=>{const t=typeof e;return null!==e&&("object"===t||"function"===t)}},function(e,t,r){"use strict";function n(e){try{var t=JSON.parse(e),r=Object.prototype.toString.call(t);return["[object Array]","[object Boolean]","[object Null]","[object Object]"].includes(r)||"[object Number]"===r&&s(e)}catch(e){return!1}}function o(e){var t=Object.prototype.toString.call(e);return["[object Array]","[object Boolean]","[object Null]","[object Number]","[object Object]"].includes(t)}function i(e){return Buffer.from(e,"base64").toString("binary")}function s(e){return!isNaN(parseFloat(e))&&parseFloat(e.toString()).toString()===e.toString()}Object.defineProperty(t,"__esModule",{value:!0}),t.validateAction=t.maybeSerialize=t.maybeDeserialize=t.maybeBase64Decode=t.isSerializableNumber=t.isObject=t.isArray=t.base64Encode=t.base64Decode=void 0,t.maybeDeserialize=n,t.maybeSerialize=o,t.maybeBase64Decode=function(e,t){void 0===t&&(t={});var r,o=(r=e,"[object String]"===Object.prototype.toString.call(r)&&function(e){return new RegExp("^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?$","gi").test(e)}(e)?i(e):e);return o&&n(o)&&t.decodeJSON?JSON.parse(o):o},t.base64Encode=function(e){var t=o(e)?JSON.stringify(e):e;return Buffer.from(t).toString("base64")},t.base64Decode=i,t.validateAction=function(e){if(!["clear","getItem","getItems","key","length","removeItem","removeItems","setItem","setItems"].includes(e))throw"Invalid action argument provided"},t.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},t.isObject=function(e){return"[object Object]"===Object.prototype.toString.call(e)},t.isSerializableNumber=s}]));
//# sourceMappingURL=porridge-db.js.map