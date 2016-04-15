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
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var buffer = require('vinyl-buffer');

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
// BUILD JS TASK
// /////////////////////////////////////////////
gulp.task('build-js', function() {
	return gulp.src('./assets/js/**/*.js')
	.pipe(gulp.dest('./assets/js/'))
	.pipe(browserSync.stream());
});

// /////////////////////////////////////////////
// SPRITE IMAGES TASK
// /////////////////////////////////////////////
gulp.task('sprite', function () {

	// Generate our spritesheet
	var spriteData = gulp.src('./assets/images/sprite/*.png')
	.pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.less',
		imgPath: '../images/sprite.png',
		padding: 2
	}));

	// Pipe image stream through image optimizer and onto disk
	var imgStream = spriteData.img
		.pipe(buffer())
    .pipe(imagemin())
		.pipe(gulp.dest('./assets/images/'))
		.pipe(browserSync.stream());

	// Pipe CSS stream through CSS optimizer and onto disk
	var cssStream = spriteData.css.pipe(gulp.dest('./assets/less/common/'));

	return merge(imgStream, cssStream);
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
gulp.task('watch', ['build-html', 'sprite','browser-sync'], function () {
	gulp.watch('./source/**/*.html', ['build-html']);
	gulp.watch('./assets/less/**/*.less', ['build-css']);
	gulp.watch('assets/js/**/*.js', ['build-js']);
	gulp.watch('assets/images/sprite/**/*.png', ['sprite']);
		//gulp.watch("./*.html").on('change', browserSync.reload);
});

// /////////////////////////////////////////////
// DEfAULT TASK
// /////////////////////////////////////////////
gulp.task('default', ['build-html', 'build-css', 'minify-css', 'sprite', 'watch']);
