/*jshint esversion: 6, node: true*/

'use strict';

import eventStream from 'event-stream';
import gulp from 'gulp';
import gulpAutoprefixer from 'gulp-autoprefixer';
import gulpBabel from 'gulp-babel';
import gulpConcat from 'gulp-concat';
import gulpIife from 'gulp-iife';
import gulpOrder from 'gulp-order';
import gulpSass from 'gulp-sass';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpUglify from 'gulp-uglify';

gulp.task('default', ['js:backend', 'js:frontend', 'sass']);

gulp.task('js:backend', () => {
  return gulp.src('backend/src/**/*.js')
    .pipe(gulpBabel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('backend/build/'));
});

gulp.task('js:frontend', () => {
  let libraryFiles = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'bower_components/angular/angular.min.js'
  ];

  let ourFiles = [
    'frontend/scripts/app.js'
  ];

  let librariesStream = gulp.src(libraryFiles);

  let myStream = gulp.src(ourFiles)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpBabel({
      presets: ['es2015']
    }))
    .pipe(gulpUglify())
    .pipe(gulpIife());

  return eventStream.merge(librariesStream, myStream)
    .pipe(gulpOrder(libraryFiles.concat(ourFiles), {
      base: '.'
    }))
    .pipe(gulpConcat('main.js'))
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('sass', () => {
  return gulp.src('frontend/sass/**/*.scss')
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass({
      outputStyle: 'compressed'
    }).on('error', gulpSass.logError))
    .pipe(gulpAutoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulpSourcemaps.write('.'))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('watch', ['js:backend:watch', 'js:frontend:watch', 'sass:watch']);

gulp.task('js:backend:watch', () => {
  gulp.watch('backend/src/**/*.js', ['js:backend']);
});

gulp.task('js:frontend:watch', () => {
  gulp.watch('frontend/scripts/**/*.js', ['js:frontend']);
});

gulp.task('sass:watch', () => {
  gulp.watch('frontend/sass/**/*.scss', ['sass']);
});
