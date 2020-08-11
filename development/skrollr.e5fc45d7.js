// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js"}],"../node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_has":"../node_modules/core-js/library/modules/_has.js"}],"../node_modules/core-js/library/modules/es6.date.now.js":[function(require,module,exports) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":"../node_modules/core-js/library/modules/_export.js"}],"../node_modules/core-js/library/fn/date/now.js":[function(require,module,exports) {
require('../../modules/es6.date.now');
module.exports = require('../../modules/_core').Date.now;

},{"../../modules/es6.date.now":"../node_modules/core-js/library/modules/es6.date.now.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/date/now.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/date/now");
},{"core-js/library/fn/date/now":"../node_modules/core-js/library/fn/date/now.js"}],"../src/skrollr.js":[function(require,module,exports) {
var define;
"use strict";

var _now2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * skrollr core
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
(function (window, document, undefined) {
  'use strict';
  /*
   * Global api.
   */

  var skrollr = {
    get: function get() {
      return _instance;
    },
    //Main entry point.
    init: function init(options) {
      return _instance || new Skrollr(options);
    },
    VERSION: '0.6.30'
  }; //Minify optimization.

  var hasProp = Object.prototype.hasOwnProperty;
  var Math = window.Math;
  var getStyle = window.getComputedStyle; //They will be filled when skrollr gets initialized.

  var documentElement;
  var body;
  var EVENT_TOUCHSTART = 'touchstart';
  var EVENT_TOUCHMOVE = 'touchmove';
  var EVENT_TOUCHCANCEL = 'touchcancel';
  var EVENT_TOUCHEND = 'touchend';
  var SKROLLABLE_CLASS = 'skrollable';
  var SKROLLABLE_BEFORE_CLASS = SKROLLABLE_CLASS + '-before';
  var SKROLLABLE_BETWEEN_CLASS = SKROLLABLE_CLASS + '-between';
  var SKROLLABLE_AFTER_CLASS = SKROLLABLE_CLASS + '-after';
  var SKROLLR_CLASS = 'skrollr';
  var NO_SKROLLR_CLASS = 'no-' + SKROLLR_CLASS;
  var SKROLLR_DESKTOP_CLASS = SKROLLR_CLASS + '-desktop';
  var SKROLLR_MOBILE_CLASS = SKROLLR_CLASS + '-mobile';
  var DEFAULT_EASING = 'linear';
  var DEFAULT_DURATION = 1000; //ms

  var DEFAULT_MOBILE_DECELERATION = 0.004; //pixel/ms²

  var DEFAULT_SKROLLRBODY = 'skrollr-body';
  var DEFAULT_SMOOTH_SCROLLING_DURATION = 200; //ms

  var ANCHOR_START = 'start';
  var ANCHOR_END = 'end';
  var ANCHOR_CENTER = 'center';
  var ANCHOR_BOTTOM = 'bottom'; //The property which will be added to the DOM element to hold the ID of the skrollable.

  var SKROLLABLE_ID_DOM_PROPERTY = '___skrollable_id';
  var rxTouchIgnoreTags = /^(?:input|textarea|button|select)$/i;
  var rxTrim = /^\s+|\s+$/g; //Find all data-attributes. data-[_constant]-[offset]-[anchor]-[anchor].

  var rxKeyframeAttribute = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/;
  var rxPropValue = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi; //Easing function names follow the property in square brackets.

  var rxPropEasing = /^(@?[a-z\-]+)\[(\w+)\]$/;
  var rxCamelCase = /-([a-z0-9_])/g;

  var rxCamelCaseFn = function rxCamelCaseFn(str, letter) {
    return letter.toUpperCase();
  }; //Numeric values with optional sign.


  var rxNumericValue = /[\-+]?[\d]*\.?[\d]+/g; //Used to replace occurences of {?} with a number.

  var rxInterpolateString = /\{\?\}/g; //Finds rgb(a) colors, which don't use the percentage notation.

  var rxRGBAIntegerColor = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g; //Finds all gradients.

  var rxGradient = /[a-z\-]+-gradient/g; //Vendor prefix. Will be set once skrollr gets initialized.

  var theCSSPrefix = '';
  var theDashedCSSPrefix = ''; //Will be called once (when skrollr gets initialized).

  var detectCSSPrefix = function detectCSSPrefix() {
    //Only relevant prefixes. May be extended.
    //Could be dangerous if there will ever be a CSS property which actually starts with "ms". Don't hope so.
    var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/; //Detect prefix for current browser by finding the first property using a prefix.

    if (!getStyle) {
      return;
    }

    var style = getStyle(body, null);

    for (var k in style) {
      //We check the key and if the key is a number, we check the value as well, because safari's getComputedStyle returns some weird array-like thingy.
      theCSSPrefix = k.match(rxPrefixes) || +k == k && style[k].match(rxPrefixes);

      if (theCSSPrefix) {
        break;
      }
    } //Did we even detect a prefix?


    if (!theCSSPrefix) {
      theCSSPrefix = theDashedCSSPrefix = '';
      return;
    }

    theCSSPrefix = theCSSPrefix[0]; //We could have detected either a dashed prefix or this camelCaseish-inconsistent stuff.

    if (theCSSPrefix.slice(0, 1) === '-') {
      theDashedCSSPrefix = theCSSPrefix; //There's no logic behind these. Need a look up.

      theCSSPrefix = {
        '-webkit-': 'webkit',
        '-moz-': 'Moz',
        '-ms-': 'ms',
        '-o-': 'O'
      }[theCSSPrefix];
    } else {
      theDashedCSSPrefix = '-' + theCSSPrefix.toLowerCase() + '-';
    }
  };

  var polyfillRAF = function polyfillRAF() {
    var requestAnimFrame = window.requestAnimationFrame || window[theCSSPrefix.toLowerCase() + 'RequestAnimationFrame'];

    var lastTime = _now();

    if (_isMobile || !requestAnimFrame) {
      requestAnimFrame = function requestAnimFrame(callback) {
        //How long did it take to render?
        var deltaTime = _now() - lastTime;
        var delay = Math.max(0, 1000 / 60 - deltaTime);
        return window.setTimeout(function () {
          lastTime = _now();
          callback();
        }, delay);
      };
    }

    return requestAnimFrame;
  };

  var polyfillCAF = function polyfillCAF() {
    var cancelAnimFrame = window.cancelAnimationFrame || window[theCSSPrefix.toLowerCase() + 'CancelAnimationFrame'];

    if (_isMobile || !cancelAnimFrame) {
      cancelAnimFrame = function cancelAnimFrame(timeout) {
        return window.clearTimeout(timeout);
      };
    }

    return cancelAnimFrame;
  }; //Built-in easing functions.


  var easings = {
    begin: function begin() {
      return 0;
    },
    end: function end() {
      return 1;
    },
    linear: function linear(p) {
      return p;
    },
    quadratic: function quadratic(p) {
      return p * p;
    },
    cubic: function cubic(p) {
      return p * p * p;
    },
    swing: function swing(p) {
      return -Math.cos(p * Math.PI) / 2 + 0.5;
    },
    sqrt: function sqrt(p) {
      return Math.sqrt(p);
    },
    outCubic: function outCubic(p) {
      return Math.pow(p - 1, 3) + 1;
    },
    //see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this
    bounce: function bounce(p) {
      var a;

      if (p <= 0.5083) {
        a = 3;
      } else if (p <= 0.8489) {
        a = 9;
      } else if (p <= 0.96208) {
        a = 27;
      } else if (p <= 0.99981) {
        a = 91;
      } else {
        return 1;
      }

      return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a);
    }
  };
  /**
   * Constructor.
   */

  function Skrollr(options) {
    documentElement = document.documentElement;
    body = document.body;
    detectCSSPrefix();
    _instance = this;
    options = options || {};
    _constants = options.constants || {}; //We allow defining custom easings or overwrite existing.

    if (options.easing) {
      for (var e in options.easing) {
        easings[e] = options.easing[e];
      }
    }

    _edgeStrategy = options.edgeStrategy || 'set';
    _listeners = {
      //Function to be called right before rendering.
      beforerender: options.beforerender,
      //Function to be called right after finishing rendering.
      render: options.render,
      //Function to be called whenever an element with the `data-emit-events` attribute passes a keyframe.
      keyframe: options.keyframe
    }; //forceHeight is true by default

    _forceHeight = options.forceHeight !== false;

    if (_forceHeight) {
      _scale = options.scale || 1;
    }

    _mobileDeceleration = options.mobileDeceleration || DEFAULT_MOBILE_DECELERATION;
    _smoothScrollingEnabled = options.smoothScrolling !== false;
    _smoothScrollingDuration = options.smoothScrollingDuration || DEFAULT_SMOOTH_SCROLLING_DURATION; //Dummy object. Will be overwritten in the _render method when smooth scrolling is calculated.

    _smoothScrolling = {
      targetTop: _instance.getScrollTop()
    }; //A custom check function may be passed.

    _isMobile = (options.mobileCheck || function () {
      return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || window.opera);
    })();

    if (_isMobile) {
      _skrollrBody = document.getElementById(options.skrollrBody || DEFAULT_SKROLLRBODY); //Detect 3d transform if there's a skrollr-body (only needed for #skrollr-body).

      if (_skrollrBody) {
        _detect3DTransforms();
      }

      _initMobile();

      _updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_MOBILE_CLASS], [NO_SKROLLR_CLASS]);
    } else {
      _updateClass(documentElement, [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS], [NO_SKROLLR_CLASS]);
    } //Triggers parsing of elements and a first reflow.


    _instance.refresh();

    _addEvent(window, 'resize orientationchange', function () {
      var width = documentElement.clientWidth;
      var height = documentElement.clientHeight; //Only reflow if the size actually changed (#271).

      if (height !== _lastViewportHeight || width !== _lastViewportWidth) {
        _lastViewportHeight = height;
        _lastViewportWidth = width;
        _requestReflow = true;
      }
    });

    var requestAnimFrame = polyfillRAF(); //Let's go.

    (function animloop() {
      _render();

      _animFrame = requestAnimFrame(animloop);
    })();

    return _instance;
  }
  /**
   * (Re)parses some or all elements.
   */


  Skrollr.prototype.refresh = function (elements) {
    var elementIndex;
    var elementsLength;
    var ignoreID = false; //Completely reparse anything without argument.

    if (elements === undefined) {
      //Ignore that some elements may already have a skrollable ID.
      ignoreID = true;
      _skrollables = [];
      _skrollableIdCounter = 0;
      elements = document.getElementsByTagName('*');
    } else if (elements.length === undefined) {
      //We also accept a single element as parameter.
      elements = [elements];
    }

    elementIndex = 0;
    elementsLength = elements.length;

    for (; elementIndex < elementsLength; elementIndex++) {
      var el = elements[elementIndex];
      var anchorTarget = el;
      var keyFrames = []; //If this particular element should be smooth scrolled.

      var smoothScrollThis = _smoothScrollingEnabled; //The edge strategy for this particular element.

      var edgeStrategy = _edgeStrategy; //If this particular element should emit keyframe events.

      var emitEvents = false; //If we're reseting the counter, remove any old element ids that may be hanging around.

      if (ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
        delete el[SKROLLABLE_ID_DOM_PROPERTY];
      }

      if (!el.attributes) {
        continue;
      } //Iterate over all attributes and search for key frame attributes.


      var attributeIndex = 0;
      var attributesLength = el.attributes.length;

      for (; attributeIndex < attributesLength; attributeIndex++) {
        var attr = el.attributes[attributeIndex];

        if (attr.name === 'data-anchor-target') {
          anchorTarget = document.querySelector(attr.value);

          if (anchorTarget === null) {
            throw 'Unable to find anchor target "' + attr.value + '"';
          }

          continue;
        } //Global smooth scrolling can be overridden by the element attribute.


        if (attr.name === 'data-smooth-scrolling') {
          smoothScrollThis = attr.value !== 'off';
          continue;
        } //Global edge strategy can be overridden by the element attribute.


        if (attr.name === 'data-edge-strategy') {
          edgeStrategy = attr.value;
          continue;
        } //Is this element tagged with the `data-emit-events` attribute?


        if (attr.name === 'data-emit-events') {
          emitEvents = true;
          continue;
        }

        var match = attr.name.match(rxKeyframeAttribute);

        if (match === null) {
          continue;
        }

        var kf = {
          props: attr.value,
          //Point back to the element as well.
          element: el,
          //The name of the event which this keyframe will fire, if emitEvents is
          eventType: attr.name.replace(rxCamelCase, rxCamelCaseFn)
        };
        keyFrames.push(kf);
        var constant = match[1];

        if (constant) {
          //Strip the underscore prefix.
          kf.constant = constant.substr(1);
        } //Get the key frame offset.


        var offset = match[2]; //Is it a percentage offset?

        if (/p$/.test(offset)) {
          kf.isPercentage = true;
          kf.offset = (offset.slice(0, -1) | 0) / 100;
        } else {
          kf.offset = offset | 0;
        }

        var anchor1 = match[3]; //If second anchor is not set, the first will be taken for both.

        var anchor2 = match[4] || anchor1; //"absolute" (or "classic") mode, where numbers mean absolute scroll offset.

        if (!anchor1 || anchor1 === ANCHOR_START || anchor1 === ANCHOR_END) {
          kf.mode = 'absolute'; //data-end needs to be calculated after all key frames are known.

          if (anchor1 === ANCHOR_END) {
            kf.isEnd = true;
          } else if (!kf.isPercentage) {
            //For data-start we can already set the key frame w/o calculations.
            //#59: "scale" options should only affect absolute mode.
            kf.offset = kf.offset * _scale;
          }
        } //"relative" mode, where numbers are relative to anchors.
        else {
            kf.mode = 'relative';
            kf.anchors = [anchor1, anchor2];
          }
      } //Does this element have key frames?


      if (!keyFrames.length) {
        continue;
      } //Will hold the original style and class attributes before we controlled the element (see #80).


      var styleAttr, classAttr;
      var id;

      if (!ignoreID && SKROLLABLE_ID_DOM_PROPERTY in el) {
        //We already have this element under control. Grab the corresponding skrollable id.
        id = el[SKROLLABLE_ID_DOM_PROPERTY];
        styleAttr = _skrollables[id].styleAttr;
        classAttr = _skrollables[id].classAttr;
      } else {
        //It's an unknown element. Asign it a new skrollable id.
        id = el[SKROLLABLE_ID_DOM_PROPERTY] = _skrollableIdCounter++;
        styleAttr = el.style.cssText;
        classAttr = _getClass(el);
      }

      _skrollables[id] = {
        element: el,
        styleAttr: styleAttr,
        classAttr: classAttr,
        anchorTarget: anchorTarget,
        keyFrames: keyFrames,
        smoothScrolling: smoothScrollThis,
        edgeStrategy: edgeStrategy,
        emitEvents: emitEvents,
        lastFrameIndex: -1
      };

      _updateClass(el, [SKROLLABLE_CLASS], []);
    } //Reflow for the first time.


    _reflow(); //Now that we got all key frame numbers right, actually parse the properties.


    elementIndex = 0;
    elementsLength = elements.length;

    for (; elementIndex < elementsLength; elementIndex++) {
      var sk = _skrollables[elements[elementIndex][SKROLLABLE_ID_DOM_PROPERTY]];

      if (sk === undefined) {
        continue;
      } //Parse the property string to objects


      _parseProps(sk); //Fill key frames with missing properties from left and right


      _fillProps(sk);
    }

    return _instance;
  };
  /**
   * Transform "relative" mode to "absolute" mode.
   * That is, calculate anchor position and offset of element.
   */


  Skrollr.prototype.relativeToAbsolute = function (element, viewportAnchor, elementAnchor) {
    var viewportHeight = documentElement.clientHeight;
    var box = element.getBoundingClientRect();
    var absolute = box.top; //#100: IE doesn't supply "height" with getBoundingClientRect.

    var boxHeight = box.bottom - box.top;

    if (viewportAnchor === ANCHOR_BOTTOM) {
      absolute -= viewportHeight;
    } else if (viewportAnchor === ANCHOR_CENTER) {
      absolute -= viewportHeight / 2;
    }

    if (elementAnchor === ANCHOR_BOTTOM) {
      absolute += boxHeight;
    } else if (elementAnchor === ANCHOR_CENTER) {
      absolute += boxHeight / 2;
    } //Compensate scrolling since getBoundingClientRect is relative to viewport.


    absolute += _instance.getScrollTop();
    return absolute + 0.5 | 0;
  };
  /**
   * Animates scroll top to new position.
   */


  Skrollr.prototype.animateTo = function (top, options) {
    options = options || {};

    var now = _now();

    var scrollTop = _instance.getScrollTop();

    var duration = options.duration === undefined ? DEFAULT_DURATION : options.duration; //Setting this to a new value will automatically cause the current animation to stop, if any.

    _scrollAnimation = {
      startTop: scrollTop,
      topDiff: top - scrollTop,
      targetTop: top,
      duration: duration,
      startTime: now,
      endTime: now + duration,
      easing: easings[options.easing || DEFAULT_EASING],
      done: options.done
    }; //Don't queue the animation if there's nothing to animate.

    if (!_scrollAnimation.topDiff) {
      if (_scrollAnimation.done) {
        _scrollAnimation.done.call(_instance, false);
      }

      _scrollAnimation = undefined;
    }

    return _instance;
  };
  /**
   * Stops animateTo animation.
   */


  Skrollr.prototype.stopAnimateTo = function () {
    if (_scrollAnimation && _scrollAnimation.done) {
      _scrollAnimation.done.call(_instance, true);
    }

    _scrollAnimation = undefined;
  };
  /**
   * Returns if an animation caused by animateTo is currently running.
   */


  Skrollr.prototype.isAnimatingTo = function () {
    return !!_scrollAnimation;
  };

  Skrollr.prototype.isMobile = function () {
    return _isMobile;
  };

  Skrollr.prototype.setScrollTop = function (top, force) {
    _forceRender = force === true;

    if (_isMobile) {
      _mobileOffset = Math.min(Math.max(top, 0), _maxKeyFrame);
    } else {
      window.scrollTo(0, top);
    }

    return _instance;
  };

  Skrollr.prototype.getScrollTop = function () {
    if (_isMobile) {
      return _mobileOffset;
    } else {
      return window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0;
    }
  };

  Skrollr.prototype.getMaxScrollTop = function () {
    return _maxKeyFrame;
  };

  Skrollr.prototype.on = function (name, fn) {
    _listeners[name] = fn;
    return _instance;
  };

  Skrollr.prototype.off = function (name) {
    delete _listeners[name];
    return _instance;
  };

  Skrollr.prototype.destroy = function () {
    var cancelAnimFrame = polyfillCAF();
    cancelAnimFrame(_animFrame);

    _removeAllEvents();

    _updateClass(documentElement, [NO_SKROLLR_CLASS], [SKROLLR_CLASS, SKROLLR_DESKTOP_CLASS, SKROLLR_MOBILE_CLASS]);

    var skrollableIndex = 0;
    var skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      _reset(_skrollables[skrollableIndex].element);
    }

    documentElement.style.overflow = body.style.overflow = '';
    documentElement.style.height = body.style.height = '';

    if (_skrollrBody) {
      skrollr.setStyle(_skrollrBody, 'transform', 'none');
    }

    _instance = undefined;
    _skrollrBody = undefined;
    _listeners = undefined;
    _forceHeight = undefined;
    _maxKeyFrame = 0;
    _scale = 1;
    _constants = undefined;
    _mobileDeceleration = undefined;
    _direction = 'down';
    _lastTop = -1;
    _lastViewportWidth = 0;
    _lastViewportHeight = 0;
    _requestReflow = false;
    _scrollAnimation = undefined;
    _smoothScrollingEnabled = undefined;
    _smoothScrollingDuration = undefined;
    _smoothScrolling = undefined;
    _forceRender = undefined;
    _skrollableIdCounter = 0;
    _edgeStrategy = undefined;
    _isMobile = false;
    _mobileOffset = 0;
    _translateZ = undefined;
  };
  /*
  	Private methods.
  */


  var _initMobile = function _initMobile() {
    var initialElement;
    var initialTouchY;
    var initialTouchX;
    var currentElement;
    var currentTouchY;
    var currentTouchX;
    var lastTouchY;
    var deltaY;
    var initialTouchTime;
    var currentTouchTime;
    var lastTouchTime;
    var deltaTime;

    _addEvent(documentElement, [EVENT_TOUCHSTART, EVENT_TOUCHMOVE, EVENT_TOUCHCANCEL, EVENT_TOUCHEND].join(' '), function (e) {
      var touch = e.changedTouches[0];
      currentElement = e.target; //We don't want text nodes.

      while (currentElement.nodeType === 3) {
        currentElement = currentElement.parentNode;
      }

      currentTouchY = touch.clientY;
      currentTouchX = touch.clientX;
      currentTouchTime = e.timeStamp;

      if (!rxTouchIgnoreTags.test(currentElement.tagName)) {
        e.preventDefault();
      }

      switch (e.type) {
        case EVENT_TOUCHSTART:
          //The last element we tapped on.
          if (initialElement) {
            initialElement.blur();
          }

          _instance.stopAnimateTo();

          initialElement = currentElement;
          initialTouchY = lastTouchY = currentTouchY;
          initialTouchX = currentTouchX;
          initialTouchTime = currentTouchTime;
          break;

        case EVENT_TOUCHMOVE:
          //Prevent default event on touchIgnore elements in case they don't have focus yet.
          if (rxTouchIgnoreTags.test(currentElement.tagName) && document.activeElement !== currentElement) {
            e.preventDefault();
          }

          deltaY = currentTouchY - lastTouchY;
          deltaTime = currentTouchTime - lastTouchTime;

          _instance.setScrollTop(_mobileOffset - deltaY, true);

          lastTouchY = currentTouchY;
          lastTouchTime = currentTouchTime;
          break;

        default:
        case EVENT_TOUCHCANCEL:
        case EVENT_TOUCHEND:
          var distanceY = initialTouchY - currentTouchY;
          var distanceX = initialTouchX - currentTouchX;
          var distance2 = distanceX * distanceX + distanceY * distanceY; //Check if it was more like a tap (moved less than 7px).

          if (distance2 < 49) {
            if (!rxTouchIgnoreTags.test(initialElement.tagName)) {
              initialElement.focus(); //It was a tap, click the element.

              var clickEvent = document.createEvent('MouseEvents');
              clickEvent.initMouseEvent('click', true, true, e.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
              initialElement.dispatchEvent(clickEvent);
            }

            return;
          }

          initialElement = undefined;
          var speed = deltaY / deltaTime; //Cap speed at 3 pixel/ms.

          speed = Math.max(Math.min(speed, 3), -3);
          var duration = Math.abs(speed / _mobileDeceleration);
          var targetOffset = speed * duration + 0.5 * _mobileDeceleration * duration * duration;
          var targetTop = _instance.getScrollTop() - targetOffset; //Relative duration change for when scrolling above bounds.

          var targetRatio = 0; //Change duration proportionally when scrolling would leave bounds.

          if (targetTop > _maxKeyFrame) {
            targetRatio = (_maxKeyFrame - targetTop) / targetOffset;
            targetTop = _maxKeyFrame;
          } else if (targetTop < 0) {
            targetRatio = -targetTop / targetOffset;
            targetTop = 0;
          }

          duration = duration * (1 - targetRatio);

          _instance.animateTo(targetTop + 0.5 | 0, {
            easing: 'outCubic',
            duration: duration
          });

          break;
      }
    }); //Just in case there has already been some native scrolling, reset it.


    window.scrollTo(0, 0);
    documentElement.style.overflow = body.style.overflow = 'hidden';
  };
  /**
   * Updates key frames which depend on others / need to be updated on resize.
   * That is "end" in "absolute" mode and all key frames in "relative" mode.
   * Also handles constants, because they may change on resize.
   */


  var _updateDependentKeyFrames = function _updateDependentKeyFrames() {
    var viewportHeight = documentElement.clientHeight;

    var processedConstants = _processConstants();

    var skrollable;
    var element;
    var anchorTarget;
    var keyFrames;
    var keyFrameIndex;
    var keyFramesLength;
    var kf;
    var skrollableIndex;
    var skrollablesLength;
    var offset;
    var constantValue; //First process all relative-mode elements and find the max key frame.

    skrollableIndex = 0;
    skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      skrollable = _skrollables[skrollableIndex];
      element = skrollable.element;
      anchorTarget = skrollable.anchorTarget;
      keyFrames = skrollable.keyFrames;
      keyFrameIndex = 0;
      keyFramesLength = keyFrames.length;

      for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
        kf = keyFrames[keyFrameIndex];
        offset = kf.offset;
        constantValue = processedConstants[kf.constant] || 0;
        kf.frame = offset;

        if (kf.isPercentage) {
          //Convert the offset to percentage of the viewport height.
          offset = offset * viewportHeight; //Absolute + percentage mode.

          kf.frame = offset;
        }

        if (kf.mode === 'relative') {
          _reset(element);

          kf.frame = _instance.relativeToAbsolute(anchorTarget, kf.anchors[0], kf.anchors[1]) - offset;

          _reset(element, true);
        }

        kf.frame += constantValue; //Only search for max key frame when forceHeight is enabled.

        if (_forceHeight) {
          //Find the max key frame, but don't use one of the data-end ones for comparison.
          if (!kf.isEnd && kf.frame > _maxKeyFrame) {
            _maxKeyFrame = kf.frame;
          }
        }
      }
    } //#133: The document can be larger than the maxKeyFrame we found.


    _maxKeyFrame = Math.max(_maxKeyFrame, _getDocumentHeight()); //Now process all data-end keyframes.

    skrollableIndex = 0;
    skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      skrollable = _skrollables[skrollableIndex];
      keyFrames = skrollable.keyFrames;
      keyFrameIndex = 0;
      keyFramesLength = keyFrames.length;

      for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
        kf = keyFrames[keyFrameIndex];
        constantValue = processedConstants[kf.constant] || 0;

        if (kf.isEnd) {
          kf.frame = _maxKeyFrame - kf.offset + constantValue;
        }
      }

      skrollable.keyFrames.sort(_keyFrameComparator);
    }
  };
  /**
   * Calculates and sets the style properties for the element at the given frame.
   * @param fakeFrame The frame to render at when smooth scrolling is enabled.
   * @param actualFrame The actual frame we are at.
   */


  var _calcSteps = function _calcSteps(fakeFrame, actualFrame) {
    //Iterate over all skrollables.
    var skrollableIndex = 0;
    var skrollablesLength = _skrollables.length;

    for (; skrollableIndex < skrollablesLength; skrollableIndex++) {
      var skrollable = _skrollables[skrollableIndex];
      var element = skrollable.element;
      var frame = skrollable.smoothScrolling ? fakeFrame : actualFrame;
      var frames = skrollable.keyFrames;
      var framesLength = frames.length;
      var firstFrame = frames[0];
      var lastFrame = frames[frames.length - 1];
      var beforeFirst = frame < firstFrame.frame;
      var afterLast = frame > lastFrame.frame;
      var firstOrLastFrame = beforeFirst ? firstFrame : lastFrame;
      var emitEvents = skrollable.emitEvents;
      var lastFrameIndex = skrollable.lastFrameIndex;
      var key;
      var value; //If we are before/after the first/last frame, set the styles according to the given edge strategy.

      if (beforeFirst || afterLast) {
        //Check if we already handled this edge case last time.
        //Note: using setScrollTop it's possible that we jumped from one edge to the other.
        if (beforeFirst && skrollable.edge === -1 || afterLast && skrollable.edge === 1) {
          continue;
        } //Add the skrollr-before or -after class.


        if (beforeFirst) {
          _updateClass(element, [SKROLLABLE_BEFORE_CLASS], [SKROLLABLE_AFTER_CLASS, SKROLLABLE_BETWEEN_CLASS]); //This handles the special case where we exit the first keyframe.


          if (emitEvents && lastFrameIndex > -1) {
            _emitEvent(element, firstFrame.eventType, _direction);

            skrollable.lastFrameIndex = -1;
          }
        } else {
          _updateClass(element, [SKROLLABLE_AFTER_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_BETWEEN_CLASS]); //This handles the special case where we exit the last keyframe.


          if (emitEvents && lastFrameIndex < framesLength) {
            _emitEvent(element, lastFrame.eventType, _direction);

            skrollable.lastFrameIndex = framesLength;
          }
        } //Remember that we handled the edge case (before/after the first/last keyframe).


        skrollable.edge = beforeFirst ? -1 : 1;

        switch (skrollable.edgeStrategy) {
          case 'reset':
            _reset(element);

            continue;

          case 'ease':
            //Handle this case like it would be exactly at first/last keyframe and just pass it on.
            frame = firstOrLastFrame.frame;
            break;

          default:
          case 'set':
            var props = firstOrLastFrame.props;

            for (key in props) {
              if (hasProp.call(props, key)) {
                value = _interpolateString(props[key].value); //Set style or attribute.

                if (key.indexOf('@') === 0) {
                  element.setAttribute(key.substr(1), value);
                } else {
                  skrollr.setStyle(element, key, value);
                }
              }
            }

            continue;
        }
      } else {
        //Did we handle an edge last time?
        if (skrollable.edge !== 0) {
          _updateClass(element, [SKROLLABLE_CLASS, SKROLLABLE_BETWEEN_CLASS], [SKROLLABLE_BEFORE_CLASS, SKROLLABLE_AFTER_CLASS]);

          skrollable.edge = 0;
        }
      } //Find out between which two key frames we are right now.


      var keyFrameIndex = 0;

      for (; keyFrameIndex < framesLength - 1; keyFrameIndex++) {
        if (frame >= frames[keyFrameIndex].frame && frame <= frames[keyFrameIndex + 1].frame) {
          var left = frames[keyFrameIndex];
          var right = frames[keyFrameIndex + 1];

          for (key in left.props) {
            if (hasProp.call(left.props, key)) {
              var progress = (frame - left.frame) / (right.frame - left.frame); //Transform the current progress using the given easing function.

              progress = left.props[key].easing(progress); //Interpolate between the two values

              value = _calcInterpolation(left.props[key].value, right.props[key].value, progress);
              value = _interpolateString(value); //Set style or attribute.

              if (key.indexOf('@') === 0) {
                element.setAttribute(key.substr(1), value);
              } else {
                skrollr.setStyle(element, key, value);
              }
            }
          } //Are events enabled on this element?
          //This code handles the usual cases of scrolling through different keyframes.
          //The special cases of before first and after last keyframe are handled above.


          if (emitEvents) {
            //Did we pass a new keyframe?
            if (lastFrameIndex !== keyFrameIndex) {
              if (_direction === 'down') {
                _emitEvent(element, left.eventType, _direction);
              } else {
                _emitEvent(element, right.eventType, _direction);
              }

              skrollable.lastFrameIndex = keyFrameIndex;
            }
          }

          break;
        }
      }
    }
  };
  /**
   * Renders all elements.
   */


  var _render = function _render() {
    if (_requestReflow) {
      _requestReflow = false;

      _reflow();
    } //We may render something else than the actual scrollbar position.


    var renderTop = _instance.getScrollTop(); //If there's an animation, which ends in current render call, call the callback after rendering.


    var afterAnimationCallback;

    var now = _now();

    var progress; //Before actually rendering handle the scroll animation, if any.

    if (_scrollAnimation) {
      //It's over
      if (now >= _scrollAnimation.endTime) {
        renderTop = _scrollAnimation.targetTop;
        afterAnimationCallback = _scrollAnimation.done;
        _scrollAnimation = undefined;
      } else {
        //Map the current progress to the new progress using given easing function.
        progress = _scrollAnimation.easing((now - _scrollAnimation.startTime) / _scrollAnimation.duration);
        renderTop = _scrollAnimation.startTop + progress * _scrollAnimation.topDiff | 0;
      }

      _instance.setScrollTop(renderTop, true);
    } //Smooth scrolling only if there's no animation running and if we're not forcing the rendering.
    else if (!_forceRender) {
        var smoothScrollingDiff = _smoothScrolling.targetTop - renderTop; //The user scrolled, start new smooth scrolling.

        if (smoothScrollingDiff) {
          _smoothScrolling = {
            startTop: _lastTop,
            topDiff: renderTop - _lastTop,
            targetTop: renderTop,
            startTime: _lastRenderCall,
            endTime: _lastRenderCall + _smoothScrollingDuration
          };
        } //Interpolate the internal scroll position (not the actual scrollbar).


        if (now <= _smoothScrolling.endTime) {
          //Map the current progress to the new progress using easing function.
          progress = easings.sqrt((now - _smoothScrolling.startTime) / _smoothScrollingDuration);
          renderTop = _smoothScrolling.startTop + progress * _smoothScrolling.topDiff | 0;
        }
      } //Did the scroll position even change?


    if (_forceRender || _lastTop !== renderTop) {
      //Remember in which direction are we scrolling?
      _direction = renderTop > _lastTop ? 'down' : renderTop < _lastTop ? 'up' : _direction;
      _forceRender = false;
      var listenerParams = {
        curTop: renderTop,
        lastTop: _lastTop,
        maxTop: _maxKeyFrame,
        direction: _direction
      }; //Tell the listener we are about to render.

      var continueRendering = _listeners.beforerender && _listeners.beforerender.call(_instance, listenerParams); //The beforerender listener function is able the cancel rendering.


      if (continueRendering !== false) {
        //Now actually interpolate all the styles.
        _calcSteps(renderTop, _instance.getScrollTop()); //That's were we actually "scroll" on mobile.


        if (_isMobile && _skrollrBody) {
          //Set the transform ("scroll it").
          skrollr.setStyle(_skrollrBody, 'transform', 'translate(0, ' + -_mobileOffset + 'px) ' + _translateZ);
        } //Remember when we last rendered.


        _lastTop = renderTop;

        if (_listeners.render) {
          _listeners.render.call(_instance, listenerParams);
        }
      }

      if (afterAnimationCallback) {
        afterAnimationCallback.call(_instance, false);
      }
    }

    _lastRenderCall = now;
  };
  /**
   * Parses the properties for each key frame of the given skrollable.
   */


  var _parseProps = function _parseProps(skrollable) {
    //Iterate over all key frames
    var keyFrameIndex = 0;
    var keyFramesLength = skrollable.keyFrames.length;

    for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
      var frame = skrollable.keyFrames[keyFrameIndex];
      var easing;
      var value;
      var prop;
      var props = {};
      var match;

      while ((match = rxPropValue.exec(frame.props)) !== null) {
        prop = match[1];
        value = match[2];
        easing = prop.match(rxPropEasing); //Is there an easing specified for this prop?

        if (easing !== null) {
          prop = easing[1];
          easing = easing[2];
        } else {
          easing = DEFAULT_EASING;
        } //Exclamation point at first position forces the value to be taken literal.


        value = value.indexOf('!') ? _parseProp(value) : [value.slice(1)]; //Save the prop for this key frame with his value and easing function

        props[prop] = {
          value: value,
          easing: easings[easing]
        };
      }

      frame.props = props;
    }
  };
  /**
   * Parses a value extracting numeric values and generating a format string
   * for later interpolation of the new values in old string.
   *
   * @param val The CSS value to be parsed.
   * @return Something like ["rgba(?%,?%, ?%,?)", 100, 50, 0, .7]
   * where the first element is the format string later used
   * and all following elements are the numeric value.
   */


  var _parseProp = function _parseProp(val) {
    var numbers = []; //One special case, where floats don't work.
    //We replace all occurences of rgba colors
    //which don't use percentage notation with the percentage notation.

    rxRGBAIntegerColor.lastIndex = 0;
    val = val.replace(rxRGBAIntegerColor, function (rgba) {
      return rgba.replace(rxNumericValue, function (n) {
        return n / 255 * 100 + '%';
      });
    }); //Handle prefixing of "gradient" values.
    //For now only the prefixed value will be set. Unprefixed isn't supported anyway.

    if (theDashedCSSPrefix) {
      rxGradient.lastIndex = 0;
      val = val.replace(rxGradient, function (s) {
        return theDashedCSSPrefix + s;
      });
    } //Now parse ANY number inside this string and create a format string.


    val = val.replace(rxNumericValue, function (n) {
      numbers.push(+n);
      return '{?}';
    }); //Add the formatstring as first value.

    numbers.unshift(val);
    return numbers;
  };
  /**
   * Fills the key frames with missing left and right hand properties.
   * If key frame 1 has property X and key frame 2 is missing X,
   * but key frame 3 has X again, then we need to assign X to key frame 2 too.
   *
   * @param sk A skrollable.
   */


  var _fillProps = function _fillProps(sk) {
    //Will collect the properties key frame by key frame
    var propList = {};
    var keyFrameIndex;
    var keyFramesLength; //Iterate over all key frames from left to right

    keyFrameIndex = 0;
    keyFramesLength = sk.keyFrames.length;

    for (; keyFrameIndex < keyFramesLength; keyFrameIndex++) {
      _fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
    } //Now do the same from right to fill the last gaps


    propList = {}; //Iterate over all key frames from right to left

    keyFrameIndex = sk.keyFrames.length - 1;

    for (; keyFrameIndex >= 0; keyFrameIndex--) {
      _fillPropForFrame(sk.keyFrames[keyFrameIndex], propList);
    }
  };

  var _fillPropForFrame = function _fillPropForFrame(frame, propList) {
    var key; //For each key frame iterate over all right hand properties and assign them,
    //but only if the current key frame doesn't have the property by itself

    for (key in propList) {
      //The current frame misses this property, so assign it.
      if (!hasProp.call(frame.props, key)) {
        frame.props[key] = propList[key];
      }
    } //Iterate over all props of the current frame and collect them


    for (key in frame.props) {
      propList[key] = frame.props[key];
    }
  };
  /**
   * Calculates the new values for two given values array.
   */


  var _calcInterpolation = function _calcInterpolation(val1, val2, progress) {
    var valueIndex;
    var val1Length = val1.length; //They both need to have the same length

    if (val1Length !== val2.length) {
      throw 'Can\'t interpolate between "' + val1[0] + '" and "' + val2[0] + '"';
    } //Add the format string as first element.


    var interpolated = [val1[0]];
    valueIndex = 1;

    for (; valueIndex < val1Length; valueIndex++) {
      //That's the line where the two numbers are actually interpolated.
      interpolated[valueIndex] = val1[valueIndex] + (val2[valueIndex] - val1[valueIndex]) * progress;
    }

    return interpolated;
  };
  /**
   * Interpolates the numeric values into the format string.
   */


  var _interpolateString = function _interpolateString(val) {
    var valueIndex = 1;
    rxInterpolateString.lastIndex = 0;
    return val[0].replace(rxInterpolateString, function () {
      return val[valueIndex++];
    });
  };
  /**
   * Resets the class and style attribute to what it was before skrollr manipulated the element.
   * Also remembers the values it had before reseting, in order to undo the reset.
   */


  var _reset = function _reset(elements, undo) {
    //We accept a single element or an array of elements.
    elements = [].concat(elements);
    var skrollable;
    var element;
    var elementsIndex = 0;
    var elementsLength = elements.length;

    for (; elementsIndex < elementsLength; elementsIndex++) {
      element = elements[elementsIndex];
      skrollable = _skrollables[element[SKROLLABLE_ID_DOM_PROPERTY]]; //Couldn't find the skrollable for this DOM element.

      if (!skrollable) {
        continue;
      }

      if (undo) {
        //Reset class and style to the "dirty" (set by skrollr) values.
        element.style.cssText = skrollable.dirtyStyleAttr;

        _updateClass(element, skrollable.dirtyClassAttr);
      } else {
        //Remember the "dirty" (set by skrollr) class and style.
        skrollable.dirtyStyleAttr = element.style.cssText;
        skrollable.dirtyClassAttr = _getClass(element); //Reset class and style to what it originally was.

        element.style.cssText = skrollable.styleAttr;

        _updateClass(element, skrollable.classAttr);
      }
    }
  };
  /**
   * Detects support for 3d transforms by applying it to the skrollr-body.
   */


  var _detect3DTransforms = function _detect3DTransforms() {
    _translateZ = 'translateZ(0)';
    skrollr.setStyle(_skrollrBody, 'transform', _translateZ);
    var computedStyle = getStyle(_skrollrBody);
    var computedTransform = computedStyle.getPropertyValue('transform');
    var computedTransformWithPrefix = computedStyle.getPropertyValue(theDashedCSSPrefix + 'transform');
    var has3D = computedTransform && computedTransform !== 'none' || computedTransformWithPrefix && computedTransformWithPrefix !== 'none';

    if (!has3D) {
      _translateZ = '';
    }
  };
  /**
   * Set the CSS property on the given element. Sets prefixed properties as well.
   */


  skrollr.setStyle = function (el, prop, val) {
    var style = el.style; //Camel case.

    prop = prop.replace(rxCamelCase, rxCamelCaseFn).replace('-', ''); //Make sure z-index gets a <integer>.
    //This is the only <integer> case we need to handle.

    if (prop === 'zIndex') {
      if (isNaN(val)) {
        //If it's not a number, don't touch it.
        //It could for example be "auto" (#351).
        style[prop] = val;
      } else {
        //Floor the number.
        style[prop] = '' + (val | 0);
      }
    } //#64: "float" can't be set across browsers. Needs to use "cssFloat" for all except IE.
    else if (prop === 'float') {
        style.styleFloat = style.cssFloat = val;
      } else {
        //Need try-catch for old IE.
        try {
          //Set prefixed property if there's a prefix.
          if (theCSSPrefix) {
            style[theCSSPrefix + prop.slice(0, 1).toUpperCase() + prop.slice(1)] = val;
          } //Set unprefixed.


          style[prop] = val;
        } catch (ignore) {}
      }
  };
  /**
   * Cross browser event handling.
   */


  var _addEvent = skrollr.addEvent = function (element, names, callback) {
    var intermediate = function intermediate(e) {
      //Normalize IE event stuff.
      e = e || window.event;

      if (!e.target) {
        e.target = e.srcElement;
      }

      if (!e.preventDefault) {
        e.preventDefault = function () {
          e.returnValue = false;
          e.defaultPrevented = true;
        };
      }

      return callback.call(this, e);
    };

    names = names.split(' ');
    var name;
    var nameCounter = 0;
    var namesLength = names.length;

    for (; nameCounter < namesLength; nameCounter++) {
      name = names[nameCounter];

      if (element.addEventListener) {
        element.addEventListener(name, callback, false);
      } else {
        element.attachEvent('on' + name, intermediate);
      } //Remember the events to be able to flush them later.


      _registeredEvents.push({
        element: element,
        name: name,
        listener: callback
      });
    }
  };

  var _removeEvent = skrollr.removeEvent = function (element, names, callback) {
    names = names.split(' ');
    var nameCounter = 0;
    var namesLength = names.length;

    for (; nameCounter < namesLength; nameCounter++) {
      if (element.removeEventListener) {
        element.removeEventListener(names[nameCounter], callback, false);
      } else {
        element.detachEvent('on' + names[nameCounter], callback);
      }
    }
  };

  var _removeAllEvents = function _removeAllEvents() {
    var eventData;
    var eventCounter = 0;
    var eventsLength = _registeredEvents.length;

    for (; eventCounter < eventsLength; eventCounter++) {
      eventData = _registeredEvents[eventCounter];

      _removeEvent(eventData.element, eventData.name, eventData.listener);
    }

    _registeredEvents = [];
  };

  var _emitEvent = function _emitEvent(element, name, direction) {
    if (_listeners.keyframe) {
      _listeners.keyframe.call(_instance, element, name, direction);
    }
  };

  var _reflow = function _reflow() {
    var pos = _instance.getScrollTop(); //Will be recalculated by _updateDependentKeyFrames.


    _maxKeyFrame = 0;

    if (_forceHeight && !_isMobile) {
      //un-"force" the height to not mess with the calculations in _updateDependentKeyFrames (#216).
      body.style.height = '';
    }

    _updateDependentKeyFrames();

    if (_forceHeight && !_isMobile) {
      //"force" the height.
      body.style.height = _maxKeyFrame + documentElement.clientHeight + 'px';
    } //The scroll offset may now be larger than needed (on desktop the browser/os prevents scrolling farther than the bottom).


    if (_isMobile) {
      _instance.setScrollTop(Math.min(_instance.getScrollTop(), _maxKeyFrame));
    } else {
      //Remember and reset the scroll pos (#217).
      _instance.setScrollTop(pos, true);
    }

    _forceRender = true;
  };
  /*
   * Returns a copy of the constants object where all functions and strings have been evaluated.
   */


  var _processConstants = function _processConstants() {
    var viewportHeight = documentElement.clientHeight;
    var copy = {};
    var prop;
    var value;

    for (prop in _constants) {
      value = _constants[prop];

      if (typeof value === 'function') {
        value = value.call(_instance);
      } //Percentage offset.
      else if (/p$/.test(value)) {
          value = value.slice(0, -1) / 100 * viewportHeight;
        }

      copy[prop] = value;
    }

    return copy;
  };
  /*
   * Returns the height of the document.
   */


  var _getDocumentHeight = function _getDocumentHeight() {
    var skrollrBodyHeight = 0;
    var bodyHeight;

    if (_skrollrBody) {
      skrollrBodyHeight = Math.max(_skrollrBody.offsetHeight, _skrollrBody.scrollHeight);
    }

    bodyHeight = Math.max(skrollrBodyHeight, body.scrollHeight, body.offsetHeight, documentElement.scrollHeight, documentElement.offsetHeight, documentElement.clientHeight);
    return bodyHeight - documentElement.clientHeight;
  };
  /**
   * Returns a string of space separated classnames for the current element.
   * Works with SVG as well.
   */


  var _getClass = function _getClass(element) {
    var prop = 'className'; //SVG support by using className.baseVal instead of just className.

    if (window.SVGElement && element instanceof window.SVGElement) {
      element = element[prop];
      prop = 'baseVal';
    }

    return element[prop];
  };
  /**
   * Adds and removes a CSS classes.
   * Works with SVG as well.
   * add and remove are arrays of strings,
   * or if remove is ommited add is a string and overwrites all classes.
   */


  var _updateClass = function _updateClass(element, add, remove) {
    var prop = 'className'; //SVG support by using className.baseVal instead of just className.

    if (window.SVGElement && element instanceof window.SVGElement) {
      element = element[prop];
      prop = 'baseVal';
    } //When remove is ommited, we want to overwrite/set the classes.


    if (remove === undefined) {
      element[prop] = add;
      return;
    } //Cache current classes. We will work on a string before passing back to DOM.


    var val = element[prop]; //All classes to be removed.

    var classRemoveIndex = 0;
    var removeLength = remove.length;

    for (; classRemoveIndex < removeLength; classRemoveIndex++) {
      val = _untrim(val).replace(_untrim(remove[classRemoveIndex]), ' ');
    }

    val = _trim(val); //All classes to be added.

    var classAddIndex = 0;
    var addLength = add.length;

    for (; classAddIndex < addLength; classAddIndex++) {
      //Only add if el not already has class.
      if (_untrim(val).indexOf(_untrim(add[classAddIndex])) === -1) {
        val += ' ' + add[classAddIndex];
      }
    }

    element[prop] = _trim(val);
  };

  var _trim = function _trim(a) {
    return a.replace(rxTrim, '');
  };
  /**
   * Adds a space before and after the string.
   */


  var _untrim = function _untrim(a) {
    return ' ' + a + ' ';
  };

  var _now = _now2.default || function () {
    return +new Date();
  };

  var _keyFrameComparator = function _keyFrameComparator(a, b) {
    return a.frame - b.frame;
  };
  /*
   * Private variables.
   */
  //Singleton


  var _instance;
  /*
  	A list of all elements which should be animated associated with their the metadata.
  	Exmaple skrollable with two key frames animating from 100px width to 20px:
  		skrollable = {
  		element: <the DOM element>,
  		styleAttr: <style attribute of the element before skrollr>,
  		classAttr: <class attribute of the element before skrollr>,
  		keyFrames: [
  			{
  				frame: 100,
  				props: {
  					width: {
  						value: ['{?}px', 100],
  						easing: <reference to easing function>
  					}
  				},
  				mode: "absolute"
  			},
  			{
  				frame: 200,
  				props: {
  					width: {
  						value: ['{?}px', 20],
  						easing: <reference to easing function>
  					}
  				},
  				mode: "absolute"
  			}
  		]
  	};
  */


  var _skrollables;

  var _skrollrBody;

  var _listeners;

  var _forceHeight;

  var _maxKeyFrame = 0;
  var _scale = 1;

  var _constants;

  var _mobileDeceleration; //Current direction (up/down).


  var _direction = 'down'; //The last top offset value. Needed to determine direction.

  var _lastTop = -1; //The last time we called the render method (doesn't mean we rendered!).


  var _lastRenderCall = _now(); //For detecting if it actually resized (#271).


  var _lastViewportWidth = 0;
  var _lastViewportHeight = 0;
  var _requestReflow = false; //Will contain data about a running scrollbar animation, if any.

  var _scrollAnimation;

  var _smoothScrollingEnabled;

  var _smoothScrollingDuration; //Will contain settins for smooth scrolling if enabled.


  var _smoothScrolling; //Can be set by any operation/event to force rendering even if the scrollbar didn't move.


  var _forceRender; //Each skrollable gets an unique ID incremented for each skrollable.
  //The ID is the index in the _skrollables array.


  var _skrollableIdCounter = 0;

  var _edgeStrategy; //Mobile specific vars. Will be stripped by UglifyJS when not in use.


  var _isMobile = false; //The virtual scroll offset when using mobile scrolling.

  var _mobileOffset = 0; //If the browser supports 3d transforms, this will be filled with 'translateZ(0)' (empty string otherwise).

  var _translateZ; //Will contain data about registered events by skrollr.


  var _registeredEvents = []; //Animation frame id returned by RequestAnimationFrame (or timeout when RAF is not supported).

  var _animFrame; //Expose skrollr as either a global variable or a require.js module.


  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return skrollr;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = skrollr;
  } else {
    window.skrollr = skrollr;
  }
})(window, document);
},{"@babel/runtime-corejs2/core-js/date/now":"../node_modules/@babel/runtime-corejs2/core-js/date/now.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63167" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/skrollr.js"], null)
//# sourceMappingURL=/skrollr.e5fc45d7.js.map