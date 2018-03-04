class KeyboardTracker {
  constructor (options = { persistence: false, history: false, handler: null }) {
    for (let key of Object.keys(options)) {
      this[key] = options[key]
    }

    this.keys = {}

    if (this.persistence === true) {
      this.keys = this.loadState() || {}
    }

    window.addEventListener('keydown', e => this.logEvent(e, true))
    window.addEventListener('keyup', e => this.logEvent(e, false))
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
      pressCount: 0,
      lastPressed: Date.now(),
      history: []
    }
  }

  saveKeyPress (key, pressed) {
    const timestamp = Date.now()

    if (pressed === true && this.keys[key].pressed !== true) {
      this.keys[key].pressCount++
      this.keys[key].lastPressed = timestamp
    }

    if (this.history === true) {
      const state = (pressed === true ? 'down' : 'up')
      
      this.keys[key].history.push({ state, timestamp })
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
        this.handler(this.key(key))
      }
    }
  }
}
