const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
 
gulp.task('default', () => {
  gulp.src('bin/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename('keyboard-tracker.js'))
    .pipe(gulp.dest('dist'))

  gulp.src('bin/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename('keyboard-tracker.min.js'))
    .pipe(gulp.dest('dist'))
})