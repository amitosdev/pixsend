'use strict'

const isURL = require('validator/lib/isURL')
const urlParse = require('url').parse
const urlFormat = require('url').format
const objectAssign = require('object-assign')

const urlOptions = {
	protocols: ['http','https'],
	require_protocol: true
}

class Pixsend {
	constructor(opts, data, window) {
		if (!opts.src || !isURL(opts.src, urlOptions)) throw new Error('please provide a valid src url with http/https protocol')
		this.parsedSrc = urlParse(opts.src, true)
		this._isDebug = opts.debug
		this._data = data || {}
		this._window = window || global
	}

	_buildSrc() {
		let src = {
			protocol: this.parsedSrc.protocol,
			hostname: this.parsedSrc.hostname,
			pathname: this.parsedSrc.pathname,
			query: objectAssign(this.parsedSrc.query, this._data)
		}
		return urlFormat(src)
	}

	_createPixel(src) {
		let img = this._window.document.createElement('img')
		img.style.height = '0px'
		img.style.width = '0px'
		img.src = src
		this._log('createPixel -> pixel created')
	}

	add(obj) {
		if (typeof obj !== 'object') throw new Error('add method support only object')
		this._data = objectAssign(this._data, obj)
		this._log('add -> data updated: ', this._data)
		return this
	}

	send() {
		let pixelUrl = this._buildSrc()
		this._log('sending pixel -> src: ', pixelUrl)
		this._createPixel(pixelUrl)
	}

	_log() {
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
