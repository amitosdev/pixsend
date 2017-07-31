const { expect } = require('chai')
const Pixsend = require('../index.js')

let window

describe('Pixsend tests', () => {
	describe('constructor', () => {
		it('create instance with a valid url', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com' }, {}, window)
			expect(pixel).to.be.instanceOf(Pixsend)
			let errorSrcs = ['http://www.google.com', 'https://www.google.com', 'https://google.com']
			for (let i = 0; i < errorSrcs.length; i++) {
				let pixel = new Pixsend({ src: errorSrcs[i] }, {}, window)
				expect(pixel).to.be.instanceOf(Pixsend)
			}
		})

		it('create instance fails with invalid url', () => {
			let errorSrcs = ['123', 123, 'ssss', 'htt://www.google.com', 'ftp://google.com', 'www.google.com']
			for (let i = 0; i < errorSrcs.length; i++) {
				expect(() => new Pixsend({ src: errorSrcs[i] }, {}, window)).to.throw()
			}
		})
	})

	describe('add data', () => {
		it('source query string parsed', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, {}, window)
			expect(pixel.parsedSrc.query).to.be.eql({ foo: 'bar' })
		})
		it('data added successfully', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, { product: 'nice' }, window)
			pixel.add({ addon: 'something' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something' })
			pixel.add({ more: 'good' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something', more: 'good' })
		})

		it('data add fail ', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, { product: 'nice' }, window)
			let errorSrcs = ['123', 123, function () {
				return {}
			}]
			for (let i = 0; i < errorSrcs.length; i++) {
				expect(() => pixel.add(errorSrcs[i])).to.throw()
			}
		})
	})

	describe('send data', () => {
		it('send the initial data', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com' }, { product: 'nice' }, window)
			pixel.send()
			expect(window.document.img.src).to.be.equal('https://www.google.com?product=nice')
		})
		it('add data and send it with the initial data', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, { product: 'nice' }, window)
			pixel.add({ addon: 'something' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something' })
			pixel.add({ more: 'good' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something', more: 'good' })
			pixel.send()
			expect(window.document.img.src).to.be.equal('https://www.google.com?foo=bar&product=nice&addon=something&more=good')
		})
		it('chain methods', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com' }, { product: 'nice' }, window)
			pixel.add({ addon: 'something' }).send()
			expect(window.document.img.src).to.be.equal('https://www.google.com?product=nice&addon=something')
		})
	})

	beforeEach(() => {
		window = new Window()
	})
})

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
