'use strict'
const gulp = require('gulp')
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify')
const nodemon = require('gulp-nodemon')
const watchify = require('watchify')
const pretty = require('prettysize')
const moment = require('moment')
const colors = require('colors/safe')

let b = browserify({
	entries: ['./index.js'],
	debug: false,
	standalone: 'Pixsend',
	cache: {},
	packageCache: {},
	plugin: [watchify]
}).transform(babelify, { presets: ['es2015', 'stage-2'] })

b.on('update', bundle)
b.on('bytes', bytes => {
	console.log(colors.magenta(`[${moment().format('HH:mm:ss')}] `) + colors.cyan(`Build completed. File size: `) + colors.green(pretty(bytes)))
})

function bundle() {
	b.bundle()
		.pipe(source(`./pixsend-min.js`))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./dist'))
}

gulp.task('build', bundle)

// Gulp task to start nodemon with server
gulp.task('server', () => {
	let serverPath = './test/integration/server.js'
	nodemon({
		script: serverPath,
		ext: 'js',
		watch: [serverPath]
	})
})

gulp.task('default', ['build', 'server'])
