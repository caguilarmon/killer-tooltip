const gulp = require('gulp');
const babel = require('gulp-babel');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const del = require('del');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const runSequence = require('run-sequence');

gulp.task('server', () => {
  connect.server({
    port: 8000,
    root: './test',
    livereload: true
  });
});

gulp.task('minifyStyles', () => {
  return gulp.src('./src/css/killer-tooltip-styles.css')
  .pipe(csso())
  .pipe(rename({ extname: '.min.css'}))
  .pipe(gulp.dest('./src/css'))
});

gulp.task('minifyScripts', () => {
  return gulp.src('./src/js/killer-tooltip.js')
  .pipe(babel())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js'}))
  .pipe(gulp.dest('./src/js'))
});

gulp.task('copy:vendorjs', () => {
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./src/js/vendor'));

  gulp.src('./node_modules/jquery/dist/jquery.min.js')
 .pipe(gulp.dest('./test/js/vendor'));
});

gulp.task('copyKillerTooltips:js', () => {
  return gulp.src('./src/js/killer-tooltip.js')
  .pipe(gulp.dest('./test/js'));
  .pipe(connect.reload());
});

gulp.task('copyKillerTooltips:styles', () => {
  return gulp.src('./src/css/killer-tooltip-styles.css')
  .pipe(gulp.dest('./test/css'))
  .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(['./src/css/*.css', './test/css/**/*.css'], ['minifyStyles', 'copyKillerTooltips:styles']);
  gulp.watch('./src/js/*.js', ['minifyScripts', 'copyKillerTooltips:js']);
});

gulp.task('clean', () => {
  del([
      './src/css/*.min.css',
      './src/js/*.min.js',
      './src/js/vendor/**/*'
  ]);
});

gulp.task('build', ['clean'], () => {
  runSequence(
    'copy:vendorjs',
    'copyKillerTooltips:js',
    'copyKillerTooltips:styles',
    'minifyStyles',
    'minifyScripts'
  );
});

gulp.task('default', () => {
  runSequence(
    'build',
    'server',
    'watch'
  );
});
