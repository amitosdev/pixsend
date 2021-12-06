'use strict'

const isURL = require('validator/lib/isURL')
const parse = require('url-parse')
const objectAssign = require('object-assign')

class Pixsend {
  constructor (opts, data, window) {
    if (!opts.src || !this._isUrl(opts.src))
      throw new Error('please provide a valid src url with http/https protocol')
    this.parsedSrc = parse(opts.src, true)
    this._isDebug = opts.debug
    this._data = data || {}
    this._window = window || global
  }

  _buildSrc () {
    this.parsedSrc.set('query', objectAssign(this.parsedSrc.query, this._data))
    return this.parsedSrc.toString()
  }

  _createPixel (src) {
    let img = this._window.document.createElement('img')
    img.style.height = '0px'
    img.style.width = '0px'
    img.src = src
    this._log('createPixel -> pixel created')
  }

  add (obj) {
    if (typeof obj !== 'object') throw new Error('add method support only object')
    this._data = objectAssign(this._data, obj)
    this._log('add -> data updated: ', this._data)
    return this
  }

  send () {
    let pixelUrl = this._buildSrc()
    this._log('sending pixel -> src: ', pixelUrl)
    this._createPixel(pixelUrl)
  }

  _isUrl (url) {
    if (url.indexOf('//localhost') > -1) return true
    const urlOptions = {
      protocols: ['http', 'https'],
      require_protocol: true
    }
    return isURL(url, urlOptions)
  }

  _log () {
    if (this._isDebug) {
      for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'object') {
          arguments[i] = JSON.stringify(arguments[i], null, '\t')
        }
      }
      console.log.apply(console, arguments)
    }
  }
}

module.exports = Pixsend
