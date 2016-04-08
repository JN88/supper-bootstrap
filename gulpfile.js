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
var browserSync = require('browser-sync').create();

// /////////////////////////////////////////////
// Build CSS And Minify CSS Task
// /////////////////////////////////////////////
gulp.task('build-css', function () {
    // Buil CSS
    gulp.src(['./assets/less/**/*.less', '!./assets/less/**/_*.less'])
        .pipe(plumber())
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: './assets/less'
            }
        }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./assets/css')).on('error', gutil.log)

    // Minify CSS
    gulp.src(['./assets/css/**/*.css', '!assets/css/**/*.min.css'])
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
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('./assets/less/**/*.less', ['build-css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// /////////////////////////////////////////////
// DEfAULT TASK
// /////////////////////////////////////////////
gulp.task('default', ['watch']);
