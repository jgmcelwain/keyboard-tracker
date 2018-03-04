class KeyboardTracker {
  constructor (handler, options) {	
    this.handler = handler || null
	
    const defaults = { persistence: false, history: false, scope: window }
    options = { ...defaults, ...options }

    for (let key of Object.keys(options)) {
      this[key] = options[key]
    }

    this.keys = {}

    if (this.persistence === true) {
      this.keys = this.loadState() || {}
    }

    this.scope.addEventListener('keydown', e => this.logEvent(e, true))
    this.scope.addEventListener('keyup', e => this.logEvent(e, false))
  }

  saveState () {
    localStorage.setItem('keyboard-tracker', JSON.stringify(this.keys))
  }

  loadState () {
    return JSON.parse(localStorage.getItem('keyboard-tracker'))
  }
	
  key (key) {
    return this.keys[key] || null
  }

  keyExists (key) {
    return this.key(key) !== null
  }

  createKey (key, pressed) {
    this.keys[key] = {
      key,
      pressed: null,
      total: 0,
      latest: Date.now(),
      history: []
    }
  }

  saveKeyPress (key, pressed) {
    const timestamp = Date.now()

    if (pressed === true) {
      this.keys[key].total++
      this.keys[key].latest = timestamp
    }

    if (this.history === true) {
      const entry = { timestamp }

      if (pressed === true) {
        entry.state = 'down'
      }
      else {
        entry.state = 'up'
        entry.duration = timestamp - this.key(key).history[this.key(key).history.length - 1].timestamp
      }

      this.keys[key].history.push(entry)
    }

    this.keys[key].pressed = pressed
  }

  logEvent (e, pressed) {
    const { key } = e

    if (!this.keyExists(key)) {
      this.createKey(key)
    }

    if (this.key(key).pressed !== pressed) {
      this.saveKeyPress(key, pressed)


      if (this.persistence === true) {
        this.saveState()
      }

      if (this.handler !== null) {
        if (typeof this.handler === 'function') {
          this.handler(this.key(key))
        }
        else if (this.handler[key] !== undefined) {
          this.handler[key](this.key(key))
        }
        else if (this.handler.default !== undefined) {
          this.handler.default(this.key(key))
        }
      }
    }
  }
}
