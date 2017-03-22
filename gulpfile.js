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
 		'js/jquery.min.js',
 		'js/jquery-scrollspy.js',
 		'js/posts.js',
 		'js/app.js'
 	]),
	concat("app.js"),
	gulp.dest('dist/js'),
	rename("app.min.js"),
	uglifyjs(),
	gulp.dest("dist/js")
 ], cb)
});

gulp.task('js-min', function() {
 return gulp.src('dist/*.js')
	.pipe(uglify())
	.pipe(gulp.dest("dist/"));
});


