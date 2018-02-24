class KeyboardTracker {
  constructor (options = { persistence: false }) {
    this.keys = options.persitence === true && JSON.parse(localStorage.getItem('keyboard-tracker')) || {}
    this.persistence = options.persistence

    window.addEventListener('keydown', (e) => this.logEvent(e, true))
    window.addEventListener('keyup', (e) => this.logEvent(e, false))
  }

  persistState () {
    if (this.persistence === true) {
      localStorage.setItem('keyboard-tracker', JSON.stringify(this.keys))
    }
  }
	
  key (key) {
    return this.keys[key] || null
  }
  
  keyExists (key) {
    return this.key(key) !== null
  }

  createKey (key, pressed) {
    this.keys[key] = {
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
    
    this.keys[key].history.push({
      state: pressed === true ? 'down' : 'up',
      timestamp
    })
	  
    this.keys[key].pressed = pressed
  }

  logEvent (e, pressed) {
    const { key } = e
    
    if (!this.keyExists(key)) {
      this.createKey(key)
    }
    
    if (this.key(key).pressed !== pressed) {
      this.saveKeyPress(key, pressed)
      this.persistState()
    }
  }
}

export default KeyboardTracker
