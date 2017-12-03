'use strict'

class Transporter {
	constructor(url, log) {
		this.url = url
		this._log = log
	}

	send() {
		throw new Error('Transporter must implement a send method')
	}
}

module.exports = Transporter
