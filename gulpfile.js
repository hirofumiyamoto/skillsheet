var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    cssmin       = require('gulp-cssmin'),
    rename       = require('gulp-rename'),
    sync         = require('browser-sync');

gulp.task('server', function() {
  return sync({
    server: {
      baseDir: './'
    },
    open: 'external',
    port: 9000
  });
});

gulp.task('reload', function() {
  return sync.reload();
});

gulp.task('less', function() {
  return gulp.src('./less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['build', 'server'], function() {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./*.html', ['reload']);
  gulp.watch('./css/*.css', ['reload']);
  return gulp.watch('./js/*.js', ['reload']);
});

gulp.task('build', ['less']);

gulp.task('default', ['build']);