'use strict'

const isURL = require('validator/lib/isURL')
const parse = require('url-parse')
const objectAssign = require('object-assign')
const TransporterInterface = require('../transporters/transporter')
const BrowserImgTransporter = require('../transporters/BrowserImg')

class Pixsend {
	constructor(opts, data) {
		if (!opts.src || !Pixsend.isUrl(opts.src)) throw new Error('please provide a valid src url with http/https protocol')
		this.parsedSrc = parse(opts.src, true)
		this._isDebug = opts.debug
		this._data = data || {}
	}

	_buildSrc() {
		this.parsedSrc.set('query', objectAssign(this.parsedSrc.query, this._data))
		return this.parsedSrc.toString()
	}

	add(obj) {
		if (typeof obj !== 'object') throw new Error('add method support only object')
		this._data = objectAssign(this._data, obj)
		this._log('add -> data updated: ', this._data)
		return this
	}

	static isUrl(url) {
		if (url.indexOf('//localhost') > -1) return true
		const urlOptions = {
			protocols: ['http','https'],
			require_protocol: true
		}
		return isURL(url, urlOptions)
	}

	send(Transporter, callback) {
		let pixelUrl = this._buildSrc()
		Transporter = Transporter || BrowserImgTransporter
		if (!(Transporter.prototype instanceof TransporterInterface)) throw new Error('transporter must be instance of Transporter')
		let transporter = new Transporter(pixelUrl, this._log.bind(this))
		transporter.send(callback)
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
