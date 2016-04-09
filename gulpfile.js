// /////////////////////////////////////////////
// Required
// /////////////////////////////////////////////

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var less = require('gulp-less-sourcemap');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var includeHTML = require('gulp-html-tag-include');
var browserSync = require('browser-sync').create();

// /////////////////////////////////////////////
// Build CSS Task
// /////////////////////////////////////////////
gulp.task('build-css', function () {
    // Buil CSS
    return gulp.src(['./assets/less/**/*.less', '!./assets/less/**/_*.less'])
        .pipe(plumber())
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: './assets/less'
            }
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./assets/css')).on('error', gutil.log)

});

// /////////////////////////////////////////////
// Minify CSS Task
// /////////////////////////////////////////////
gulp.task('minify-css', function() {
    // Minify CSS
    return gulp.src(['./assets/css/**/*.css', '!assets/css/**/*.min.css'])
        .pipe(plumber())
        .pipe(cssmin({
            keepSpecialComments: false,
            advanced: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/css')).on('error', gutil.log);
});

// /////////////////////////////////////////////
// BUILD HTML TASK
// /////////////////////////////////////////////
gulp.task('build-html', function() {
    return gulp.src('./source/*.html')
        .pipe(includeHTML())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});


// /////////////////////////////////////////////
// Browser Sync Task
// /////////////////////////////////////////////
gulp.task('browser-sync', function() {

    browserSync.init({
        server: "./"
    });

});

// /////////////////////////////////////////////
// WATCH TASK
// /////////////////////////////////////////////
gulp.task('watch', ['build-html','browser-sync'], function () {
    gulp.watch('./source/**/*.html', ['build-html']);
    gulp.watch('./assets/less/**/*.less', ['build-css']);
    gulp.watch('./assets/less/**/*.less', ['build-css']);
    //gulp.watch("./*.html").on('change', browserSync.reload);
});

// /////////////////////////////////////////////
// DEfAULT TASK
// /////////////////////////////////////////////
gulp.task('default', ['build-html', 'build-css', 'minify-css', 'watch']);
