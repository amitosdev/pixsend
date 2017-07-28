# Pixsend
A dead simple report pixel browser integration

# Implementation
1. Require `pixsend-min.js` in your HTML file:.

```html
<script type="text/javascript" src="js/pixsend-min.js"></script>
```

2. Create a new Pixsend Instance:

```js
let pixsend = new Pixsend({ src: 'https://www.google.com' }, { foo: 'bar' })
```

3. Add data to the pixel:

```js
pixsend.add({ more:'data', andMore:'something' })
```

4. send the pixel:

```js
pixsend.send()
```

* You can also chain the methods:

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

* Pixsend can be installed with NPM:

```bash
npm install --save pixsend
```

```js
const Pixsend = require('pixend')
```

# Tests
* To run Pixsend unit test run:
```bash
npm test
```

* This module tested on IE >= 9, Chrome and Firefox.

# Develop
To develop this module you can run `gulp`. This will build the app file into `dist/pixsend-min.js` and run an express server that will serve a simple HTML file with the integrated module.
