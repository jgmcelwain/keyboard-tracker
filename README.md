## Keyboard Tracker
[![npm](https://img.shields.io/npm/v/keyboard-tracker.svg)](https://www.npmjs.com/package/keyboard-tracker)

Zero dependency, zero config keyboard tracker for JS.


### Usage:

``` html
<script type="text/javascript" src="https://unpkg.com/keyboard-tracker"></script>
```

```js
const tracker = new KeyboardTracker({ handler: e => console.log(e) })

// press 'a' key
// => { key: 'a', isPressed: true, pressCount: 1, lastPressed: 1519494954553, history: [] }
```

### Options/Defaults:

 - `persistence` - defaults to `false`. Set to `true` to enable persitence between sessions.
 - `history` - defaults to `false`. Set to `true` to enable saving of each keypress timestamp.
 - `handler` - defaults to `null`. If set to a function said function will be run on every event, passing the pressed key's data as a parameter
