const Transporter = require('./transporter')

class BrowserImage extends Transporter {
	constructor(url, log, window) {
		super(url, log)
		this._log('Browser Image Transporter -> created -> url: ', this.url)
		this._window = window || global
	}

	_createPixel() {
		let img = this._window.document.createElement('img')
		img.style.height = '0px'
		img.style.width = '0px'
		img.src = this.url
		this._log('Browser Image Transporter -> createPixel -> pixel created')
	}

	send() {
		this._log('Browser Image Transporter -> send called')
		this._createPixel()
	}
}

module.exports = BrowserImage
