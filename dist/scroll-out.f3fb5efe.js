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
})({"js/scroll-out.js":[function(require,module,exports) {
var ScrollOut = function () {
  'use strict';

  function clamp(v, min, max) {
    return min > v ? min : max < v ? max : v;
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function round(n) {
    return Math.round(n * 10000) / 10000;
  }

  var cache = {};

  function replacer(match) {
    return '-' + match[0].toLowerCase();
  }

  function hyphenate(value) {
    return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
  }
  /** find elements */


  function $(e, parent) {
    return !e || e.length === 0 ? // null or empty string returns empty array
    [] : e.nodeName ? // a single element is wrapped in an array
    [e] : // selector and NodeList are converted to Element[]
    [].slice.call(e[0].nodeName ? e : (parent || document.documentElement).querySelectorAll(e));
  }

  function setAttrs(el, attrs) {
    // tslint:disable-next-line:forin
    for (var key in attrs) {
      if (key.indexOf('_')) {
        el.setAttribute('data-' + hyphenate(key), attrs[key]);
      }
    }
  }

  function setProps(cssProps) {
    return function (el, props) {
      for (var key in props) {
        if (key.indexOf('_') && (cssProps === true || cssProps[key])) {
          el.style.setProperty('--' + hyphenate(key), round(props[key]));
        }
      }
    };
  }

  var clearTask;
  var subscribers = [];

  function loop() {
    clearTask = 0;
    subscribers.slice().forEach(function (s2) {
      return s2();
    });
    enqueue();
  }

  function enqueue() {
    if (!clearTask && subscribers.length) {
      clearTask = requestAnimationFrame(loop);
    }
  }

  function subscribe(fn) {
    subscribers.push(fn);
    enqueue();
    return function () {
      subscribers = subscribers.filter(function (s) {
        return s !== fn;
      });

      if (!subscribers.length && clearTask) {
        cancelAnimationFrame(clearTask);
        clearTask = 0;
      }
    };
  }

  function unwrap(value, el, ctx, doc) {
    return typeof value === 'function' ? value(el, ctx, doc) : value;
  }

  function noop() {}
  /**
   * Creates a new instance of ScrollOut that marks elements in the viewport with
   * an "in" class and marks elements outside of the viewport with an "out"
   */
  // tslint:disable-next-line:no-default-export


  function main(opts) {
    // Apply default options.
    opts = opts || {}; // Debounce onChange/onHidden/onShown.

    var onChange = opts.onChange || noop;
    var onHidden = opts.onHidden || noop;
    var onShown = opts.onShown || noop;
    var onScroll = opts.onScroll || noop;
    var props = opts.cssProps ? setProps(opts.cssProps) : noop;
    var se = opts.scrollingElement;
    var container = se ? $(se)[0] : window;
    var doc = se ? $(se)[0] : document.documentElement;
    var rootChanged = false;
    var scrollingElementContext = {};
    var elementContextList = [];
    var clientOffsetX, clientOffsety;
    var sub;

    function index() {
      elementContextList = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) {
        return {
          element: el
        };
      });
    }

    function update() {
      // Calculate position, direction and ratio.
      var clientWidth = doc.clientWidth;
      var clientHeight = doc.clientHeight;
      var scrollDirX = sign(-clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset));
      var scrollDirY = sign(-clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset));
      var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
      var scrollPercentY = doc.scrollTop / (doc.scrollHeight - clientHeight || 1); // Detect if the root context has changed.

      rootChanged = rootChanged || scrollingElementContext.scrollDirX !== scrollDirX || scrollingElementContext.scrollDirY !== scrollDirY || scrollingElementContext.scrollPercentX !== scrollPercentX || scrollingElementContext.scrollPercentY !== scrollPercentY;
      scrollingElementContext.scrollDirX = scrollDirX;
      scrollingElementContext.scrollDirY = scrollDirY;
      scrollingElementContext.scrollPercentX = scrollPercentX;
      scrollingElementContext.scrollPercentY = scrollPercentY;
      var childChanged = false;

      for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
        var ctx = elementContextList[index_1];
        var element = ctx.element; // find the distance from the element to the scrolling container

        var target = element;
        var offsetX = 0;
        var offsetY = 0;

        do {
          offsetX += target.offsetLeft;
          offsetY += target.offsetTop;
          target = target.offsetParent;
        } while (target && target !== container); // Get element dimensions.


        var elementHeight = element.clientHeight || element.offsetHeight || 0;
        var elementWidth = element.clientWidth || element.offsetWidth || 0; // Find visible ratios for each element.

        var visibleX = (clamp(offsetX + elementWidth, clientOffsetX, clientOffsetX + clientWidth) - clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) / elementWidth;
        var visibleY = (clamp(offsetY + elementHeight, clientOffsety, clientOffsety + clientHeight) - clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) / elementHeight;
        var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
        var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
        var viewportX = clamp((clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) / (clientWidth / 2), -1, 1);
        var viewportY = clamp((clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) / (clientHeight / 2), -1, 1);
        var visible = void 0;

        if (opts.offset) {
          visible = unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
        } else if ((unwrap(opts.threshold, element, ctx, doc) || 0) < visibleX * visibleY) {
          visible = 1;
        } else {
          visible = 0;
        }

        var changedVisible = ctx.visible !== visible;
        var changed = ctx._changed || changedVisible || ctx.visibleX !== visibleX || ctx.visibleY !== visibleY || ctx.index !== index_1 || ctx.elementHeight !== elementHeight || ctx.elementWidth !== elementWidth || ctx.offsetX !== offsetX || ctx.offsetY !== offsetY || ctx.intersectX !== ctx.intersectX || ctx.intersectY !== ctx.intersectY || ctx.viewportX !== viewportX || ctx.viewportY !== viewportY;

        if (changed) {
          childChanged = true;
          ctx._changed = true;
          ctx._visibleChanged = changedVisible;
          ctx.visible = visible;
          ctx.elementHeight = elementHeight;
          ctx.elementWidth = elementWidth;
          ctx.index = index_1;
          ctx.offsetX = offsetX;
          ctx.offsetY = offsetY;
          ctx.visibleX = visibleX;
          ctx.visibleY = visibleY;
          ctx.intersectX = intersectX;
          ctx.intersectY = intersectY;
          ctx.viewportX = viewportX;
          ctx.viewportY = viewportY;
          ctx.visible = visible;
        }
      }

      if (!sub && (rootChanged || childChanged)) {
        sub = subscribe(render);
      }
    }

    function render() {
      maybeUnsubscribe(); // Update root attributes if they have changed.

      if (rootChanged) {
        rootChanged = false;
        setAttrs(doc, {
          scrollDirX: scrollingElementContext.scrollDirX,
          scrollDirY: scrollingElementContext.scrollDirY
        });
        props(doc, scrollingElementContext);
        onScroll(doc, scrollingElementContext, elementContextList);
      }

      var len = elementContextList.length;

      for (var x = len - 1; x > -1; x--) {
        var ctx = elementContextList[x];
        var el = ctx.element;
        var visible = ctx.visible;

        if (ctx._changed) {
          ctx._changed = false;
          props(el, ctx);
        }

        if (ctx._visibleChanged) {
          setAttrs(el, {
            scroll: visible ? 'in' : 'out'
          });
          onChange(el, ctx, doc);
          (visible ? onShown : onHidden)(el, ctx, doc);
        } // if this is shown multiple times, keep it in the list


        if (visible && opts.once) {
          elementContextList.splice(x, 1);
        }
      }
    }

    function maybeUnsubscribe() {
      if (sub) {
        sub();
        sub = undefined;
      }
    } // Run initialize index.


    index();
    update();
    render(); // Collapses sequential updates into a single update.

    var updateTaskId = 0;

    var onUpdate = function onUpdate() {
      updateTaskId = updateTaskId || setTimeout(function () {
        updateTaskId = 0;
        update();
      }, 0);
    }; // Hook up document listeners to automatically detect changes.


    window.addEventListener('resize', onUpdate);
    container.addEventListener('scroll', onUpdate);
    return {
      index: index,
      update: update,
      teardown: function teardown() {
        maybeUnsubscribe();
        window.removeEventListener('resize', onUpdate);
        container.removeEventListener('scroll', onUpdate);
      }
    };
  }

  return main;
}();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49761" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/scroll-out.js"], null)
//# sourceMappingURL=/scroll-out.f3fb5efe.js.map