# Pixsend
A dead simple wrapper for sending report pixel in the browser

## Installation

* Install with NPM

```bash
npm install --save pixsend
```

* Require in the browser (use the file in the `/dist` folder)

```html
<script type="text/javascript" src="js/pixsend-min.js"></script>
```

* require in your browserify app (ES6)

```js
const Pixsend = require('pixsend')
```

* require in your browserify app (ES5)

```js
const Pixsend = require('pixend/dist/pixsend-min.js')
```

## Implementation

1. Create a new Pixsend Instance:

```js
let pixsend = new Pixsend({ src: 'https://www.google.com' }, { foo: 'bar' })
```

2. Add data to the pixel:

```js
pixsend.add({ more:'data', andMore:'something' })
```

3. send the pixel:

```js
pixsend.send()
```

* You can also chain methods:

```js
let pixsend = new Pixsend({ src: 'https://www.google.com' }, { foo: 'bar' })
pixsend.add({ more:'data', andMore:'something' }).send()
```

* Pixsend also has a debug mode:

```js
let pixsend = new Pixsend({ src: 'https://www.google.com', debug: true })
```

* Pixsend can receive an src url with query strings and chain them to the final url:

```js
let pixsend = new Pixsend({ src: 'https://www.google.com/?quesry=string' }, { foo: 'bar' })
pixsend.add({ more:'data', andMore:'something' }).send()
// https://www.google.com/?quesry=string&foo=bar&more=data&andMore=something
```

## Tests
* To run Pixsend unit test run:
```bash
npm test
```

* This module tested on IE >= 9, Chrome and Firefox.

## Develop
To develop this module you can run `gulp`. This will build the app file into `dist/pixsend-min.js` and run an express server that will serve a simple HTML file with the integrated module.
