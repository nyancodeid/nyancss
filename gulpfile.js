var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglifyjs = require('gulp-uglify');
var uglifycss = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var pump = require('pump');

gulp.task('cssmin', function() {
 return gulp.src('css/nyancss.css')
	.pipe(prefix({
	    browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
	}))
	.pipe(rename("nyan.min.css"))
	.pipe(uglifycss())
	.pipe(gulp.dest("release/css/"));
});

gulp.task('css', function() {
 return gulp.src('css/nyancss.css')
	.pipe(prefix({
	    browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
	}))
	.pipe(rename("nyan.css"))
	.pipe(gulp.dest("release/css/"));
});

gulp.task('js', function(cb) {
 pump([
 	gulp.src([
 		'js/nyancss.js'
 	]),
	concat("nyan.js"),
	gulp.dest('release/js/'),
	rename("nyan.min.js"),
	uglifyjs(),
	gulp.dest("release/js/")
 ], cb)
});


