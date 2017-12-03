'use strict'
const { expect } = require('chai')
const Transporter = require('../transporters/BrowserImg')

let window

describe('Browser img transporter tests', () => {
	it('send data by creating img element', () => {
		let url = 'https://www.google.com?product=nice'
		let transporter = new Transporter(url, log, window)
		transporter.send()
		expect(window.document.img.src).to.be.equal(url)
	})
	beforeEach(() => {
		window = new Window()
	})
})

function log() {
}

// mock classes
class Window {
	constructor() {
		this.document = new Document()
	}
}

class Document {
	constructor() {
		this.img = new Img()
	}

	createElement(elem) {
		return this.img
	}
}

class Img {
	constructor() {
		this.style = { height: '', width: '' }
		this.src = ''
	}
}
