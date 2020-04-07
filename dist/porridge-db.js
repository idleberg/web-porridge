!function(t,e){for(var r in e)t[r]=e[r]}(window,function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1);e.WebPorridgeDB=n.default},function(t,e,r){"use strict";(function(t){var n=this&&this.__assign||function(){return(n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},o=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(o,i){function s(t){try{a(n.next(t))}catch(t){i(t)}}function u(t){try{a(n.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,u)}a((n=n.apply(t,e||[])).next())}))},i=this&&this.__generator||function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(e,"__esModule",{value:!0});var s=r(3),u=r(4),a=r(6),c=function(){function e(t){void 0===t&&(t={}),this.title="WebPorridge",this.options={dataBaseName:this.title,decodeBase64:!1,decodeJSON:!0,storeName:"(default)"},this.options=n(n({},this.options),t),this.store=new s.Store(this.options.dataBaseName,this.options.storeName)}return e.prototype.getItem=function(t,e,r){var c;return void 0===e&&(e=""),void 0===r&&(r={}),o(this,void 0,void 0,(function(){var o,l;return i(this,(function(i){switch(i.label){case 0:return r=n(n({},this.options),r),[4,s.get(t,this.store)];case 1:return o=null!==(c=i.sent())&&void 0!==c?c:null,e?[4,this.getItem(t,null,r)]:[3,3];case 2:return l=i.sent()||{},[2,u.get(l,e)];case 3:return[2,o&&a.maybeDeserialize(o)&&!0===r.decodeJSON?JSON.parse(o):r.decodeBase64?a.maybeBase64Decode(o,r):o]}}))}))},e.prototype.getItems=function(t,e){return void 0===e&&(e={}),o(this,void 0,void 0,(function(){var r,n,s=this;return i(this,(function(u){switch(u.label){case 0:return a.isArray(t)?(n=(r=Promise).all,[4,t.map((function(t){return o(s,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return"string"!=typeof t?[3,2]:[4,this.getItem(t,null,e)];case 1:return[2,r.sent()];case 2:return a.isObject(t)?[4,this.getItem(t.key,t.subKey,e)]:[3,4];case 3:return[2,r.sent()];case 4:return a.isArray(t)?[4,this.getItem(t[0],t[1],e)]:[3,6];case 5:return[2,r.sent()];case 6:return[2]}}))}))}))]):[3,3];case 1:return[4,n.apply(r,[u.sent()])];case 2:return[2,u.sent()];case 3:return[2]}}))}))},e.prototype.removeItem=function(t,e){return void 0===e&&(e=""),o(this,void 0,void 0,(function(){var r;return i(this,(function(n){switch(n.label){case 0:return e?[4,this.getItem(t)]:[3,3];case 1:return r=n.sent()||{},u.delete(r,e),[4,this.setItem(t,r)];case 2:return[2,n.sent()];case 3:return[4,s.del(t,this.store)];case 4:return[2,n.sent()]}}))}))},e.prototype.removeItems=function(t){return o(this,void 0,void 0,(function(){var e,r,n=this;return i(this,(function(s){switch(s.label){case 0:return a.isArray(t)?(r=(e=Promise).all,[4,t.map((function(t){return o(n,void 0,void 0,(function(){return i(this,(function(e){return"string"==typeof t?[2,this.removeItem(t)]:a.isObject(t)?[2,this.removeItem(t.key,t.subKey)]:a.isArray(t)?[2,this.removeItem(t[0],t[1])]:[2]}))}))}))]):[3,3];case 1:return[4,r.apply(e,[s.sent()])];case 2:return[2,s.sent()];case 3:return[2]}}))}))},e.prototype.setItem=function(t,e,r){return void 0===r&&(r=""),o(this,void 0,void 0,(function(){var n,o;return i(this,(function(i){switch(i.label){case 0:return r?[4,this.getItem(t)]:[3,3];case 1:return n=i.sent()||{},u.set(n,r,e),[4,this.setItem(t,n)];case 2:return[2,i.sent()];case 3:return o=a.maybeSerialize(e)?JSON.stringify(e):e,[4,s.set(t,o,this.store)];case 4:return[2,i.sent()]}}))}))},e.prototype.setItems=function(t){return o(this,void 0,void 0,(function(){var e,r,n=this;return i(this,(function(s){switch(s.label){case 0:return a.isArray(t)?(r=(e=Promise).all,[4,t.map((function(t){return o(n,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return a.isObject(t)?[4,this.setItem(t.key,t.value,t.subKey)]:[3,2];case 1:return[2,e.sent()];case 2:return a.isArray(t)?[4,this.setItem(t[0],t[1],t[2])]:[3,4];case 3:return[2,e.sent()];case 4:return[2]}}))}))}))]):[3,3];case 1:return[4,r.apply(e,[s.sent()])];case 2:return[2,s.sent()];case 3:return[2]}}))}))},e.prototype.key=function(t){return o(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,s.keys(this.store)];case 1:return[2,e.sent()[t]]}}))}))},Object.defineProperty(e.prototype,"length",{get:function(){return o(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,s.keys(this.store)];case 1:return[2,t.sent().length]}}))}))},enumerable:!0,configurable:!0}),e.prototype.clear=function(){return o(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,s.clear(this.store)];case 1:return[2,t.sent()]}}))}))},e.prototype.listen=function(t){var e=this;void 0===t&&(t=window),t.addEventListener(this.title,(function(t){return e.eventHandler(t)}))},e.prototype.mute=function(t){var e=this;void 0===t&&(t=window),t.removeEventListener(this.title,(function(t){return e.eventHandler(t)}))},e.prototype.dispatch=function(e,r){a.validateAction(e);var n=new CustomEvent(this.title,{detail:{action:e,payload:r}});t.dispatchEvent(n)},e.prototype.eventHandler=function(t){var e,r,n,o;switch(a.validateAction(t.detail.action),t.detail.action){case"getItem":return e=t.detail.payload.key,n=t.detail.payload.subKey||"",o=t.detail.options||{},this.getItem(e,n,o);case"getItems":return e=t.detail.payload,o=t.detail.options||{},this.getItems(e,o);case"removeItem":return e=t.detail.payload.key,n=t.detail.payload.subKey||"",this.removeItem(e,n);case"removeItems":return e=t.detail.payload,this.removeItems(e);case"setItem":return e=t.detail.payload.key,r=t.detail.payload.value,n=t.detail.payload.subKey||"",this.setItem(e,r,n);case"setItems":return e=t.detail.payload,this.setItems(e);case"key":return this.key(t.detail.payload);case"length":return this.length;case"clear":return this.clear()}},e}();e.default=c}).call(this,r(2))},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";r.r(e),r.d(e,"Store",(function(){return n})),r.d(e,"get",(function(){return s})),r.d(e,"set",(function(){return u})),r.d(e,"del",(function(){return a})),r.d(e,"clear",(function(){return c})),r.d(e,"keys",(function(){return l}));class n{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((r,n)=>{const o=indexedDB.open(t,1);o.onerror=()=>n(o.error),o.onsuccess=()=>r(o.result),o.onupgradeneeded=()=>{o.result.createObjectStore(e)}})}_withIDBStore(t,e){return this._dbp.then(r=>new Promise((n,o)=>{const i=r.transaction(this.storeName,t);i.oncomplete=()=>n(),i.onabort=i.onerror=()=>o(i.error),e(i.objectStore(this.storeName))}))}}let o;function i(){return o||(o=new n),o}function s(t,e=i()){let r;return e._withIDBStore("readonly",e=>{r=e.get(t)}).then(()=>r.result)}function u(t,e,r=i()){return r._withIDBStore("readwrite",r=>{r.put(e,t)})}function a(t,e=i()){return e._withIDBStore("readwrite",e=>{e.delete(t)})}function c(t=i()){return t._withIDBStore("readwrite",t=>{t.clear()})}function l(t=i()){const e=[];return t._withIDBStore("readonly",t=>{(t.openKeyCursor||t.openCursor).call(t).onsuccess=function(){this.result&&(e.push(this.result.key),this.result.continue())}}).then(()=>e)}},function(t,e,r){"use strict";const n=r(5),o=["__proto__","prototype","constructor"];function i(t){const e=t.split("."),r=[];for(let t=0;t<e.length;t++){let n=e[t];for(;"\\"===n[n.length-1]&&void 0!==e[t+1];)n=n.slice(0,-1)+".",n+=e[++t];r.push(n)}return r.some(t=>o.includes(t))?[]:r}t.exports={get(t,e,r){if(!n(t)||"string"!=typeof e)return void 0===r?t:r;const o=i(e);if(0!==o.length){for(let e=0;e<o.length;e++){if(!Object.prototype.propertyIsEnumerable.call(t,o[e]))return r;if(null==(t=t[o[e]])){if(e!==o.length-1)return r;break}}return t}},set(t,e,r){if(!n(t)||"string"!=typeof e)return t;const o=t,s=i(e);for(let e=0;e<s.length;e++){const o=s[e];n(t[o])||(t[o]={}),e===s.length-1&&(t[o]=r),t=t[o]}return o},delete(t,e){if(!n(t)||"string"!=typeof e)return;const r=i(e);for(let e=0;e<r.length;e++){const o=r[e];if(e===r.length-1)return void delete t[o];if(t=t[o],!n(t))return}},has(t,e){if(!n(t)||"string"!=typeof e)return!1;const r=i(e);if(0===r.length)return!1;for(let e=0;e<r.length;e++){if(!n(t))return!1;if(!(r[e]in t))return!1;t=t[r[e]]}return!0}}},function(t,e,r){"use strict";t.exports=t=>{const e=typeof t;return null!==t&&("object"===e||"function"===e)}},function(t,e,r){"use strict";function n(t){try{var e=JSON.parse(t),r=Object.prototype.toString.call(e);return["[object Array]","[object Boolean]","[object Null]","[object Object]"].includes(r)||"[object Number]"===r&&s(t)}catch(t){return!1}}function o(t){var e=Object.prototype.toString.call(t);return["[object Array]","[object Boolean]","[object Null]","[object Number]","[object Object]"].includes(e)}function i(t){return Buffer.from(t,"base64").toString("binary")}function s(t){return!isNaN(parseFloat(t))&&parseFloat(t.toString()).toString()===t.toString()}Object.defineProperty(e,"__esModule",{value:!0}),e.maybeDeserialize=n,e.maybeSerialize=o,e.maybeBase64Decode=function(t,e){void 0===e&&(e={});var r,o=(r=t,"[object String]"===Object.prototype.toString.call(r)&&function(t){return new RegExp("^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+/]{3}=)?$","gi").test(t)}(t)?i(t):t);return o&&n(o)&&e.decodeJSON?JSON.parse(o):o},e.base64Encode=function(t){var e=o(t)?JSON.stringify(t):t;return Buffer.from(e).toString("base64")},e.base64Decode=i,e.validateAction=function(t){if(!["clear","getItem","getItems","key","length","removeItem","removeItems","setItem","setItems"].includes(t))throw"Invalid action argument provided"},e.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},e.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.isSerializableNumber=s}]));
//# sourceMappingURL=porridge-db.js.map