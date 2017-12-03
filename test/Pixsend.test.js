const { expect } = require('chai')
const { Pixsend, Transporter } = require('../index.js')

let transporterResult

describe('Pixsend tests', () => {
	describe('constructor', () => {
		it('create instance with a valid url', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com' }, {})
			expect(pixel).to.be.instanceOf(Pixsend)
			let errorSrcs = ['http://www.google.com', 'https://www.google.com', 'https://google.com']
			for (let i = 0; i < errorSrcs.length; i++) {
				let pixel = new Pixsend({ src: errorSrcs[i] }, {})
				expect(pixel).to.be.instanceOf(Pixsend)
			}
		})

		it('create instance fails with invalid url', () => {
			let errorSrcs = ['123', 123, 'ssss', 'htt://www.google.com', 'ftp://google.com', 'www.google.com', { src: 'https://www.google.com' }, ['www']]
			for (let i = 0; i < errorSrcs.length; i++) {
				expect(() => new Pixsend({ src: errorSrcs[i] }, {})).to.throw()
			}
		})

		it('create instance success with localhost url', () => {
			expect(() => new Pixsend({ src: 'http://localhost:3001/event' }, {})).not.to.throw()
		})

		it('create instance with transporter', () => {
			expect(() => new Pixsend({ src: 'http://localhost:3001/event' }, {})).not.to.throw()
		})
	})

	describe('add data', () => {
		it('source query string parsed', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, {})
			expect(pixel.parsedSrc.query).to.be.eql({ foo: 'bar' })
		})
		it('data added successfully', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, { product: 'nice' })
			pixel.add({ addon: 'something' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something' })
			pixel.add({ more: 'good' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something', more: 'good' })
		})

		it('data add fail ', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, { product: 'nice' })
			let errorSrcs = ['123', 123, function () {
				return {}
			}]
			for (let i = 0; i < errorSrcs.length; i++) {
				expect(() => pixel.add(errorSrcs[i])).to.throw()
			}
		})
	})

	describe('send data', () => {
		it('try to use invalid transporter', () => {
			class SomeTransporter {
				constructor(url) {
					this.url = url
				}
				send() {
				}
			}
			let pixel = new Pixsend({ src: 'https://www.google.com' }, { product: 'nice' })
			expect(() => pixel.send(SomeTransporter)).to.throw()
		})
		it('send the initial data', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com' }, { product: 'nice' })
			pixel.send(MockTransporter)
			expect(transporterResult).to.be.equal('https://www.google.com?product=nice')
		})
		it('add data and send it with the initial data', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com?foo=bar' }, { product: 'nice' })
			pixel.add({ addon: 'something' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something' })
			pixel.add({ more: 'good' })
			expect(pixel._data).to.be.eql({ product: 'nice', addon: 'something', more: 'good' })
			pixel.send(MockTransporter)
			expect(transporterResult).to.be.equal('https://www.google.com?foo=bar&product=nice&addon=something&more=good')
		})
		it('chain methods', () => {
			let pixel = new Pixsend({ src: 'https://www.google.com' }, { product: 'nice' })
			pixel.add({ addon: 'something' }).send(MockTransporter)
			expect(transporterResult).to.be.equal('https://www.google.com?product=nice&addon=something')
		})
	})
})

class MockTransporter extends Transporter {
	constructor(url) {
		super(url)
	}

	send() {
		transporterResult = this.url
	}
}

