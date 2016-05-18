import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import concat from 'gulp-concat';
import pleeease from 'gulp-pleeease';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import sync from 'browser-sync';

gulp.task('server', () => {
  return sync({
    server: {
      baseDir: './'
    },
    open: 'external',
    port: 9000
  });
});

gulp.task('reload', () => {
  return sync.reload();
});

gulp.task('less', () => {
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

gulp.task('jsconcat', () => {
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

gulp.task('jsuglify', () => {
  return gulp.src('./build/script.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('w', ['build', 'server'], () => {
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./*.html', ['reload']);
  gulp.watch('./css/*.css', ['reload']);
  return gulp.watch('./js/*.js', ['jsconcat', 'jsuglify', 'reload']);
});

gulp.task('js', ['jsconcat', 'jsuglify']);

gulp.task('build', ['less', 'js']);

gulp.task('default', ['build']);