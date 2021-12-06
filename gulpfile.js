'use strict'
const gulp = require('gulp')
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify')
const nodemon = require('gulp-nodemon')

gulp.task('build', () => {
  return browserify('./index.js', { debug: false, standalone: 'Pixsend' })
    .transform(babelify, { presets: ['es2015', 'stage-2'] })
    .bundle()
    .pipe(source(`./pixsend-min.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

// Gulp task to watch for main script changes
gulp.task('watcher', () => {
  gulp.watch(['index.js'], ['build'])
})

gulp.task('default', ['build', 'watcher'])

// Gulp task to start nodemon with server
gulp.task('server', () => {
  let serverPath = './test/integration/server.js'
  nodemon({
    script: serverPath,
    ext: 'js',
    watch: [serverPath]
  })
})

gulp.task('default', ['build', 'watcher', 'server'])
