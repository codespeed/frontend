/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      port: 3002,
      host: 'ec2-54-186-5-126.us-west-2.compute.amazonaws.com',
      //fallback: 'index.html',
      livereload: true,
      directoryListing: true,
      open: true
    }));
});


gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});