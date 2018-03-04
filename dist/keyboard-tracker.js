'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardTracker = function () {
  function KeyboardTracker(handler, options) {
    var _this = this;

    _classCallCheck(this, KeyboardTracker);

    this.handler = handler || null;

    var defaults = { persistence: false, history: false, scope: window };
    options = _extends({}, defaults, options);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        this[key] = options[key];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.keys = {};

    if (this.persistence === true) {
      this.keys = this.loadState() || {};
    }

    this.scope.addEventListener('keydown', function (e) {
      return _this.logEvent(e, true);
    });
    this.scope.addEventListener('keyup', function (e) {
      return _this.logEvent(e, false);
    });
  }

  _createClass(KeyboardTracker, [{
    key: 'saveState',
    value: function saveState() {
      localStorage.setItem('keyboard-tracker', JSON.stringify(this.keys));
    }
  }, {
    key: 'loadState',
    value: function loadState() {
      return JSON.parse(localStorage.getItem('keyboard-tracker'));
    }
  }, {
    key: 'key',
    value: function key(_key) {
      return this.keys[_key] || null;
    }
  }, {
    key: 'keyExists',
    value: function keyExists(key) {
      return this.key(key) !== null;
    }
  }, {
    key: 'createKey',
    value: function createKey(key, pressed) {
      this.keys[key] = {
        key: key,
        pressed: null,
        total: 0,
        latest: Date.now(),
        history: []
      };
    }
  }, {
    key: 'saveKeyPress',
    value: function saveKeyPress(key, pressed) {
      var timestamp = Date.now();

      if (pressed === true) {
        this.keys[key].total++;
        this.keys[key].latest = timestamp;
      }

      if (this.history === true) {
        var entry = { timestamp: timestamp };

        if (pressed === true) {
          entry.state = 'down';
        } else {
          entry.state = 'up';
          entry.duration = timestamp - this.key(key).history[this.key(key).history.length - 1].timestamp;
        }

        this.keys[key].history.push(entry);
      }

      this.keys[key].pressed = pressed;
    }
  }, {
    key: 'logEvent',
    value: function logEvent(e, pressed) {
      var key = e.key;


      if (!this.keyExists(key)) {
        this.createKey(key);
      }

      if (this.key(key).pressed !== pressed) {
        this.saveKeyPress(key, pressed);

        if (this.persistence === true) {
          this.saveState();
        }

        if (this.handler !== null) {
          if (typeof this.handler === 'function') {
            this.handler(this.key(key));
          } else if (this.handler[key] !== undefined) {
            this.handler[key](this.key(key));
          } else if (this.handler.default !== undefined) {
            this.handler.default(this.key(key));
          }
        }
      }
    }
  }]);

  return KeyboardTracker;
}();