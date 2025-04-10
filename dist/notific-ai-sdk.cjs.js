'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var ActionMapBuilder = /*#__PURE__*/function () {
  function ActionMapBuilder() {
    _classCallCheck(this, ActionMapBuilder);
    this.observer = null;
    this.actionCatalog = {}; // Store the full catalog of possible actions
    this.actionMap = this.createEmptyActionMap();
  }
  /**
   * Initialize the action map builder and start observing DOM changes
   */
  return _createClass(ActionMapBuilder, [{
    key: "init",
    value: function init() {
      this.buildActionMap();
      this.buildActionCatalog(); // Build the action catalog
      this.observeDOM();
    }
    /**
     * Destroy the action map builder and stop observing DOM changes
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
    /**
     * Get the current action map
     */
  }, {
    key: "getActionMap",
    value: function getActionMap() {
      // Update timestamp before returning
      this.actionMap.timestamp = Date.now();
      return this.actionMap;
    }
    /**
     * Create an empty action map structure
     */
  }, {
    key: "createEmptyActionMap",
    value: function createEmptyActionMap() {
      return {
        url: window.location.href,
        title: document.title,
        elements: [],
        actionCatalog: {},
        timestamp: Date.now()
      };
    }
    /**
     * Builds a simple catalog for the MVP version
     */
  }, {
    key: "buildActionCatalog",
    value: function buildActionCatalog() {
      // Start with an empty catalog - for MVP we don't need navigation steps
      this.actionCatalog = {};
      console.log('Building simplified action catalog for MVP');
      // Add the empty action catalog to the action map
      this.actionMap.actionCatalog = this.actionCatalog;
    }
    /**
     * Build the action map by scanning the DOM for actionable elements
     */
  }, {
    key: "buildActionMap",
    value: function buildActionMap() {
      var _this = this;
      // Reset the elements array
      this.actionMap = this.createEmptyActionMap();
      // Find all elements with data-ai-field or data-ai-action attributes
      var fieldElements = document.querySelectorAll('[data-ai-field]');
      var actionElements = document.querySelectorAll('[data-ai-action]');
      // Process field elements
      fieldElements.forEach(function (element) {
        var actionableElement = _this.processFieldElement(element);
        if (actionableElement) {
          _this.actionMap.elements.push(actionableElement);
        }
      });
      // Process action elements
      actionElements.forEach(function (element) {
        var actionableElement = _this.processActionElement(element);
        if (actionableElement) {
          _this.actionMap.elements.push(actionableElement);
        }
      });
    }
    /**
     * Process a field element and convert it to an ActionableElement
     */
  }, {
    key: "processFieldElement",
    value: function processFieldElement(element) {
      var fieldName = element.getAttribute('data-ai-field');
      if (!fieldName) return null;
      var rect = element.getBoundingClientRect();
      var elementType = element.tagName.toLowerCase();
      var value;
      var options;
      // Handle different field types
      if (elementType === 'input' || elementType === 'textarea') {
        value = element.value;
      } else if (elementType === 'select') {
        var selectElement = element;
        value = selectElement.value;
        options = Array.from(selectElement.options).map(function (option) {
          return option.text;
        });
      }
      // Try to find a label for this field
      var label = this.findLabelForElement(element);
      // Calculate DOM path
      var path = this.getDomPath(element);
      return {
        id: this.generateElementId(element),
        type: 'field',
        name: fieldName,
        value: value,
        position: {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY
        },
        elementType: elementType,
        label: label,
        options: options,
        required: element.hasAttribute('required'),
        disabled: element.hasAttribute('disabled'),
        path: path
      };
    }
    /**
     * Process an action element and convert it to an ActionableElement
     */
  }, {
    key: "processActionElement",
    value: function processActionElement(element) {
      var _a;
      var actionName = element.getAttribute('data-ai-action');
      if (!actionName) return null;
      var rect = element.getBoundingClientRect();
      var elementType = element.tagName.toLowerCase();
      // Try to find a label for this action
      var label = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || undefined;
      if (!label || label === '') {
        var ariaLabel = element.getAttribute('aria-label');
        if (ariaLabel) {
          label = ariaLabel;
        }
      }
      // Calculate DOM path
      var path = this.getDomPath(element);
      // Check if this element provides access to other actions
      var providesAccess = element.getAttribute('data-ai-provides-access');
      var accessParam = element.getAttribute('data-ai-action-param');
      var actionElement = {
        id: this.generateElementId(element),
        type: 'action',
        name: actionName,
        position: {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY
        },
        elementType: elementType,
        label: label,
        disabled: element.hasAttribute('disabled'),
        path: path
      };
      // Add accessibility information if available
      if (providesAccess) {
        actionElement.providesAccess = providesAccess.split(',').map(function (a) {
          return a.trim();
        });
      }
      if (accessParam) {
        actionElement.accessParam = accessParam;
      }
      return actionElement;
    }
    /**
     * Find a label element associated with an input element
     */
  }, {
    key: "findLabelForElement",
    value: function findLabelForElement(element) {
      // Check for id->for relationship
      if (element.id) {
        var label = document.querySelector("label[for=\"".concat(element.id, "\"]"));
        if (label && label.textContent) {
          return label.textContent.trim();
        }
      }
      // Check for parent label
      var parent = element.parentElement;
      while (parent) {
        if (parent.tagName.toLowerCase() === 'label' && parent.textContent) {
          return parent.textContent.trim();
        }
        parent = parent.parentElement;
      }
      // Check for aria-label
      var ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel) {
        return ariaLabel;
      }
      // Check for placeholder
      var placeholder = element.getAttribute('placeholder');
      if (placeholder) {
        return placeholder;
      }
      return undefined;
    }
    /**
     * Generate a unique ID for an element
     */
  }, {
    key: "generateElementId",
    value: function generateElementId(element) {
      // Use existing ID if available
      if (element.id) {
        return element.id;
      }
      // Generate a new ID based on element properties
      var type = element.getAttribute('data-ai-field') ? 'field' : element.getAttribute('data-ai-action') ? 'action' : 'element';
      var name = element.getAttribute('data-ai-field') || element.getAttribute('data-ai-action') || element.tagName.toLowerCase();
      var randomPart = Math.random().toString(36).substring(2, 8);
      return "notific-".concat(type, "-").concat(name, "-").concat(randomPart);
    }
    /**
     * Get the DOM path for an element
     */
  }, {
    key: "getDomPath",
    value: function getDomPath(element) {
      var path = [];
      var currentElement = element;
      while (currentElement) {
        var selector = currentElement.tagName.toLowerCase();
        if (currentElement.id) {
          selector += "#".concat(currentElement.id);
        } else if (currentElement.className && typeof currentElement.className === 'string') {
          var classes = currentElement.className.split(/\s+/).filter(Boolean);
          if (classes.length) {
            selector += ".".concat(classes.join('.'));
          }
        }
        path.unshift(selector);
        currentElement = currentElement.parentElement;
      }
      return path;
    }
    /**
     * Observe DOM mutations to keep the action map updated
     */
  }, {
    key: "observeDOM",
    value: function observeDOM() {
      var _this2 = this;
      this.observer = new MutationObserver(function (mutations) {
        var shouldRebuildMap = false;
        var _iterator = _createForOfIteratorHelper(mutations),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;
            // Check if the mutation involves actionable elements
            if (mutation.type === 'childList') {
              for (var _i = 0, _Array$from = Array.from(mutation.addedNodes); _i < _Array$from.length; _i++) {
                var node = _Array$from[_i];
                if (node instanceof HTMLElement) {
                  if (node.hasAttribute('data-ai-field') || node.hasAttribute('data-ai-action') || node.querySelector('[data-ai-field], [data-ai-action]')) {
                    shouldRebuildMap = true;
                    break;
                  }
                }
              }
              for (var _i2 = 0, _Array$from2 = Array.from(mutation.removedNodes); _i2 < _Array$from2.length; _i2++) {
                var _node = _Array$from2[_i2];
                if (_node instanceof HTMLElement) {
                  if (_node.hasAttribute('data-ai-field') || _node.hasAttribute('data-ai-action') || _node.querySelector('[data-ai-field], [data-ai-action]')) {
                    shouldRebuildMap = true;
                    break;
                  }
                }
              }
            } else if (mutation.type === 'attributes') {
              var target = mutation.target;
              if (mutation.attributeName === 'data-ai-field' || mutation.attributeName === 'data-ai-action' || target.hasAttribute('data-ai-field') || target.hasAttribute('data-ai-action')) {
                shouldRebuildMap = true;
                break;
              }
            }
            if (shouldRebuildMap) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (shouldRebuildMap) {
          _this2.buildActionMap();
        }
      });
      // Start observing the entire document for changes
      this.observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-ai-field', 'data-ai-action', 'value', 'disabled']
      });
    }
  }]);
}();

var ActionExecutor = /*#__PURE__*/function () {
  function ActionExecutor(actionMap) {
    _classCallCheck(this, ActionExecutor);
    this.elementCache = new Map();
    this.actionMap = actionMap;
  }
  /**
   * Update the action map
   */
  return _createClass(ActionExecutor, [{
    key: "updateActionMap",
    value: function updateActionMap(actionMap) {
      this.actionMap = actionMap;
      // Clear the element cache when the action map is updated
      this.elementCache.clear();
    }
    /**
     * Check if an action requires navigation steps before execution
     * In simplified MVP, we don't use navigation steps
     */
  }, {
    key: "checkNavigationSteps",
    value: function checkNavigationSteps(actionName) {
      console.log("Simplified MVP: skipping navigation steps for action: ".concat(actionName));
      return null;
    }
    /**
     * Execute a sequence of actions
     * Simplified for MVP to directly execute actions without navigation steps
     */
  }, {
    key: "executeActions",
    value: (function () {
      var _executeActions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(actions) {
        var _iterator, _step, action;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              console.log("Executing ".concat(actions.length, " action(s):"));
              // Process each action
              _iterator = _createForOfIteratorHelper(actions);
              _context.prev = 3;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context.next = 20;
                break;
              }
              action = _step.value;
              console.log("Processing action: ".concat(action.type, " on element ").concat(action.elementId));
              _context.prev = 8;
              _context.next = 11;
              return this.executeAction(action);
            case 11:
              _context.next = 13;
              return this.delay(300);
            case 13:
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](8);
              console.error("Error executing action ".concat(action.elementId, ":"), _context.t0);
              // Continue with next action even if this one failed
            case 18:
              _context.next = 5;
              break;
            case 20:
              _context.next = 25;
              break;
            case 22:
              _context.prev = 22;
              _context.t1 = _context["catch"](3);
              _iterator.e(_context.t1);
            case 25:
              _context.prev = 25;
              _iterator.f();
              return _context.finish(25);
            case 28:
              return _context.abrupt("return", true);
            case 31:
              _context.prev = 31;
              _context.t2 = _context["catch"](0);
              console.error('Error executing actions:', _context.t2);
              return _context.abrupt("return", false);
            case 35:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 31], [3, 22, 25, 28], [8, 15]]);
      }));
      function executeActions(_x) {
        return _executeActions.apply(this, arguments);
      }
      return executeActions;
    }()
    /**
     * Execute a single action
     */
    )
  }, {
    key: "executeAction",
    value: (function () {
      var _executeAction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(action) {
        var element, actionName, actionElements;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              element = this.findElementById(action.elementId); // If the element is not found by ID, try to find by action name
              if (!element && action.elementId.includes('notific-action-')) {
                // Extract the action name from the ID
                actionName = action.elementId.replace('notific-action-', '');
                console.log("Element not found by ID, trying to find by action name: ".concat(actionName));
                // Try to find element by data-ai-action attribute
                actionElements = document.querySelectorAll("[data-ai-action=\"".concat(actionName, "\"]"));
                if (actionElements.length > 0) {
                  element = actionElements[0];
                  console.log("Found element by data-ai-action: ".concat(actionName));
                }
              }
              if (element) {
                _context2.next = 4;
                break;
              }
              throw new Error("Element with ID ".concat(action.elementId, " not found"));
            case 4:
              // Add a visual highlight effect to the element
              this.highlightElement(element);
              _context2.t0 = action.type;
              _context2.next = _context2.t0 === 'fill' ? 8 : _context2.t0 === 'click' ? 11 : _context2.t0 === 'select' ? 14 : _context2.t0 === 'scroll' ? 17 : _context2.t0 === 'custom' ? 20 : 23;
              break;
            case 8:
              _context2.next = 10;
              return this.fillField(element, action.value || '');
            case 10:
              return _context2.abrupt("break", 24);
            case 11:
              _context2.next = 13;
              return this.clickElement(element);
            case 13:
              return _context2.abrupt("break", 24);
            case 14:
              _context2.next = 16;
              return this.selectOption(element, action.value || '');
            case 16:
              return _context2.abrupt("break", 24);
            case 17:
              _context2.next = 19;
              return this.scrollToElement(element);
            case 19:
              return _context2.abrupt("break", 24);
            case 20:
              _context2.next = 22;
              return this.executeCustomAction(element, action.options);
            case 22:
              return _context2.abrupt("break", 24);
            case 23:
              throw new Error("Unknown action type: ".concat(action.type));
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function executeAction(_x2) {
        return _executeAction.apply(this, arguments);
      }
      return executeAction;
    }()
    /**
     * Find an element in the DOM by its ID
     * Simplified for MVP to use direct ID lookup and data-ai-* attributes
     */
    )
  }, {
    key: "findElementById",
    value: function findElementById(id) {
      // First check the cache
      if (this.elementCache.has(id)) {
        return this.elementCache.get(id) || null;
      }
      // Find the element description in the action map
      this.actionMap.elements.find(function (el) {
        return el.id === id;
      });
      // Try to find the element directly by ID
      var element = document.getElementById(id);
      // If element not found and it's an action, try using data-ai-action attribute
      if (!element && id.startsWith('notific-action-')) {
        var actionName = id.replace('notific-action-', '').split('-')[0]; // Get the base action name
        var actionElements = document.querySelectorAll("[data-ai-action=\"".concat(actionName, "\"]"));
        if (actionElements.length > 0) {
          element = actionElements[0];
          console.log("Found element by data-ai-action: ".concat(actionName));
        }
      }
      // If element not found and it's a field, try using data-ai-field attribute
      if (!element && id.startsWith('notific-field-')) {
        // Handle IDs with random suffixes like notific-field-supportTeamMembers-70mstn
        var fieldName = '';
        var parts = id.split('-');
        if (parts.length >= 3) {
          if (parts.length > 3) {
            // For IDs with random suffixes, extract the actual field name
            // If it has multiple parts like supportTeamMembers-value, join them
            if (parts.length > 4) {
              fieldName = parts.slice(2, -1).join('-');
            } else {
              fieldName = parts[2]; // Simple case like notific-field-supportTeamMembers-abc123
            }
          } else {
            fieldName = parts[2]; // Simple case like notific-field-supportTeamMembers
          }
        }
        console.log("Trying to find field by data-ai-field: ".concat(fieldName));
        // Try to find the element by the extracted field name
        var fieldElements = document.querySelectorAll("[data-ai-field=\"".concat(fieldName, "\"]"));
        if (fieldElements.length > 0) {
          element = fieldElements[0];
          console.log("Found element by data-ai-field: ".concat(fieldName));
        } else if (fieldName.includes('-')) {
          // If the field name has hyphens and we didn't find it, try with just the first part
          var simplifiedFieldName = fieldName.split('-')[0];
          var simplifiedElements = document.querySelectorAll("[data-ai-field=\"".concat(simplifiedFieldName, "\"]"));
          if (simplifiedElements.length > 0) {
            element = simplifiedElements[0];
            console.log("Found element by simplified data-ai-field: ".concat(simplifiedFieldName));
          } else {
            // Last resort - try finding by partial match
            var allFields = document.querySelectorAll('[data-ai-field]');
            for (var _i = 0, _Array$from = Array.from(allFields); _i < _Array$from.length; _i++) {
              var el = _Array$from[_i];
              var currentField = el.getAttribute('data-ai-field');
              if (currentField && (fieldName.startsWith(currentField) || currentField.startsWith(fieldName))) {
                element = el;
                console.log("Found element by partial field match: ".concat(currentField));
                break;
              }
            }
          }
        }
      }
      // Cache the element for future use
      if (element) {
        this.elementCache.set(id, element);
      }
      return element;
    }
    /**
     * Add a visual highlight effect to an element
     */
  }, {
    key: "highlightElement",
    value: function highlightElement(element) {
      var originalOutline = element.style.outline;
      var originalTransition = element.style.transition;
      element.style.outline = '2px solid #0088ff';
      element.style.transition = 'outline 0.2s ease-in-out';
      setTimeout(function () {
        element.style.outline = originalOutline;
        element.style.transition = originalTransition;
      }, 1000);
    }
    /**
     * Fill an input field with the given value
     */
  }, {
    key: "fillField",
    value: (function () {
      var _fillField = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(element, value) {
        var i, _char, inputEvent, changeEvent;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
                _context3.next = 19;
                break;
              }
              // Clear the current value
              element.value = '';
              // Focus the element
              element.focus();
              // Simulate typing character by character for visual effect
              i = 0;
            case 4:
              if (!(i < value.length)) {
                _context3.next = 14;
                break;
              }
              _char = value.charAt(i);
              element.value += _char;
              // Dispatch input event
              inputEvent = new Event('input', {
                bubbles: true
              });
              element.dispatchEvent(inputEvent);
              // Add a small delay between characters to simulate typing
              _context3.next = 11;
              return this.delay(50);
            case 11:
              i++;
              _context3.next = 4;
              break;
            case 14:
              // Dispatch change event
              changeEvent = new Event('change', {
                bubbles: true
              });
              element.dispatchEvent(changeEvent);
              // Blur the element
              element.blur();
              _context3.next = 20;
              break;
            case 19:
              throw new Error('Element is not an input field');
            case 20:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function fillField(_x3, _x4) {
        return _fillField.apply(this, arguments);
      }
      return fillField;
    }()
    /**
     * Click an element
     */
    )
  }, {
    key: "clickElement",
    value: (function () {
      var _clickElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(element) {
        var mousedownEvent, mouseupEvent, clickEvent;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.scrollToElement(element);
            case 2:
              // Simulate a mousedown event
              mousedownEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              element.dispatchEvent(mousedownEvent);
              // Small delay between events
              _context4.next = 6;
              return this.delay(50);
            case 6:
              // Simulate a mouseup event
              mouseupEvent = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              element.dispatchEvent(mouseupEvent);
              // Simulate a click event
              clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              element.dispatchEvent(clickEvent);
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function clickElement(_x5) {
        return _clickElement.apply(this, arguments);
      }
      return clickElement;
    }()
    /**
     * Select an option in a dropdown
     */
    )
  }, {
    key: "selectOption",
    value: (function () {
      var _selectOption = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(element, value) {
        var optionFound, _i2, _Array$from2, option, changeEvent;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(element instanceof HTMLSelectElement)) {
                _context5.next = 18;
                break;
              }
              // Try to find the option with the given value or text
              optionFound = false;
              _i2 = 0, _Array$from2 = Array.from(element.options);
            case 3:
              if (!(_i2 < _Array$from2.length)) {
                _context5.next = 12;
                break;
              }
              option = _Array$from2[_i2];
              if (!(option.value === value || option.text === value)) {
                _context5.next = 9;
                break;
              }
              element.value = option.value;
              optionFound = true;
              return _context5.abrupt("break", 12);
            case 9:
              _i2++;
              _context5.next = 3;
              break;
            case 12:
              if (optionFound) {
                _context5.next = 14;
                break;
              }
              throw new Error("Option with value or text \"".concat(value, "\" not found in select element"));
            case 14:
              // Dispatch change event
              changeEvent = new Event('change', {
                bubbles: true
              });
              element.dispatchEvent(changeEvent);
              _context5.next = 19;
              break;
            case 18:
              throw new Error('Element is not a select element');
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function selectOption(_x6, _x7) {
        return _selectOption.apply(this, arguments);
      }
      return selectOption;
    }()
    /**
     * Scroll to make an element visible
     */
    )
  }, {
    key: "scrollToElement",
    value: (function () {
      var _scrollToElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(element) {
        var rect, isInViewport;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              rect = element.getBoundingClientRect();
              isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
              if (isInViewport) {
                _context6.next = 6;
                break;
              }
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
              // Wait for the scroll to complete
              _context6.next = 6;
              return this.delay(500);
            case 6:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function scrollToElement(_x8) {
        return _scrollToElement.apply(this, arguments);
      }
      return scrollToElement;
    }()
    /**
     * Execute a custom action
     */
    )
  }, {
    key: "executeCustomAction",
    value: (function () {
      var _executeCustomAction = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(element, options) {
        var hoverEvent, inputEvent, changeEvent;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(options && options.type)) {
                _context7.next = 14;
                break;
              }
              _context7.t0 = options.type;
              _context7.next = _context7.t0 === 'hover' ? 4 : _context7.t0 === 'focus' ? 7 : _context7.t0 === 'blur' ? 9 : _context7.t0 === 'setValue' ? 11 : 13;
              break;
            case 4:
              hoverEvent = new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              element.dispatchEvent(hoverEvent);
              return _context7.abrupt("break", 14);
            case 7:
              element.focus();
              return _context7.abrupt("break", 14);
            case 9:
              element.blur();
              return _context7.abrupt("break", 14);
            case 11:
              if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.value = options.value || '';
                inputEvent = new Event('input', {
                  bubbles: true
                });
                element.dispatchEvent(inputEvent);
                changeEvent = new Event('change', {
                  bubbles: true
                });
                element.dispatchEvent(changeEvent);
              }
              return _context7.abrupt("break", 14);
            case 13:
              throw new Error("Unknown custom action type: ".concat(options.type));
            case 14:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function executeCustomAction(_x9, _x10) {
        return _executeCustomAction.apply(this, arguments);
      }
      return executeCustomAction;
    }()
    /**
     * Create a promise that resolves after a delay
     */
    )
  }, {
    key: "delay",
    value: function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }
  }]);
}();

var ApiClient = /*#__PURE__*/function () {
  function ApiClient(apiKey) {
    var endpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://api.notific.ai/v1';
    _classCallCheck(this, ApiClient);
    this.sessionId = null;
    this.apiKey = apiKey;
    // Remove trailing slash to avoid double slashes in URL paths
    this.endpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  }
  /**
   * Send a user message and action map to the API
   */
  return _createClass(ApiClient, [{
    key: "sendMessage",
    value: (function () {
      var _sendMessage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(message, actionMap) {
        var pageContext,
          url,
          request,
          response,
          data,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              pageContext = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              url = "".concat(this.endpoint, "/api/interactive/process");
              request = _objectSpread2(_objectSpread2({
                message: message,
                actionMap: actionMap
              }, this.sessionId ? {
                sessionId: this.sessionId
              } : {}), {}, {
                pageContext: pageContext
              });
              _context.prev = 3;
              _context.next = 6;
              return fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(this.apiKey)
                  // Removing X-Notific-SDK-Version header to avoid CORS issues
                },
                body: JSON.stringify(request),
                mode: 'cors',
                credentials: 'include'
              });
            case 6:
              response = _context.sent;
              if (response.ok) {
                _context.next = 9;
                break;
              }
              throw new Error("API request failed with status ".concat(response.status));
            case 9:
              _context.next = 11;
              return response.json();
            case 11:
              data = _context.sent;
              // Store the session ID for future requests
              if (data.sessionId) {
                this.sessionId = data.sessionId;
              }
              return _context.abrupt("return", data);
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](3);
              console.error('Error sending message to API:', _context.t0);
              // Return a fallback response
              return _context.abrupt("return", {
                response: {
                  actions: [],
                  message: {
                    id: "error-".concat(Date.now()),
                    role: 'assistant',
                    content: 'Sorry, I encountered an error processing your request. Please try again later.',
                    timestamp: Date.now()
                  }
                },
                sessionId: this.sessionId || "fallback-".concat(Date.now())
              });
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 16]]);
      }));
      function sendMessage(_x, _x2) {
        return _sendMessage.apply(this, arguments);
      }
      return sendMessage;
    }()
    /**
     * Send feedback about an interaction
     */
    )
  }, {
    key: "sendFeedback",
    value: (function () {
      var _sendFeedback = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(messageId, feedback, comment) {
        var url, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.sessionId) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", false);
            case 2:
              url = "".concat(this.endpoint, "/api/interactive/feedback");
              _context2.prev = 3;
              _context2.next = 6;
              return fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(this.apiKey)
                  // Removing X-Notific-SDK-Version header to avoid CORS issues
                },
                body: JSON.stringify({
                  sessionId: this.sessionId,
                  messageId: messageId,
                  feedback: feedback,
                  comment: comment
                }),
                mode: 'cors',
                credentials: 'include'
              });
            case 6:
              response = _context2.sent;
              return _context2.abrupt("return", response.ok);
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](3);
              console.error('Error sending feedback:', _context2.t0);
              return _context2.abrupt("return", false);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[3, 10]]);
      }));
      function sendFeedback(_x3, _x4, _x5) {
        return _sendFeedback.apply(this, arguments);
      }
      return sendFeedback;
    }()
    /**
     * Get the conversation history
     */
    )
  }, {
    key: "getConversationHistory",
    value: (function () {
      var _getConversationHistory = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var url, response, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (this.sessionId) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", []);
            case 2:
              url = "".concat(this.endpoint, "/api/interactive/conversation/").concat(this.sessionId);
              _context3.prev = 3;
              _context3.next = 6;
              return fetch(url, {
                method: 'GET',
                headers: {
                  'Authorization': "Bearer ".concat(this.apiKey)
                  // Removing X-Notific-SDK-Version header to avoid CORS issues
                },
                mode: 'cors',
                credentials: 'include'
              });
            case 6:
              response = _context3.sent;
              if (response.ok) {
                _context3.next = 9;
                break;
              }
              throw new Error("API request failed with status ".concat(response.status));
            case 9:
              _context3.next = 11;
              return response.json();
            case 11:
              data = _context3.sent;
              return _context3.abrupt("return", data.messages || []);
            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](3);
              console.error('Error fetching conversation history:', _context3.t0);
              return _context3.abrupt("return", []);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[3, 15]]);
      }));
      function getConversationHistory() {
        return _getConversationHistory.apply(this, arguments);
      }
      return getConversationHistory;
    }())
  }]);
}();

var ChatWidget = /*#__PURE__*/function () {
  function ChatWidget(onSendMessage) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      position: 'right'
    };
    _classCallCheck(this, ChatWidget);
    this.container = null;
    this.messageList = null;
    this.inputField = null;
    this.isOpen = false;
    this.onSendMessage = onSendMessage;
    this.options = this.mergeWithDefaultOptions(options);
  }
  /**
   * Initialize the chat widget
   */
  return _createClass(ChatWidget, [{
    key: "init",
    value: function init() {
      this.createWidgetDOM();
      this.attachEventListeners();
    }
    /**
     * Show the chat widget
     */
  }, {
    key: "show",
    value: function show() {
      var _this = this;
      if (this.container) {
        this.container.style.display = 'block';
        setTimeout(function () {
          if (_this.container) {
            _this.container.classList.add('notific-widget-visible');
          }
        }, 10);
        this.isOpen = true;
      }
    }
    /**
     * Hide the chat widget
     */
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;
      if (this.container) {
        this.container.classList.remove('notific-widget-visible');
        setTimeout(function () {
          if (_this2.container) {
            _this2.container.style.display = 'none';
          }
        }, 300);
        this.isOpen = false;
      }
    }
    /**
     * Toggle the chat widget visibility
     */
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    }
    /**
     * Add a new message to the chat
     */
  }, {
    key: "addMessage",
    value: function addMessage(message) {
      if (!this.messageList) return;
      var messageElement = document.createElement('div');
      messageElement.className = "notific-message notific-message-".concat(message.role);
      messageElement.setAttribute('data-message-id', message.id);
      var contentElement = document.createElement('div');
      contentElement.className = 'notific-message-content';
      contentElement.textContent = message.content;
      messageElement.appendChild(contentElement);
      this.messageList.appendChild(messageElement);
      // Scroll to the bottom
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }
    /**
     * Update the messages in the chat
     */
  }, {
    key: "updateMessages",
    value: function updateMessages(messages) {
      if (!this.messageList) return;
      // Clear existing messages
      this.messageList.innerHTML = '';
      // Add all messages
      var _iterator = _createForOfIteratorHelper(messages),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var message = _step.value;
          this.addMessage(message);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Destroy the chat widget
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      // Remove the style element if it exists
      var styleElement = document.getElementById('notific-chat-widget-styles');
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    }
    /**
     * Create the widget DOM structure
     */
  }, {
    key: "createWidgetDOM",
    value: function createWidgetDOM() {
      // Add styles
      this.addStyles();
      // Create container
      this.container = document.createElement('div');
      this.container.className = 'notific-chat-widget';
      this.container.classList.add("notific-position-".concat(this.options.position));
      // Create toggle button
      var toggleButton = document.createElement('button');
      toggleButton.className = 'notific-toggle-button';
      toggleButton.setAttribute('aria-label', 'Toggle chat assistant');
      toggleButton.innerHTML = "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>\n      </svg>\n    ";
      // Create chat container
      var chatContainer = document.createElement('div');
      chatContainer.className = 'notific-chat-container';
      // Create chat header
      var chatHeader = document.createElement('div');
      chatHeader.className = 'notific-chat-header';
      var headerTitle = document.createElement('div');
      headerTitle.className = 'notific-header-title';
      headerTitle.textContent = 'AI Assistant';
      var closeButton = document.createElement('button');
      closeButton.className = 'notific-close-button';
      closeButton.setAttribute('aria-label', 'Close chat');
      closeButton.innerHTML = '&times;';
      chatHeader.appendChild(headerTitle);
      chatHeader.appendChild(closeButton);
      // Create message list
      this.messageList = document.createElement('div');
      this.messageList.className = 'notific-message-list';
      // Create input area
      var inputArea = document.createElement('div');
      inputArea.className = 'notific-input-area';
      this.inputField = document.createElement('textarea');
      this.inputField.className = 'notific-input-field';
      this.inputField.placeholder = this.options.placeholder || 'Type your message...';
      this.inputField.rows = 1;
      var sendButton = document.createElement('button');
      sendButton.className = 'notific-send-button';
      sendButton.setAttribute('aria-label', 'Send message');
      sendButton.innerHTML = "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line>\n        <polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon>\n      </svg>\n    ";
      inputArea.appendChild(this.inputField);
      inputArea.appendChild(sendButton);
      // Assemble components
      chatContainer.appendChild(chatHeader);
      chatContainer.appendChild(this.messageList);
      chatContainer.appendChild(inputArea);
      this.container.appendChild(toggleButton);
      this.container.appendChild(chatContainer);
      // Add to DOM
      document.body.appendChild(this.container);
      // Add system greeting if provided
      if (this.options.greeting) {
        this.addMessage({
          id: 'greeting',
          role: 'system',
          content: this.options.greeting,
          timestamp: Date.now()
        });
      }
    }
    /**
     * Add the widget styles to the document
     */
  }, {
    key: "addStyles",
    value: function addStyles() {
      var _ref = this.options.theme || {},
        _ref$primaryColor = _ref.primaryColor,
        primaryColor = _ref$primaryColor === void 0 ? '#0088ff' : _ref$primaryColor,
        _ref$textColor = _ref.textColor,
        textColor = _ref$textColor === void 0 ? '#333' : _ref$textColor,
        _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === void 0 ? 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' : _ref$fontFamily;
      var styles = "\n      .notific-chat-widget {\n        position: fixed;\n        bottom: 20px;\n        z-index: 9999;\n        display: none;\n        font-family: ".concat(fontFamily, ";\n        transition: opacity 0.3s, transform 0.3s;\n        opacity: 0;\n        transform: translateY(20px);\n      }\n\n      .notific-widget-visible {\n        opacity: 1;\n        transform: translateY(0);\n      }\n\n      .notific-position-right {\n        right: 20px;\n      }\n\n      .notific-position-left {\n        left: 20px;\n      }\n\n      .notific-toggle-button {\n        position: absolute;\n        bottom: 0;\n        right: 0;\n        width: 50px;\n        height: 50px;\n        border-radius: 50%;\n        background-color: ").concat(primaryColor, ";\n        color: white;\n        border: none;\n        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 2;\n      }\n\n      .notific-chat-container {\n        position: absolute;\n        bottom: 70px;\n        right: 0;\n        width: 320px;\n        height: 400px;\n        border-radius: 12px;\n        background-color: white;\n        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);\n        display: flex;\n        flex-direction: column;\n        overflow: hidden;\n      }\n\n      .notific-position-left .notific-chat-container {\n        right: auto;\n        left: 0;\n      }\n\n      .notific-chat-header {\n        padding: 12px 16px;\n        background-color: ").concat(primaryColor, ";\n        color: white;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n      }\n\n      .notific-header-title {\n        font-weight: bold;\n      }\n\n      .notific-close-button {\n        background: none;\n        border: none;\n        color: white;\n        font-size: 24px;\n        cursor: pointer;\n        padding: 0;\n        line-height: 1;\n      }\n\n      .notific-message-list {\n        flex: 1;\n        overflow-y: auto;\n        padding: 16px;\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      }\n\n      .notific-message {\n        max-width: 80%;\n        padding: 10px 14px;\n        border-radius: 16px;\n        position: relative;\n        word-wrap: break-word;\n      }\n\n      .notific-message-user {\n        align-self: flex-end;\n        background-color: ").concat(primaryColor, ";\n        color: white;\n        border-bottom-right-radius: 4px;\n      }\n\n      .notific-message-assistant {\n        align-self: flex-start;\n        background-color: #f0f0f0;\n        color: ").concat(textColor, ";\n        border-bottom-left-radius: 4px;\n      }\n\n      .notific-message-system {\n        align-self: center;\n        background-color: #f8f8f8;\n        color: #666;\n        border-radius: 8px;\n        font-style: italic;\n        max-width: 90%;\n      }\n\n      .notific-input-area {\n        padding: 12px;\n        border-top: 1px solid #eee;\n        display: flex;\n        align-items: center;\n        gap: 10px;\n      }\n\n      .notific-input-field {\n        flex: 1;\n        resize: none;\n        height: 40px;\n        max-height: 120px;\n        padding: 10px 14px;\n        border: 1px solid #ddd;\n        border-radius: 20px;\n        font-family: inherit;\n        font-size: 14px;\n        outline: none;\n      }\n\n      .notific-input-field:focus {\n        border-color: ").concat(primaryColor, ";\n      }\n\n      .notific-send-button {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        background-color: ").concat(primaryColor, ";\n        color: white;\n        border: none;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .notific-send-button:disabled {\n        background-color: #ccc;\n        cursor: not-allowed;\n      }\n\n      @media (max-width: 480px) {\n        .notific-chat-container {\n          width: 280px;\n          height: 350px;\n        }\n      }\n    ");
      // Add custom CSS if provided
      var customCSS = this.options.customCSS || '';
      var combinedStyles = styles + customCSS;
      var styleElement = document.createElement('style');
      styleElement.id = 'notific-chat-widget-styles';
      styleElement.textContent = combinedStyles;
      document.head.appendChild(styleElement);
    }
    /**
     * Attach event listeners to the widget elements
     */
  }, {
    key: "attachEventListeners",
    value: function attachEventListeners() {
      var _this3 = this;
      if (!this.container) return;
      // Toggle button click
      var toggleButton = this.container.querySelector('.notific-toggle-button');
      if (toggleButton) {
        toggleButton.addEventListener('click', function () {
          return _this3.toggle();
        });
      }
      // Close button click
      var closeButton = this.container.querySelector('.notific-close-button');
      if (closeButton) {
        closeButton.addEventListener('click', function () {
          return _this3.hide();
        });
      }
      // Send button click
      var sendButton = this.container.querySelector('.notific-send-button');
      if (sendButton && this.inputField) {
        sendButton.addEventListener('click', function () {
          return _this3.handleSendMessage();
        });
      }
      // Input field keypress
      if (this.inputField) {
        this.inputField.addEventListener('keypress', function (e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            _this3.handleSendMessage();
          }
        });
        // Auto-resize the input field
        this.inputField.addEventListener('input', function () {
          _this3.inputField.style.height = 'auto';
          _this3.inputField.style.height = Math.min(_this3.inputField.scrollHeight, 120) + 'px';
        });
      }
    }
    /**
     * Handle sending a message
     */
  }, {
    key: "handleSendMessage",
    value: function handleSendMessage() {
      if (!this.inputField) return;
      var message = this.inputField.value.trim();
      if (!message) return;
      // Clear the input field
      this.inputField.value = '';
      this.inputField.style.height = 'auto';
      // Add the message to the UI
      this.addMessage({
        id: "user-".concat(Date.now()),
        role: 'user',
        content: message,
        timestamp: Date.now()
      });
      // Call the onSendMessage callback
      this.onSendMessage(message);
    }
    /**
     * Merge provided options with default options
     */
  }, {
    key: "mergeWithDefaultOptions",
    value: function mergeWithDefaultOptions(options) {
      var _a, _b, _c;
      return {
        position: options.position || 'right',
        theme: {
          primaryColor: ((_a = options.theme) === null || _a === void 0 ? void 0 : _a.primaryColor) || '#0088ff',
          textColor: ((_b = options.theme) === null || _b === void 0 ? void 0 : _b.textColor) || '#333',
          fontFamily: ((_c = options.theme) === null || _c === void 0 ? void 0 : _c.fontFamily) || 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
        },
        placeholder: options.placeholder || 'Type your message...',
        greeting: options.greeting || 'Hello! How can I help you today?',
        customCSS: options.customCSS || ''
      };
    }
  }]);
}();

/**
 * Generate a unique ID
 */
function generateId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'notific';
  return "".concat(prefix, "-").concat(Date.now(), "-").concat(Math.random().toString(36).substring(2, 9));
}
/**
 * Get the page context information
 */
function getPageContext() {
  return {
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    referrer: document.referrer || window.location.origin,
    // Provide a fallback value
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    timestamp: Date.now()
  };
}
/**
 * Log a message to the console if debug mode is enabled
 */
function debugLog(enabled, message) {
  if (enabled) {
    var _console;
    for (var _len2 = arguments.length, data = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      data[_key2 - 2] = arguments[_key2];
    }
    (_console = console).log.apply(_console, ["[NotificAI] ".concat(message)].concat(data));
  }
}

var NotificAIClass = /*#__PURE__*/function () {
  function NotificAIClass(config) {
    _classCallCheck(this, NotificAIClass);
    this.actionMapBuilder = null;
    this.actionExecutor = null;
    this.apiClient = null;
    this.chatWidget = null;
    this.messages = [];
    this.initialized = false;
    this.config = _objectSpread2({
      apiKey: '',
      endpoint: 'https://api.notific.ai/v1',
      debug: false,
      chatWidget: {
        enable: true,
        position: 'right'
      }
    }, config);
    // Store instance reference
    NotificAIClass._instance = this;
  }
  /**
   * Initialize the SDK
   */
  return _createClass(NotificAIClass, [{
    key: "init",
    value: function init(config) {
      var _this = this;
      var _a;
      if (this.initialized) {
        debugLog(this.config.debug || false, 'SDK already initialized');
        return this;
      }
      // Update config if provided
      if (config) {
        this.config = _objectSpread2(_objectSpread2({}, this.config), config);
      }
      // Validate API key
      if (!this.config.apiKey) {
        throw new Error('API key is required');
      }
      debugLog(this.config.debug || false, 'Initializing SDK', this.config);
      // Initialize core components
      this.actionMapBuilder = new ActionMapBuilder();
      this.actionMapBuilder.init();
      var actionMap = this.actionMapBuilder.getActionMap();
      this.actionExecutor = new ActionExecutor(actionMap);
      this.apiClient = new ApiClient(this.config.apiKey, this.config.endpoint);
      // Initialize chat widget if enabled
      if ((_a = this.config.chatWidget) === null || _a === void 0 ? void 0 : _a.enable) {
        var chatOptions = {
          position: this.config.chatWidget.position || 'right',
          customCSS: this.config.chatWidget.customCSS
        };
        this.chatWidget = new ChatWidget(function (message) {
          return _this.handleUserMessage(message);
        }, chatOptions);
        this.chatWidget.init();
      }
      this.initialized = true;
      return this;
    }
    /**
     * Show the chat widget
     */
  }, {
    key: "show",
    value: function show() {
      if (!this.initialized) {
        this.init();
      }
      if (this.chatWidget) {
        this.chatWidget.show();
      }
    }
    /**
     * Hide the chat widget
     */
  }, {
    key: "hide",
    value: function hide() {
      if (this.chatWidget) {
        this.chatWidget.hide();
      }
    }
    /**
     * Destroy the SDK instance
     */
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.actionMapBuilder) {
        this.actionMapBuilder.destroy();
        this.actionMapBuilder = null;
      }
      if (this.chatWidget) {
        this.chatWidget.destroy();
        this.chatWidget = null;
      }
      this.actionExecutor = null;
      this.apiClient = null;
      this.messages = [];
      this.initialized = false;
      debugLog(this.config.debug || false, 'SDK destroyed');
    }
    /**
     * Send a user message programmatically
     * @returns The response from the API
     */
  }, {
    key: "sendMessage",
    value: (function () {
      var _sendMessage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(message) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.initialized) {
                this.init();
              }
              _context.next = 3;
              return this.handleUserMessage(message);
            case 3:
              return _context.abrupt("return", _context.sent);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function sendMessage(_x) {
        return _sendMessage.apply(this, arguments);
      }
      return sendMessage;
    }()
    /**
     * Handle a user message
     * @returns The response from the API
     */
    )
  }, {
    key: "handleUserMessage",
    value: (function () {
      var _handleUserMessage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(message) {
        var userMessage, loadingMessage, actionMap, pageContext, response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!this.actionMapBuilder || !this.actionExecutor || !this.apiClient)) {
                _context2.next = 2;
                break;
              }
              throw new Error('SDK not initialized properly');
            case 2:
              // Add user message to messages array
              userMessage = {
                id: generateId('user'),
                role: 'user',
                content: message,
                timestamp: Date.now()
              };
              this.messages.push(userMessage);
              // Add a loading message
              loadingMessage = {
                id: generateId('loading'),
                role: 'assistant',
                content: '...',
                timestamp: Date.now()
              };
              this.messages.push(loadingMessage);
              // Update the chat widget if available
              if (this.chatWidget) {
                this.chatWidget.updateMessages(this.messages);
              }
              _context2.prev = 7;
              // Get the latest action map
              actionMap = this.actionMapBuilder.getActionMap(); // Update the action executor with the latest action map
              this.actionExecutor.updateActionMap(actionMap);
              // Get page context
              pageContext = getPageContext(); // Send the message to the API
              _context2.next = 13;
              return this.apiClient.sendMessage(message, actionMap, pageContext);
            case 13:
              response = _context2.sent;
              // Remove the loading message
              this.messages = this.messages.filter(function (msg) {
                return msg.id !== loadingMessage.id;
              });
              // Add the assistant message if available
              if (response.response && response.response.message) {
                this.messages.push(response.response.message);
              }
              // Update the chat widget if available
              if (this.chatWidget) {
                this.chatWidget.updateMessages(this.messages);
              }
              // Execute actions if available
              if (response.response && response.response.actions && response.response.actions.length > 0) {
                debugLog(this.config.debug || false, 'Executing actions', response.response.actions);
                this.actionExecutor.executeActions(response.response.actions);
              }
              // Return the response
              return _context2.abrupt("return", response);
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](7);
              // Remove the loading message
              this.messages = this.messages.filter(function (msg) {
                return msg.id !== loadingMessage.id;
              });
              // Add an error message
              errorMessage = {
                id: generateId('error'),
                role: 'system',
                content: 'Sorry, there was an error processing your request.',
                timestamp: Date.now()
              };
              this.messages.push(errorMessage);
              // Update the chat widget if available
              if (this.chatWidget) {
                this.chatWidget.updateMessages(this.messages);
              }
              console.error('Error handling user message:', _context2.t0);
              // Rethrow the error
              throw _context2.t0;
            case 29:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[7, 21]]);
      }));
      function handleUserMessage(_x2) {
        return _handleUserMessage.apply(this, arguments);
      }
      return handleUserMessage;
    }()
    /**
     * Get the current messages
     */
    )
  }, {
    key: "getMessages",
    value: function getMessages() {
      return this.messages;
    }
    /**
     * Get the current action map
     */
  }, {
    key: "getActionMap",
    value: function getActionMap() {
      if (!this.actionMapBuilder) {
        return null;
      }
      return this.actionMapBuilder.getActionMap();
    }
  }]);
}(); // Make instance publicly accessible for debug purposes
NotificAIClass._instance = null;
// Auto-initialize if data-api-key attribute is present
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var scriptTag = document.querySelector('script[data-api-key]');
    if (scriptTag) {
      var apiKey = scriptTag.getAttribute('data-api-key');
      if (apiKey) {
        var position = scriptTag.getAttribute('data-position');
        var debug = scriptTag.hasAttribute('data-debug');
        var notific = new NotificAIClass({
          apiKey: apiKey,
          debug: debug,
          chatWidget: {
            enable: true,
            position: position || 'right'
          }
        });
        notific.init();
        // Make the instance available globally
        window.NotificAI = notific;
      }
    }
  });
}
// Create a named export for ESM imports
var NotificAI = NotificAIClass;

exports.NotificAI = NotificAI;
exports["default"] = NotificAIClass;
//# sourceMappingURL=notific-ai-sdk.cjs.js.map
