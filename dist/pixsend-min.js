!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).Pixsend=t()}}(function(){return function t(e,r,o){function n(s,l){if(!r[s]){if(!e[s]){var a="function"==typeof require&&require;if(!l&&a)return a(s,!0);if(i)return i(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var f=r[s]={exports:{}};e[s][0].call(f.exports,function(t){var r=e[s][1][t];return n(r||t)},f,f.exports,t,e,r,o)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)n(o[s]);return n}({1:[function(t,e,r){(function(r){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(){function t(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,r,o){return r&&t(e.prototype,r),o&&t(e,o),e}}(),s=t("validator/lib/isURL"),l=t("url-parse"),a=t("object-assign"),u={protocols:["http","https"],require_protocol:!0},f=function(){function t(e,n,i){if(o(this,t),!e.src||!s(e.src,u))throw new Error("please provide a valid src url with http/https protocol");this.parsedSrc=l(e.src,!0),this._isDebug=e.debug,this._data=n||{},this._window=i||r}return i(t,[{key:"_buildSrc",value:function(){return this.parsedSrc.set("query",a(this.parsedSrc.query,this._data)),this.parsedSrc.toString()}},{key:"_createPixel",value:function(t){var e=this._window.document.createElement("img");e.style.height="0px",e.style.width="0px",e.src=t,this._log("createPixel -> pixel created")}},{key:"add",value:function(t){if("object"!==(void 0===t?"undefined":n(t)))throw new Error("add method support only object");return this._data=a(this._data,t),this._log("add -> data updated: ",this._data),this}},{key:"send",value:function(){var t=this._buildSrc();this._log("sending pixel -> src: ",t),this._createPixel(t)}},{key:"_log",value:function(){if(this._isDebug){for(var t=0;t<arguments.length;t++)"object"===n(arguments[t])&&(arguments[t]=JSON.stringify(arguments[t],null,"\t"));console.log.apply(console,arguments)}}}]),t}();e.exports=f}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"object-assign":2,"url-parse":5,"validator/lib/isURL":8}],2:[function(t,e,r){"use strict";function o(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var n=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(t){o[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,l,a=o(t),u=1;u<arguments.length;u++){r=Object(arguments[u]);for(var f in r)i.call(r,f)&&(a[f]=r[f]);if(n){l=n(r);for(var c=0;c<l.length;c++)s.call(r,l[c])&&(a[l[c]]=r[l[c]])}}return a}},{}],3:[function(t,e,r){"use strict";function o(t){return decodeURIComponent(t.replace(/\+/g," "))}var n=Object.prototype.hasOwnProperty;r.stringify=function(t,e){var r=[];"string"!=typeof(e=e||"")&&(e="?");for(var o in t)n.call(t,o)&&r.push(encodeURIComponent(o)+"="+encodeURIComponent(t[o]));return r.length?e+r.join("&"):""},r.parse=function(t){for(var e,r=/([^=?&]+)=?([^&]*)/g,n={};e=r.exec(t);n[o(e[1])]=o(e[2]));return n}},{}],4:[function(t,e,r){"use strict";e.exports=function(t,e){if(e=e.split(":")[0],!(t=+t))return!1;switch(e){case"http":case"ws":return 80!==t;case"https":case"wss":return 443!==t;case"ftp":return 21!==t;case"gopher":return 70!==t;case"file":return!1}return 0!==t}},{}],5:[function(t,e,r){(function(r){"use strict";function o(t){var e,o={},n=typeof(t=t||r.location||{});if("blob:"===t.protocol)o=new s(unescape(t.pathname),{});else if("string"===n){o=new s(t,{});for(e in p)delete o[e]}else if("object"===n){for(e in t)e in p||(o[e]=t[e]);void 0===o.slashes&&(o.slashes=f.test(t.href))}return o}function n(t){var e=u.exec(t);return{protocol:e[1]?e[1].toLowerCase():"",slashes:!!e[2],rest:e[3]}}function i(t,e){for(var r=(e||"/").split("/").slice(0,-1).concat(t.split("/")),o=r.length,n=r[o-1],i=!1,s=0;o--;)"."===r[o]?r.splice(o,1):".."===r[o]?(r.splice(o,1),s++):s&&(0===o&&(i=!0),r.splice(o,1),s--);return i&&r.unshift(""),"."!==n&&".."!==n||r.push(""),r.join("/")}function s(t,e,r){if(!(this instanceof s))return new s(t,e,r);var u,f,p,h,d,g,y=c.slice(),v=typeof e,b=this,_=0;for("object"!==v&&"string"!==v&&(r=e,e=null),r&&"function"!=typeof r&&(r=a.parse),e=o(e),u=!(f=n(t||"")).protocol&&!f.slashes,b.slashes=f.slashes||u&&e.slashes,b.protocol=f.protocol||e.protocol||"",t=f.rest,f.slashes||(y[2]=[/(.*)/,"pathname"]);_<y.length;_++)p=(h=y[_])[0],g=h[1],p!==p?b[g]=t:"string"==typeof p?~(d=t.indexOf(p))&&("number"==typeof h[2]?(b[g]=t.slice(0,d),t=t.slice(d+h[2])):(b[g]=t.slice(d),t=t.slice(0,d))):(d=p.exec(t))&&(b[g]=d[1],t=t.slice(0,d.index)),b[g]=b[g]||(u&&h[3]?e[g]||"":""),h[4]&&(b[g]=b[g].toLowerCase());r&&(b.query=r(b.query)),u&&e.slashes&&"/"!==b.pathname.charAt(0)&&(""!==b.pathname||""!==e.pathname)&&(b.pathname=i(b.pathname,e.pathname)),l(b.port,b.protocol)||(b.host=b.hostname,b.port=""),b.username=b.password="",b.auth&&(h=b.auth.split(":"),b.username=h[0]||"",b.password=h[1]||""),b.origin=b.protocol&&b.host&&"file:"!==b.protocol?b.protocol+"//"+b.host:"null",b.href=b.toString()}var l=t("requires-port"),a=t("querystringify"),u=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,f=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,c=[["#","hash"],["?","query"],["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d+)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],p={hash:1,query:1};s.prototype={set:function(t,e,r){var o=this;switch(t){case"query":"string"==typeof e&&e.length&&(e=(r||a.parse)(e)),o[t]=e;break;case"port":o[t]=e,l(e,o.protocol)?e&&(o.host=o.hostname+":"+e):(o.host=o.hostname,o[t]="");break;case"hostname":o[t]=e,o.port&&(e+=":"+o.port),o.host=e;break;case"host":o[t]=e,/:\d+$/.test(e)?(e=e.split(":"),o.port=e.pop(),o.hostname=e.join(":")):(o.hostname=e,o.port="");break;case"protocol":o.protocol=e.toLowerCase(),o.slashes=!r;break;case"pathname":o.pathname=e.length&&"/"!==e.charAt(0)?"/"+e:e;break;default:o[t]=e}for(var n=0;n<c.length;n++){var i=c[n];i[4]&&(o[i[1]]=o[i[1]].toLowerCase())}return o.origin=o.protocol&&o.host&&"file:"!==o.protocol?o.protocol+"//"+o.host:"null",o.href=o.toString(),o},toString:function(t){t&&"function"==typeof t||(t=a.stringify);var e,r=this,o=r.protocol;o&&":"!==o.charAt(o.length-1)&&(o+=":");var n=o+(r.slashes?"//":"");return r.username&&(n+=r.username,r.password&&(n+=":"+r.password),n+="@"),n+=r.host+r.pathname,(e="object"==typeof r.query?t(r.query):r.query)&&(n+="?"!==e.charAt(0)?"?"+e:e),r.hash&&(n+=r.hash),n}},s.extractProtocol=n,s.location=o,s.qs=a,e.exports=s}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{querystringify:3,"requires-port":4}],6:[function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(t,e){(0,n.default)(t),(e=(0,i.default)(e,s)).allow_trailing_dot&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1));var r=t.split(".");if(e.require_tld){var o=r.pop();if(!r.length||!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(o))return!1;if(/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(o))return!1}for(var l,a=0;a<r.length;a++){if(l=r[a],e.allow_underscores&&(l=l.replace(/_/g,"")),!/^[a-z\u00a1-\uffff0-9-]+$/i.test(l))return!1;if(/[\uff01-\uff5e]/.test(l))return!1;if("-"===l[0]||"-"===l[l.length-1])return!1}return!0};var n=o(t("./util/assertString")),i=o(t("./util/merge")),s={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1};e.exports=r.default},{"./util/assertString":9,"./util/merge":10}],7:[function(t,e,r){"use strict";function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if((0,n.default)(t),!(e=String(e)))return o(t,4)||o(t,6);if("4"===e)return!!i.test(t)&&t.split(".").sort(function(t,e){return t-e})[3]<=255;if("6"===e){var r=t.split(":"),l=!1,a=o(r[r.length-1],4),u=a?7:8;if(r.length>u)return!1;if("::"===t)return!0;"::"===t.substr(0,2)?(r.shift(),r.shift(),l=!0):"::"===t.substr(t.length-2)&&(r.pop(),r.pop(),l=!0);for(var f=0;f<r.length;++f)if(""===r[f]&&f>0&&f<r.length-1){if(l)return!1;l=!0}else if(a&&f===r.length-1);else if(!s.test(r[f]))return!1;return l?r.length>=1:r.length===u}return!1}Object.defineProperty(r,"__esModule",{value:!0}),r.default=o;var n=function(t){return t&&t.__esModule?t:{default:t}}(t("./util/assertString")),i=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,s=/^[0-9A-F]{1,4}$/i;e.exports=r.default},{"./util/assertString":9}],8:[function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function n(t){return"[object RegExp]"===Object.prototype.toString.call(t)}function i(t,e){for(var r=0;r<e.length;r++){var o=e[r];if(t===o||n(o)&&o.test(t))return!0}return!1}Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(t,e){if((0,s.default)(t),!t||t.length>=2083||/[\s<>]/.test(t))return!1;if(0===t.indexOf("mailto:"))return!1;e=(0,u.default)(e,f);var r=void 0,o=void 0,n=void 0,p=void 0,h=void 0,d=void 0,g=void 0,y=void 0;if(g=t.split("#"),t=g.shift(),g=t.split("?"),t=g.shift(),(g=t.split("://")).length>1){if(r=g.shift(),e.require_valid_protocol&&-1===e.protocols.indexOf(r))return!1}else{if(e.require_protocol)return!1;e.allow_protocol_relative_urls&&"//"===t.substr(0,2)&&(g[0]=t.substr(2))}if(""===(t=g.join("://")))return!1;if(g=t.split("/"),""===(t=g.shift())&&!e.require_host)return!0;if((g=t.split("@")).length>1&&(o=g.shift()).indexOf(":")>=0&&o.split(":").length>2)return!1;d=null,y=null;var v=(p=g.join("@")).match(c);return v?(n="",y=v[1],d=v[2]||null):(n=(g=p.split(":")).shift(),g.length&&(d=g.join(":"))),!(null!==d&&(h=parseInt(d,10),!/^[0-9]+$/.test(d)||h<=0||h>65535)||!((0,a.default)(n)||(0,l.default)(n,e)||y&&(0,a.default)(y,6))||(n=n||y,e.host_whitelist&&!i(n,e.host_whitelist)||e.host_blacklist&&i(n,e.host_blacklist)))};var s=o(t("./util/assertString")),l=o(t("./isFQDN")),a=o(t("./isIP")),u=o(t("./util/merge")),f={protocols:["http","https","ftp"],require_tld:!0,require_protocol:!1,require_host:!0,require_valid_protocol:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_protocol_relative_urls:!1},c=/^\[([^\]]+)\](?::([0-9]+))?$/;e.exports=r.default},{"./isFQDN":6,"./isIP":7,"./util/assertString":9,"./util/merge":10}],9:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(t){if(!("string"==typeof t||t instanceof String))throw new TypeError("This library (validator.js) validates strings only")},e.exports=r.default},{}],10:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1];for(var r in e)void 0===t[r]&&(t[r]=e[r]);return t},e.exports=r.default},{}]},{},[1])(1)});