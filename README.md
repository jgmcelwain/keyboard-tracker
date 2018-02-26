## Keyboard Tracker
[![npm](https://img.shields.io/npm/v/keyboard-tracker.svg)](https://www.npmjs.com/package/keyboard-tracker)

Zero config keyboard tracker for JS.


### Usage:

``` bash
$ npm install keyboard-tracker
```

```js
import KeyboardTracker from 'keyboard-tracker'

const tracker = new KeyboardTracker({ persistence: true, history: false })

tracker.key('a') // => { key: 'a', isPressed: false, pressCount: 13, lastPressed: 1519494954553, history: [] }
```

### Options/Defaults:

 - `persistence` - defaults to `false`. Set to `true` to enable persitence between sessions.
 - `history` - defaults to `false`. Set to `true` to enable saving of each keypress timestamp.
