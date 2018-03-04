## Keyboard Tracker
[![npm](https://img.shields.io/npm/v/keyboard-tracker.svg)](https://www.npmjs.com/package/keyboard-tracker)

Simple, zero dependency keyboard tracker for JS.


### Installation:

``` html
<script type="text/javascript" src="https://unpkg.com/keyboard-tracker"></script>
```

### Usage

#### `KeyboardTracker(handler[, options])`

 - **`handler`**` <Function>`: Receives one argument which contains the key which was pressed and any data the tracker has captured on that key. Defaults to `null`.
 - **`options`**` <Object>`:
   - **`persistence`**` <Boolean>`: Set to true to save data between sessions using `localStorage`. Defaults to `false`.
   - **`history`**` <Boolean>`: Set to true to save every event with its timestamp. Defaults to `false`.
   - **`scope`**` <Element>`: The element to attach the event listeners to. Defaults to `window`.
   
### Example

```js
const tracker = new KeyboardTracker((e) => console.log(e), { history: true })

// press 'a' key
// => { key: 'a', pressed: true, total: 1, latest: 1520181191972, history: [{ state: 'down', timestamp: 1520181191972 }]}
```
