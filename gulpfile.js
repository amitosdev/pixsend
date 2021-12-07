const gulp = require('gulp')
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const babelify = require('babelify')

gulp.task('build', () => {
  return browserify('./index.js', { debug: false, standalone: 'Pixsend' })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source(`./pixsend-min.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

// Gulp task to watch for main script changes
gulp.task('watcher', () => {
  const watcher = gulp.watch(['index.js'], gulp.series('build'))
  watcher.on('change', function (path) {
    console.log(`File ${path} was changed`)
  })

  watcher.on('add', function (path) {
    console.log(`File ${path} was added`)
  })

  watcher.on('unlink', function (path) {
    console.log(`File ${path} was removed`)
  })
})

gulp.task('default', gulp.series('build', 'watcher'))
