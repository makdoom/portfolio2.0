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
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/typed.js/src/defaults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Defaults & options
 * @returns {object} Typed defaults & options
 * @public
 */
const defaults = {
  /**
   * @property {array} strings strings to be typed
   * @property {string} stringsElement ID of element containing string children
   */
  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
  stringsElement: null,

  /**
   * @property {number} typeSpeed type speed in milliseconds
   */
  typeSpeed: 0,

  /**
   * @property {number} startDelay time before typing starts in milliseconds
   */
  startDelay: 0,

  /**
   * @property {number} backSpeed backspacing speed in milliseconds
   */
  backSpeed: 0,

  /**
   * @property {boolean} smartBackspace only backspace what doesn't match the previous string
   */
  smartBackspace: true,

  /**
   * @property {boolean} shuffle shuffle the strings
   */
  shuffle: false,

  /**
   * @property {number} backDelay time before backspacing in milliseconds
   */
  backDelay: 700,

  /**
   * @property {boolean} fadeOut Fade out instead of backspace
   * @property {string} fadeOutClass css class for fade animation
   * @property {boolean} fadeOutDelay Fade out delay in milliseconds
   */
  fadeOut: false,
  fadeOutClass: 'typed-fade-out',
  fadeOutDelay: 500,

  /**
   * @property {boolean} loop loop strings
   * @property {number} loopCount amount of loops
   */
  loop: false,
  loopCount: Infinity,

  /**
   * @property {boolean} showCursor show cursor
   * @property {string} cursorChar character for cursor
   * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
   */
  showCursor: true,
  cursorChar: '|',
  autoInsertCss: true,

  /**
   * @property {string} attr attribute for typing
   * Ex: input placeholder, value, or just HTML text
   */
  attr: null,

  /**
   * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
   */
  bindInputFocusEvents: false,

  /**
   * @property {string} contentType 'html' or 'null' for plaintext
   */
  contentType: 'html',

  /**
   * Before it begins typing
   * @param {Typed} self
   */
  onBegin: self => {},

  /**
   * All typing is complete
   * @param {Typed} self
   */
  onComplete: self => {},

  /**
   * Before each string is typed
   * @param {number} arrayPos
   * @param {Typed} self
   */
  preStringTyped: (arrayPos, self) => {},

  /**
   * After each string is typed
   * @param {number} arrayPos
   * @param {Typed} self
   */
  onStringTyped: (arrayPos, self) => {},

  /**
   * During looping, after last string is typed
   * @param {Typed} self
   */
  onLastStringBackspaced: self => {},

  /**
   * Typing has been stopped
   * @param {number} arrayPos
   * @param {Typed} self
   */
  onTypingPaused: (arrayPos, self) => {},

  /**
   * Typing has been started after being stopped
   * @param {number} arrayPos
   * @param {Typed} self
   */
  onTypingResumed: (arrayPos, self) => {},

  /**
   * After reset
   * @param {Typed} self
   */
  onReset: self => {},

  /**
   * After stop
   * @param {number} arrayPos
   * @param {Typed} self
   */
  onStop: (arrayPos, self) => {},

  /**
   * After start
   * @param {number} arrayPos
   * @param {Typed} self
   */
  onStart: (arrayPos, self) => {},

  /**
   * After destroy
   * @param {Typed} self
   */
  onDestroy: self => {}
};
var _default = defaults;
exports.default = _default;
},{}],"../node_modules/typed.js/src/initializer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializer = exports.default = void 0;

var _defaults = _interopRequireDefault(require("./defaults.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initialize the Typed object
 */
class Initializer {
  /**
   * Load up defaults & options on the Typed instance
   * @param {Typed} self instance of Typed
   * @param {object} options options object
   * @param {string} elementId HTML element ID _OR_ instance of HTML element
   * @private
   */
  load(self, options, elementId) {
    // chosen element to manipulate text
    if (typeof elementId === 'string') {
      self.el = document.querySelector(elementId);
    } else {
      self.el = elementId;
    }

    self.options = { ..._defaults.default,
      ...options
    }; // attribute to type into

    self.isInput = self.el.tagName.toLowerCase() === 'input';
    self.attr = self.options.attr;
    self.bindInputFocusEvents = self.options.bindInputFocusEvents; // show cursor

    self.showCursor = self.isInput ? false : self.options.showCursor; // custom cursor

    self.cursorChar = self.options.cursorChar; // Is the cursor blinking

    self.cursorBlinking = true; // text content of element

    self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent; // html or plain text

    self.contentType = self.options.contentType; // typing speed

    self.typeSpeed = self.options.typeSpeed; // add a delay before typing starts

    self.startDelay = self.options.startDelay; // backspacing speed

    self.backSpeed = self.options.backSpeed; // only backspace what doesn't match the previous string

    self.smartBackspace = self.options.smartBackspace; // amount of time to wait before backspacing

    self.backDelay = self.options.backDelay; // Fade out instead of backspace

    self.fadeOut = self.options.fadeOut;
    self.fadeOutClass = self.options.fadeOutClass;
    self.fadeOutDelay = self.options.fadeOutDelay; // variable to check whether typing is currently paused

    self.isPaused = false; // input strings of text

    self.strings = self.options.strings.map(s => s.trim()); // div containing strings

    if (typeof self.options.stringsElement === 'string') {
      self.stringsElement = document.querySelector(self.options.stringsElement);
    } else {
      self.stringsElement = self.options.stringsElement;
    }

    if (self.stringsElement) {
      self.strings = [];
      self.stringsElement.style.display = 'none';
      const strings = Array.prototype.slice.apply(self.stringsElement.children);
      const stringsLength = strings.length;

      if (stringsLength) {
        for (let i = 0; i < stringsLength; i += 1) {
          const stringEl = strings[i];
          self.strings.push(stringEl.innerHTML.trim());
        }
      }
    } // character number position of current string


    self.strPos = 0; // current array position

    self.arrayPos = 0; // index of string to stop backspacing on

    self.stopNum = 0; // Looping logic

    self.loop = self.options.loop;
    self.loopCount = self.options.loopCount;
    self.curLoop = 0; // shuffle the strings

    self.shuffle = self.options.shuffle; // the order of strings

    self.sequence = [];
    self.pause = {
      status: false,
      typewrite: true,
      curString: '',
      curStrPos: 0
    }; // When the typing is complete (when not looped)

    self.typingComplete = false; // Set the order in which the strings are typed

    for (let i in self.strings) {
      self.sequence[i] = i;
    } // If there is some text in the element


    self.currentElContent = this.getCurrentElContent(self);
    self.autoInsertCss = self.options.autoInsertCss;
    this.appendAnimationCss(self);
  }

  getCurrentElContent(self) {
    let elContent = '';

    if (self.attr) {
      elContent = self.el.getAttribute(self.attr);
    } else if (self.isInput) {
      elContent = self.el.value;
    } else if (self.contentType === 'html') {
      elContent = self.el.innerHTML;
    } else {
      elContent = self.el.textContent;
    }

    return elContent;
  }

  appendAnimationCss(self) {
    const cssDataName = 'data-typed-js-css';

    if (!self.autoInsertCss) {
      return;
    }

    if (!self.showCursor && !self.fadeOut) {
      return;
    }

    if (document.querySelector(`[${cssDataName}]`)) {
      return;
    }

    let css = document.createElement('style');
    css.type = 'text/css';
    css.setAttribute(cssDataName, true);
    let innerCss = '';

    if (self.showCursor) {
      innerCss += `
        .typed-cursor{
          opacity: 1;
        }
        .typed-cursor.typed-cursor--blink{
          animation: typedjsBlink 0.7s infinite;
          -webkit-animation: typedjsBlink 0.7s infinite;
                  animation: typedjsBlink 0.7s infinite;
        }
        @keyframes typedjsBlink{
          50% { opacity: 0.0; }
        }
        @-webkit-keyframes typedjsBlink{
          0% { opacity: 1; }
          50% { opacity: 0.0; }
          100% { opacity: 1; }
        }
      `;
    }

    if (self.fadeOut) {
      innerCss += `
        .typed-fade-out{
          opacity: 0;
          transition: opacity .25s;
        }
        .typed-cursor.typed-cursor--blink.typed-fade-out{
          -webkit-animation: 0;
          animation: 0;
        }
      `;
    }

    if (css.length === 0) {
      return;
    }

    css.innerHTML = innerCss;
    document.body.appendChild(css);
  }

}

exports.default = Initializer;
let initializer = new Initializer();
exports.initializer = initializer;
},{"./defaults.js":"../node_modules/typed.js/src/defaults.js"}],"../node_modules/typed.js/src/html-parser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlParser = exports.default = void 0;

/**
 * TODO: These methods can probably be combined somehow
 * Parse HTML tags & HTML Characters
 */
class HTMLParser {
  /**
   * Type HTML tags & HTML Characters
   * @param {string} curString Current string
   * @param {number} curStrPos Position in current string
   * @param {Typed} self instance of Typed
   * @returns {number} a new string position
   * @private
   */
  typeHtmlChars(curString, curStrPos, self) {
    if (self.contentType !== 'html') return curStrPos;
    const curChar = curString.substr(curStrPos).charAt(0);

    if (curChar === '<' || curChar === '&') {
      let endTag = '';

      if (curChar === '<') {
        endTag = '>';
      } else {
        endTag = ';';
      }

      while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
        curStrPos++;

        if (curStrPos + 1 > curString.length) {
          break;
        }
      }

      curStrPos++;
    }

    return curStrPos;
  }
  /**
   * Backspace HTML tags and HTML Characters
   * @param {string} curString Current string
   * @param {number} curStrPos Position in current string
   * @param {Typed} self instance of Typed
   * @returns {number} a new string position
   * @private
   */


  backSpaceHtmlChars(curString, curStrPos, self) {
    if (self.contentType !== 'html') return curStrPos;
    const curChar = curString.substr(curStrPos).charAt(0);

    if (curChar === '>' || curChar === ';') {
      let endTag = '';

      if (curChar === '>') {
        endTag = '<';
      } else {
        endTag = '&';
      }

      while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
        curStrPos--;

        if (curStrPos < 0) {
          break;
        }
      }

      curStrPos--;
    }

    return curStrPos;
  }

}

exports.default = HTMLParser;
let htmlParser = new HTMLParser();
exports.htmlParser = htmlParser;
},{}],"../node_modules/typed.js/src/typed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initializer = require("./initializer.js");

var _htmlParser = require("./html-parser.js");

/**
 * Welcome to Typed.js!
 * @param {string} elementId HTML element ID _OR_ HTML element
 * @param {object} options options object
 * @returns {object} a new Typed object
 */
class Typed {
  constructor(elementId, options) {
    // Initialize it up
    _initializer.initializer.load(this, options, elementId); // All systems go!


    this.begin();
  }
  /**
   * Toggle start() and stop() of the Typed instance
   * @public
   */


  toggle() {
    this.pause.status ? this.start() : this.stop();
  }
  /**
   * Stop typing / backspacing and enable cursor blinking
   * @public
   */


  stop() {
    if (this.typingComplete) return;
    if (this.pause.status) return;
    this.toggleBlinking(true);
    this.pause.status = true;
    this.options.onStop(this.arrayPos, this);
  }
  /**
   * Start typing / backspacing after being stopped
   * @public
   */


  start() {
    if (this.typingComplete) return;
    if (!this.pause.status) return;
    this.pause.status = false;

    if (this.pause.typewrite) {
      this.typewrite(this.pause.curString, this.pause.curStrPos);
    } else {
      this.backspace(this.pause.curString, this.pause.curStrPos);
    }

    this.options.onStart(this.arrayPos, this);
  }
  /**
   * Destroy this instance of Typed
   * @public
   */


  destroy() {
    this.reset(false);
    this.options.onDestroy(this);
  }
  /**
   * Reset Typed and optionally restarts
   * @param {boolean} restart
   * @public
   */


  reset(restart = true) {
    clearInterval(this.timeout);
    this.replaceText('');

    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
      this.cursor = null;
    }

    this.strPos = 0;
    this.arrayPos = 0;
    this.curLoop = 0;

    if (restart) {
      this.insertCursor();
      this.options.onReset(this);
      this.begin();
    }
  }
  /**
   * Begins the typing animation
   * @private
   */


  begin() {
    this.options.onBegin(this);
    this.typingComplete = false;
    this.shuffleStringsIfNeeded(this);
    this.insertCursor();
    if (this.bindInputFocusEvents) this.bindFocusEvents();
    this.timeout = setTimeout(() => {
      // Check if there is some text in the element, if yes start by backspacing the default message
      if (!this.currentElContent || this.currentElContent.length === 0) {
        this.typewrite(this.strings[this.sequence[this.arrayPos]], this.strPos);
      } else {
        // Start typing
        this.backspace(this.currentElContent, this.currentElContent.length);
      }
    }, this.startDelay);
  }
  /**
   * Called for each character typed
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */


  typewrite(curString, curStrPos) {
    if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
      this.el.classList.remove(this.fadeOutClass);
      if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
    }

    const humanize = this.humanizer(this.typeSpeed);
    let numChars = 1;

    if (this.pause.status === true) {
      this.setPauseStatus(curString, curStrPos, true);
      return;
    } // contain typing function in a timeout humanize'd delay


    this.timeout = setTimeout(() => {
      // skip over any HTML chars
      curStrPos = _htmlParser.htmlParser.typeHtmlChars(curString, curStrPos, this);
      let pauseTime = 0;
      let substr = curString.substr(curStrPos); // check for an escape character before a pause value
      // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
      // single ^ are removed from string

      if (substr.charAt(0) === '^') {
        if (/^\^\d+/.test(substr)) {
          let skip = 1; // skip at least 1

          substr = /\d+/.exec(substr)[0];
          skip += substr.length;
          pauseTime = parseInt(substr);
          this.temporaryPause = true;
          this.options.onTypingPaused(this.arrayPos, this); // strip out the escape character and pause value so they're not printed

          curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
          this.toggleBlinking(true);
        }
      } // check for skip characters formatted as
      // "this is a `string to print NOW` ..."


      if (substr.charAt(0) === '`') {
        while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
          numChars++;
          if (curStrPos + numChars > curString.length) break;
        } // strip out the escape characters and append all the string in between


        const stringBeforeSkip = curString.substring(0, curStrPos);
        const stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
        const stringAfterSkip = curString.substring(curStrPos + numChars + 1);
        curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
        numChars--;
      } // timeout for any pause after a character


      this.timeout = setTimeout(() => {
        // Accounts for blinking while paused
        this.toggleBlinking(false); // We're done with this sentence!

        if (curStrPos >= curString.length) {
          this.doneTyping(curString, curStrPos);
        } else {
          this.keepTyping(curString, curStrPos, numChars);
        } // end of character pause


        if (this.temporaryPause) {
          this.temporaryPause = false;
          this.options.onTypingResumed(this.arrayPos, this);
        }
      }, pauseTime); // humanized value for typing
    }, humanize);
  }
  /**
   * Continue to the next string & begin typing
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */


  keepTyping(curString, curStrPos, numChars) {
    // call before functions if applicable
    if (curStrPos === 0) {
      this.toggleBlinking(false);
      this.options.preStringTyped(this.arrayPos, this);
    } // start typing each new char into existing string
    // curString: arg, this.el.html: original text inside element


    curStrPos += numChars;
    const nextString = curString.substr(0, curStrPos);
    this.replaceText(nextString); // loop the function

    this.typewrite(curString, curStrPos);
  }
  /**
   * We're done typing the current string
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */


  doneTyping(curString, curStrPos) {
    // fires callback function
    this.options.onStringTyped(this.arrayPos, this);
    this.toggleBlinking(true); // is this the final string

    if (this.arrayPos === this.strings.length - 1) {
      // callback that occurs on the last typed string
      this.complete(); // quit if we wont loop back

      if (this.loop === false || this.curLoop === this.loopCount) {
        return;
      }
    }

    this.timeout = setTimeout(() => {
      this.backspace(curString, curStrPos);
    }, this.backDelay);
  }
  /**
   * Backspaces 1 character at a time
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */


  backspace(curString, curStrPos) {
    if (this.pause.status === true) {
      this.setPauseStatus(curString, curStrPos, true);
      return;
    }

    if (this.fadeOut) return this.initFadeOut();
    this.toggleBlinking(false);
    const humanize = this.humanizer(this.backSpeed);
    this.timeout = setTimeout(() => {
      curStrPos = _htmlParser.htmlParser.backSpaceHtmlChars(curString, curStrPos, this); // replace text with base text + typed characters

      const curStringAtPosition = curString.substr(0, curStrPos);
      this.replaceText(curStringAtPosition); // if smartBack is enabled

      if (this.smartBackspace) {
        // the remaining part of the current string is equal of the same part of the new string
        let nextString = this.strings[this.arrayPos + 1];

        if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
          this.stopNum = curStrPos;
        } else {
          this.stopNum = 0;
        }
      } // if the number (id of character in current string) is
      // less than the stop number, keep going


      if (curStrPos > this.stopNum) {
        // subtract characters one by one
        curStrPos--; // loop the function

        this.backspace(curString, curStrPos);
      } else if (curStrPos <= this.stopNum) {
        // if the stop number has been reached, increase
        // array position to next string
        this.arrayPos++; // When looping, begin at the beginning after backspace complete

        if (this.arrayPos === this.strings.length) {
          this.arrayPos = 0;
          this.options.onLastStringBackspaced();
          this.shuffleStringsIfNeeded();
          this.begin();
        } else {
          this.typewrite(this.strings[this.sequence[this.arrayPos]], curStrPos);
        }
      } // humanized value for typing

    }, humanize);
  }
  /**
   * Full animation is complete
   * @private
   */


  complete() {
    this.options.onComplete(this);

    if (this.loop) {
      this.curLoop++;
    } else {
      this.typingComplete = true;
    }
  }
  /**
   * Has the typing been stopped
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @param {boolean} isTyping
   * @private
   */


  setPauseStatus(curString, curStrPos, isTyping) {
    this.pause.typewrite = isTyping;
    this.pause.curString = curString;
    this.pause.curStrPos = curStrPos;
  }
  /**
   * Toggle the blinking cursor
   * @param {boolean} isBlinking
   * @private
   */


  toggleBlinking(isBlinking) {
    if (!this.cursor) return; // if in paused state, don't toggle blinking a 2nd time

    if (this.pause.status) return;
    if (this.cursorBlinking === isBlinking) return;
    this.cursorBlinking = isBlinking;

    if (isBlinking) {
      this.cursor.classList.add('typed-cursor--blink');
    } else {
      this.cursor.classList.remove('typed-cursor--blink');
    }
  }
  /**
   * Speed in MS to type
   * @param {number} speed
   * @private
   */


  humanizer(speed) {
    return Math.round(Math.random() * speed / 2) + speed;
  }
  /**
   * Shuffle the sequence of the strings array
   * @private
   */


  shuffleStringsIfNeeded() {
    if (!this.shuffle) return;
    this.sequence = this.sequence.sort(() => Math.random() - 0.5);
  }
  /**
   * Adds a CSS class to fade out current string
   * @private
   */


  initFadeOut() {
    this.el.className += ` ${this.fadeOutClass}`;
    if (this.cursor) this.cursor.className += ` ${this.fadeOutClass}`;
    return setTimeout(() => {
      this.arrayPos++;
      this.replaceText(''); // Resets current string if end of loop reached

      if (this.strings.length > this.arrayPos) {
        this.typewrite(this.strings[this.sequence[this.arrayPos]], 0);
      } else {
        this.typewrite(this.strings[0], 0);
        this.arrayPos = 0;
      }
    }, this.fadeOutDelay);
  }
  /**
   * Replaces current text in the HTML element
   * depending on element type
   * @param {string} str
   * @private
   */


  replaceText(str) {
    if (this.attr) {
      this.el.setAttribute(this.attr, str);
    } else {
      if (this.isInput) {
        this.el.value = str;
      } else if (this.contentType === 'html') {
        this.el.innerHTML = str;
      } else {
        this.el.textContent = str;
      }
    }
  }
  /**
   * If using input elements, bind focus in order to
   * start and stop the animation
   * @private
   */


  bindFocusEvents() {
    if (!this.isInput) return;
    this.el.addEventListener('focus', e => {
      this.stop();
    });
    this.el.addEventListener('blur', e => {
      if (this.el.value && this.el.value.length !== 0) {
        return;
      }

      this.start();
    });
  }
  /**
   * On init, insert the cursor element
   * @private
   */


  insertCursor() {
    if (!this.showCursor) return;
    if (this.cursor) return;
    this.cursor = document.createElement('span');
    this.cursor.className = 'typed-cursor';
    this.cursor.innerHTML = this.cursorChar;
    this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
  }

}

exports.default = Typed;
},{"./initializer.js":"../node_modules/typed.js/src/initializer.js","./html-parser.js":"../node_modules/typed.js/src/html-parser.js"}],"../node_modules/lax.js/lib/lax.min.js":[function(require,module,exports) {
"use strict";function _slicedToArray(t,a){return _arrayWithHoles(t)||_iterableToArrayLimit(t,a)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,a){var n=[],e=!0,r=!1,o=void 0;try{for(var l,i=t[Symbol.iterator]();!(e=(l=i.next()).done)&&(n.push(l.value),!a||n.length!==a);e=!0);}catch(t){r=!0,o=t}finally{try{e||null==i.return||i.return()}finally{if(r)throw o}}return n}function _arrayWithHoles(t){if(Array.isArray(t))return t}!function(){var lax=function(){for(var lax={elements:[]},lastY=0,currentBreakpoint="default",breakpointsSeparator="_",transformFns={"data-lax-opacity":function(t,a){t.opacity=a},"data-lax-translate":function(t,a){t.transform+=" translate(".concat(a,"px, ").concat(a,"px)")},"data-lax-translate-x":function(t,a){t.transform+=" translateX(".concat(a,"px)")},"data-lax-translate-y":function(t,a){t.transform+=" translateY(".concat(a,"px)")},"data-lax-scale":function(t,a){t.transform+=" scale(".concat(a,")")},"data-lax-scale-x":function(t,a){t.transform+=" scaleX(".concat(a,")")},"data-lax-scale-y":function(t,a){t.transform+=" scaleY(".concat(a,")")},"data-lax-skew":function(t,a){t.transform+=" skew(".concat(a,"deg, ").concat(a,"deg)")},"data-lax-skew-x":function(t,a){t.transform+=" skewX(".concat(a,"deg)")},"data-lax-skew-y":function(t,a){t.transform+=" skewY(".concat(a,"deg)")},"data-lax-rotate":function(t,a){t.transform+=" rotate(".concat(a,"deg)")},"data-lax-rotate-x":function(t,a){t.transform+=" rotateX(".concat(a,"deg)")},"data-lax-rotate-y":function(t,a){t.transform+=" rotateY(".concat(a,"deg)")},"data-lax-brightness":function(t,a){t.filter+=" brightness(".concat(a,"%)")},"data-lax-contrast":function(t,a){t.filter+=" contrast(".concat(a,"%)")},"data-lax-hue-rotate":function(t,a){t.filter+=" hue-rotate(".concat(a,"deg)")},"data-lax-blur":function(t,a){t.filter+=" blur(".concat(a,"px)")},"data-lax-invert":function(t,a){t.filter+="  invert(".concat(a,"%)")},"data-lax-saturate":function(t,a){t.filter+="  saturate(".concat(a,"%)")},"data-lax-grayscale":function(t,a){t.filter+="  grayscale(".concat(a,"%)")},"data-lax-bg-pos":function(t,a){t.backgroundPosition="".concat(a,"px ").concat(a,"px")},"data-lax-bg-pos-x":function(t,a){t.backgroundPositionX="".concat(a,"px")},"data-lax-bg-pos-y":function(t,a){t.backgroundPositionY="".concat(a,"px")}},_crazy="",i=0;i<20;i++)_crazy+=" "+5*i+" "+47*i%360+", ";function intrp(t,a){for(var n=0;t[n][0]<=a&&void 0!==t[n+1];)n+=1;var e=t[n][0],r=void 0===t[n-1]?e:t[n-1][0],o=t[n][1],l=void 0===t[n-1]?o:t[n-1][1];return Math.min(Math.max((a-r)/(e-r),0),1)*(o-l)+l}function fnOrVal(s){return"("===s[0]?eval(s):parseFloat(s)}return lax.presets={linger:function(t){return{"data-lax-translate-y":"(vh*0.7) 0, 0 200, -500 0"}},lazy:function(t){return{"data-lax-translate-y":"(vh) 0, (-elh) ".concat(0<arguments.length&&void 0!==t?t:100)}},eager:function(t){return{"data-lax-translate-y":"(vh) 0, (-elh) -".concat(0<arguments.length&&void 0!==t?t:100)}},slalom:function(t){var a=0<arguments.length&&void 0!==t?t:50;return{"data-lax-translate-x":"vh ".concat(a,", (vh*0.8) ").concat(-a,", (vh*0.6) ").concat(a,", (vh*0.4) ").concat(-a,", (vh*0.2) ").concat(a,", (vh*0) ").concat(-a,", (-elh) ").concat(a)}},crazy:function(t){return{"data-lax-hue-rotate":"".concat(_crazy," | loop=20")}},spin:function(t){return{"data-lax-rotate":"(vh) 0, (-elh) ".concat(0<arguments.length&&void 0!==t?t:360)}},spinRev:function(t){return{"data-lax-rotate":"(vh) 0, (-elh) ".concat(-(0<arguments.length&&void 0!==t?t:360))}},spinIn:function(t){return{"data-lax-rotate":"vh ".concat(0<arguments.length&&void 0!==t?t:360,", (vh*0.5) 0")}},spinOut:function(t){return{"data-lax-rotate":"(vh*0.5) 0, -elh ".concat(0<arguments.length&&void 0!==t?t:360)}},blurInOut:function(t){var a=0<arguments.length&&void 0!==t?t:40;return{"data-lax-blur":"(vh) ".concat(a,", (vh*0.8) 0, (vh*0.2) 0, 0 ").concat(a)}},blurIn:function(t){return{"data-lax-blur":"(vh) ".concat(0<arguments.length&&void 0!==t?t:40,", (vh*0.7) 0")}},blurOut:function(t){return{"data-lax-blur":"(vh*0.3) 0, 0 ".concat(0<arguments.length&&void 0!==t?t:40)}},fadeInOut:function(){return{"data-lax-opacity":"(vh) 0, (vh*0.8) 1, (vh*0.2) 1, 0 0"}},fadeIn:function(){return{"data-lax-opacity":"(vh) 0, (vh*0.7) 1"}},fadeOut:function(){return{"data-lax-opacity":"(vh*0.3) 1, 0 0"}},driftLeft:function(t){var a=0<arguments.length&&void 0!==t?t:100;return{"data-lax-translate-x":"vh ".concat(a,", -elh ").concat(-a)}},driftRight:function(t){var a=0<arguments.length&&void 0!==t?t:100;return{"data-lax-translate-x":"vh ".concat(-a,", -elh ").concat(a)}},leftToRight:function(t){return{"data-lax-translate-x":"vh 0, -elh (vw*".concat(0<arguments.length&&void 0!==t?t:1,")")}},rightToLeft:function(t){return{"data-lax-translate-x":"vh 0, -elh (vw*".concat(-(0<arguments.length&&void 0!==t?t:1),")")}},zoomInOut:function(t){var a=0<arguments.length&&void 0!==t?t:.2;return{"data-lax-scale":"(vh) ".concat(a,", (vh*0.8) 1, (vh*0.2) 1, -elh ").concat(a)}},zoomIn:function(t){return{"data-lax-scale":"(vh) ".concat(0<arguments.length&&void 0!==t?t:.2,", (vh*0.7) 1")}},zoomOut:function(t){return{"data-lax-scale":"(vh*0.3) 1, -elh ".concat(0<arguments.length&&void 0!==t?t:.2)}},speedy:function(t){var a=0<arguments.length&&void 0!==t?t:30;return{"data-lax-skew-x":"(vh) ".concat(a,", -elh ").concat(-a)}},swing:function(t){var a=0<arguments.length&&void 0!==t?t:30;return{"data-lax-skew-y":"(vh) ".concat(a,", -elh ").concat(-a)}}},lax.addPreset=function(t,a){lax.presets[t]=a},lax.setup=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};lax.breakpoints=t.breakpoints||{},lax.selector=t.selector||".lax",lax.populateElements()},lax.removeElement=function(a){var t=lax.elements.findIndex(function(t){return t.el=a});-1<t&&lax.elements.splice(t,1)},lax.createLaxObject=function(t){return{el:t,originalStyle:{transform:t.style.transform,filter:t.style.filter},transforms:{}}},lax.calcTransforms=function(l){for(var i=l.el,r=[],t=0;t<i.attributes.length;t++){var a=i.attributes[t];-1<a.name.indexOf("data-lax-preset")&&r.push(a)}for(var n=function(t){var a=r[t],n=a.name.split(breakpointsSeparator),o=n[1]?"".concat(breakpointsSeparator).concat(n[1]):"";a.value.split(" ").forEach(function(t){var a=t.split("-"),n=lax.presets[a[0]];if(n){var e=n(a[1]);for(var r in e)i.setAttribute("".concat(r).concat(o),e[r])}else console.log("lax error: preset ".concat(a[0]," is not defined"))});var e=i.getAttribute("data-lax-anchor");e&&""!==e||i.setAttribute("data-lax-anchor","self"),i.attributes.removeNamedItem(a.name)},e=0;e<r.length;e++)n(e);if(!(i.attributes["data-lax-use-gpu"]&&"false"===i.attributes["data-lax-use-gpu"].value)&&(i.style["backface-visibility"]="hidden",i.style["-webkit-backface-visibility"]="hidden"),i.attributes["data-lax-use-gpu"]&&i.attributes.removeNamedItem("data-lax-use-gpu"),l.optimise=!1,i.attributes["data-lax-optimize"]&&"true"===i.attributes["data-lax-optimize"].value){l.optimise=!0;var o=i.getBoundingClientRect();i.setAttribute("data-lax-opacity","".concat(-o.height-1," 0, ").concat(-o.height," 1, ").concat(window.innerHeight," 1, ").concat(window.innerHeight+1," 0")),i.attributes.removeNamedItem("data-lax-optimize")}for(var c=0;c<i.attributes.length;c++){var s=i.attributes[c];if(!(s.name.indexOf("data-lax")<0)){var u=s.name.split(breakpointsSeparator),f=u[0].split("-"),d=u[1]||"default";if("lax"===f[1])if("data-lax-anchor"===s.name){l["data-lax-anchor"]="self"===s.value?i:document.querySelector(s.value);var x=l["data-lax-anchor"].getBoundingClientRect();l.anchorTop=Math.floor(x.top)+window.scrollY}else!function(){var t=_slicedToArray(s.value.replace(/vw/g,window.innerWidth).replace(/vh/g,window.innerHeight).replace(/elh/g,i.clientHeight).replace(/elw/g,i.clientWidth).replace(/\s+/g," ").split("|"),2),a=t[0],n=t[1],r={};n&&n.split(" ").forEach(function(t){var a=_slicedToArray(t.split("="),2),n=a[0],e=a[1];r[n]=n&&fnOrVal(e)});var e=u[0],o=a.split(",").map(function(t){return t.trim().split(" ").map(fnOrVal)}).sort(function(t,a){return t[0]-a[0]});l.transforms[e]||(l.transforms[e]={}),l.transforms[e][d]={valueMap:o,options:r}}()}}var v=i.attributes["data-lax-sprite-data"]&&i.attributes["data-lax-sprite-data"].value;if(v){l.spriteData=v.split(",").map(function(t){return parseInt(t)}),i.style.height=l.spriteData[1]+"px",i.style.width=l.spriteData[0]+"px";var p=i.attributes["data-lax-sprite-image"]&&i.attributes["data-lax-sprite-image"].value;p&&(i.style.backgroundImage="url(".concat(p,")"))}return l},lax.addElement=function(t){var a=lax.calcTransforms(lax.createLaxObject(t));lax.elements.push(a),lax.updateElement(a)},lax.populateElements=function(){lax.elements=[],document.querySelectorAll(lax.selector).forEach(lax.addElement),currentBreakpoint=lax.getCurrentBreakPoint()},lax.updateElements=function(){lax.elements.forEach(function(t){lax.calcTransforms(t),lax.updateElement(t)}),currentBreakpoint=lax.getCurrentBreakPoint()},lax.getCurrentBreakPoint=function(){var t="default",a=window.innerWidth;for(var n in lax.breakpoints){if(!(parseFloat(lax.breakpoints[n])<=a))break;t=n}return t},lax.updateElement=function(t){var a=t.originalStyle,n=t.anchorTop,e=t.transforms,r=t.spriteData,o=t.el,l=n?n-lastY:lastY,i={transform:a.transform,filter:a.filter};for(var c in e){var s=e[c][currentBreakpoint]||e[c].default;if(s){var u=l;s.options.offset&&(u+=s.options.offset),s.options.speed&&(u*=s.options.speed),s.options.loop&&(u%=s.options.loop);var f=transformFns[c],d=intrp(s.valueMap,u);f&&f(i,d)}}if(r){var x=_slicedToArray(r,5),v=x[0],p=x[1],h=x[2],m=x[3],g=x[4],b=Math.floor(lastY/g)%h,y=b%m,k=Math.floor(b/m);i.backgroundPosition="-".concat(y*v,"px -").concat(k*p,"px")}if(0===i.opacity)o.style.opacity=0;else for(var w in i)o.style[w]=i[w]},lax.update=function(t){lastY!==t&&(lastY=t,lax.elements.forEach(lax.updateElement))},lax}();"undefined"!=typeof module&&void 0!==module.exports?module.exports=lax:window.lax=lax}();
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

require("../sass/main.scss");

var _typed = _interopRequireDefault(require("typed.js/src/typed"));

var _lax = _interopRequireDefault(require("lax.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  _lax.default.setup(); // init


  window.requestAnimationFrame(); // let outerContainer = document.querySelector(".outer__container");
  // const updateLax = () => {
  //   lax.update(outerContainer.scrollTop);
  //   window.requestAnimationFrame(updateLax);
  // };
  // window.requestAnimationFrame(updateLax);
}; // window.onload = () => {
//   lax.setup();
//   let outerContainer = document.querySelector(".outer__container");
//   outerContainer.addEventListener(
//     "scroll",
//     (e) => {
//       // console.log(outerContainer.scrollTop);
//       lax.update(outerContainer.scrollTop);
//     },
//     false
//   );
//   console.log("Lax setup");
// };
// Custom cursor


var mouseCursor = document.querySelector(".cursor");
window.addEventListener("mousemove", function (e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px"; // console.log(list);
});
var linksGrow = [];
linksGrow.push(document.querySelector(".burger"));
var projectLinks = document.querySelectorAll(".view abbr");
projectLinks.forEach(function (link) {
  linksGrow.push(link);
});
var skills = document.querySelectorAll(".box");
skills.forEach(function (link) {
  linksGrow.push(link);
});
var socialLinks = document.querySelectorAll(".social__links a");
socialLinks.forEach(function (link) {
  linksGrow.push(link);
}); // linksGrow.push("akdjf");

var navLinks = document.querySelectorAll(".list__item");
navLinks.forEach(function (link) {
  linksGrow.push(link);
}); // console.log(linksGrow);

linksGrow.forEach(function (list) {
  list.addEventListener("mouseleave", function () {
    mouseCursor.classList.remove("grow");
  });
  list.addEventListener("mouseover", function () {
    mouseCursor.classList.add("grow");
  });
}); // Toggling Humburger

var menuBtn = document.querySelector(".burger");
menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  document.querySelector(".nav__list").classList.toggle("open");
}); // Typing effect

var typed = new _typed.default(".type", {
  strings: ["Makdoom Shaikh", "Frontend Developer", "Programmer", "Developer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});
},{"../sass/main.scss":"sass/main.scss","typed.js/src/typed":"../node_modules/typed.js/src/typed.js","lax.js":"../node_modules/lax.js/lib/lax.min.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52763" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map