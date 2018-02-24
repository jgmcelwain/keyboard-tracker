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
    if (this.key(key) !== null) {
      return true
    }
    else {
      return false
    }
  }

  createKey (key, pressed) {
    this.keys[key] = {
      pressed: null,
      pressCount: 0,
      lastPressed: Date.now()
    }
  }

  saveKeyPress (key, pressed) {
	if (pressed === true && this.keys[key].pressed !== true) {
      this.keys[key].pressCount++
      this.keys[key].lastPressed = Date.now()
	}
	  
    this.keys[key].pressed = pressed
  }

  logEvent (e, pressed) {
	const { key } = e
	
    if (!this.keyExists(key)) {
		this.createKey(key)
	}
    
	this.saveKeyPress(key, pressed)

    this.persistState()
  }
}

export default KeyboardTracker
