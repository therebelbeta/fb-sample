var gulp = require('gulp');
var http = require('http');
var ecstatic = require('ecstatic');
var browserify = require('browserify');
var less = require('gulp-less');
var source = require('vinyl-source-stream');

gulp.task('server', function() {
  http.createServer(
    ecstatic({
      root: __dirname
    })
  ).listen(8080);

  console.log('Listening on :8080');
});
gulp.task('watch', function() {
  gulp.watch('./source/*.js', ['scripts']);
  gulp.watch('./source/*.less', ['styles']);
});
gulp.task('scripts', function() {
  return browserify('./source/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'));
});
gulp.task('styles', function() {
  gulp.src('./source/style.less')
    .pipe(less())
    .pipe(gulp.dest('./'));
});
gulp.task('default', ['scripts', 'styles', 'watch', 'server']);
