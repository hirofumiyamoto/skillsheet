var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    less         = require('gulp-less'),
    concat       = require('gulp-concat'),
    pleeease     = require('gulp-pleeease'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
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
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(pleeease({
      out: 'style.min.css',
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('jsconcat', function() {
  var files = [
    './node_modules/jquery/dist/jquery.js',
    './js/jquery.onscreen.min.js',
    './node_modules/jquery-color/jquery.color.js',
    './node_modules/highcharts/highcharts.js',
    './js/classie.js',
    './js/script.js',
    './js/modalEffects.js'];
  return gulp.src(files)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('jsuglify', function() {
  return gulp.src('./build/script.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['build', 'server'], function() {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./*.html', ['reload']);
  gulp.watch('./css/*.css', ['reload']);
  return gulp.watch('./js/*.js', ['jsconcat', 'jsuglify', 'reload']);
});

gulp.task('js', ['jsconcat', 'jsuglify']);

gulp.task('build', ['less', 'js']);

gulp.task('default', ['build']);