'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardTracker = function () {
  function KeyboardTracker() {
    var _this = this;

    var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { persistence: false, history: false };

    _classCallCheck(this, KeyboardTracker);

    this.handler = handler;

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

    window.addEventListener('keydown', function (e) {
      return _this.logEvent(e, true);
    });
    window.addEventListener('keyup', function (e) {
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
        var state = pressed === true ? 'down' : 'up';

        this.keys[key].history.push({ state: state, timestamp: timestamp });
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
          this.handler(this.key(key));
        }
      }
    }
  }]);

  return KeyboardTracker;
}();