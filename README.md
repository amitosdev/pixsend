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
const pixsend = new Pixsend({ src: 'https://www.google.com' }, { foo: 'bar' })
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
const pixsend = new Pixsend({ src: 'https://www.google.com' }, { foo: 'bar' })
pixsend.add({ more:'data', andMore:'something' }).send()
```

* Pixsend also has a debug mode:

```js
const pixsend = new Pixsend({ src: 'https://www.google.com', debug: true })
```

* Pixsend can receive an src url with query strings and chain them to the final url:

```js
const pixsend = new Pixsend({ src: 'https://www.google.com/?quesry=string' }, { foo: 'bar' })
pixsend.add({ more:'data', andMore:'something' }).send()
// https://www.google.com/?quesry=string&foo=bar&more=data&andMore=something
```

## Tests

To run Pixsend unit test run:

```bash
> npm test
```
