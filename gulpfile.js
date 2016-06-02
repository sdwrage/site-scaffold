/*jshint node: true, -W097*/

'use strict';

var gulp = require('gulp');
var eventStream = require('event-stream');

// Gulp plugins
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// Default task
gulp.task('default', ['css', 'js']);

// Watch task
gulp.task('watch', ['css:watch', 'js:watch']);

// CSS
gulp.task('css', function () {
  return gulp.src('./public/css/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./../maps'))
    .pipe(gulp.dest('./public/css/dist'));
});

gulp.task('css:watch', function () {
  gulp.watch('./public/css/sass/**/*.scss', ['css']);
});

// JavaScript
gulp.task('js', function () {

  var libraryStream = gulp.src([
      './public/bower_components/jquery/dist/jquery.min.js',
      './public/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      './public/bower_components/angular/angular.min.js'
    ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./public/javascript/dist'));

  var ourStream = gulp.src([
    './public/javascript/src/**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./../maps'))
    .pipe(gulp.dest('./public/javascript/dist'));

  return eventStream.merge(libraryStream, ourStream);
  //
  //
  //
  // return gulp.src([
  //     './public/bower_components/jquery/dist/jquery.min.js',
  //     './public/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
  //     './public/bower_components/angular/angular.min.js',
  //     './public/javascript/src/**/*.js'
  //   ])
  //   .pipe(sourcemaps.init())
  //   .pipe(concat('main.js'))
  //   .pipe(uglify())
  //   .pipe(sourcemaps.write('./../maps'))
  //   .pipe(gulp.dest('./public/javascript/dist'));
});

gulp.task('js:watch', function () {
  gulp.watch('./public/javascript/src/**/*.js', ['js']);
});
