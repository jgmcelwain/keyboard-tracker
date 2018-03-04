const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
 
gulp.task('default', () => {
  gulp.src('bin/index.js')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-object-rest-spread']
    }))
    .pipe(rename('keyboard-tracker.js'))
    .pipe(gulp.dest('dist'))

  gulp.src('bin/index.js')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-object-rest-spread']
    }))
    .pipe(uglify())
    .pipe(rename('keyboard-tracker.min.js'))
    .pipe(gulp.dest('dist'))
})