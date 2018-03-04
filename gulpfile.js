const gulp = require('gulp')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')

gulp.task('css', () => {
  return gulp.src('./css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest('./css'))
})

gulp.task('watcher', () => {
  gulp.watch('./css/*.scss', ['css']);
})

gulp.task('default', ['css', 'watcher'])