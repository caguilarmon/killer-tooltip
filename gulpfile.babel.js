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
  return gulp.src('./src/css/killer-toolip-styles.css')
  .pipe(csso())
  .pipe(rename({ extname: '.min.css'}))
  .pipe(gulp.dest('./src/css'))
  .pipe(connect.reload());
});

gulp.task('minifyScripts', () => {
  return gulp.src('./src/js/killer-tooltip.js')
  .pipe(babel())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js'}))
  .pipe(gulp.dest('./src/js'))
  .pipe(connect.reload());
});

gulp.task('copy:vendorjs', () => {
  return gulp.src('./node_modules/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./src/js/vendor'));
});

gulp.task('watch', () => {
  // gulp.watch('')
  gulp.watch(['./src/css/*.css', './test/css/**/*.css'], ['minifyStyles']);
  gulp.watch('./src/js/*.js', ['minifyScripts']);
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
