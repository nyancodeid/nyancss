var gulp 		= require('gulp');
var concat 		= require('gulp-concat');
var rename 		= require('gulp-rename');
var uglifyjs 	= require('gulp-uglify');
var uglifycss 	= require('gulp-minify-css');
var prefix 		= require('gulp-autoprefixer');
var sourcemaps 	= require('gulp-sourcemaps');
var replace 	= require('gulp-string-replace');
var pump 		= require('pump');
var banner 		= require('gulp-banner');
var pkg 		= require('./package.json');
var gJade 		= require('gulp-jade');
var html2jade 	= require('gulp-html2jade');

var path = {
	css: ['./css/nyancss.css'],
	js: ['js/nyancss.js'],
	fonts: ['fonts/*'],
	files: ['LICENSE', 'package.json', 'README.md', './demo/**/**/*.*', '!./demo/index.html', '!./demo/_*.html'],
	demo: ['./demo/*.html'],
	jade: ['./jade/index.jade', './jade/component/*.jade', './jade/helpers/*.jade']
};

var comment = '/*\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright 2017, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';

gulp.task('css', function() {
 return gulp.src(path.css)
 	.pipe(sourcemaps.init())
	 	.pipe(banner(comment, {
	        pkg: pkg
	    }))
		.pipe(prefix({
		    browsers: ["> 0%"]
		}))
		.pipe(rename("nyan.css"))
	.pipe(sourcemaps.write('.', {addComment: false}))
	.pipe(gulp.dest('release/nyancss-v'+pkg.version+"/css"))
	.pipe(uglifycss())
	.pipe(sourcemaps.init())
	.pipe(rename("nyan.min.css"))
	.pipe(sourcemaps.write('.', {addComment: false}))
	.pipe(gulp.dest('release/nyancss-v'+pkg.version+"/css"))
});

gulp.task('js', function(cb) {
 pump([
 	gulp.src(path.js),
 	banner(comment, {
        pkg: pkg
    }),
	rename("nyan.js"),
	gulp.dest('release/nyancss-v'+pkg.version+'/js'),
	rename("nyan.min.js"),
	uglifyjs(),
	gulp.dest('release/nyancss-v'+pkg.version+"/js")
 ], cb)
});

gulp.task('fonts', function() {
	return gulp.src(path.fonts).pipe(gulp.dest('release/nyancss-v'+pkg.version+'/fonts'));
});

gulp.task('move', ['jade' ,'demoIndex'], function() {
	return gulp.src(path.files, { base:'./'}).pipe(gulp.dest('release/nyancss-v'+pkg.version));
});

gulp.task('jade', function () {
	var YOUR_LOCALS = {};

	gulp.src(path.jade)
		.pipe(gJade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe(gulp.dest('./demo'));
});

gulp.task('tojade', function() {
	gulp.src('./html/index.html')
    .pipe(html2jade({
    	nspaces:2,
    	noemptypipe: true,
    	tabs:2
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('demoIndex', function() {
	return gulp.src(path.demo, { base: './'})
		.pipe(replace('../css/nyancss.css', '../css/nyan.min.css?v='+pkg.version))
		.pipe(replace('../js/nyancss.js', '../js/nyan.min.js?v='+pkg.version))
		.pipe(gulp.dest('release/nyancss-v'+pkg.version));
});

gulp.task('release', function() {
	gulp.start('css', 'js', 'fonts', 'jade', 'move');
});

// Watch jade -> html

gulp.task('watch', function() {
	gulp.watch(['./jade/*.jade', './jade/**/*.jade'], ['jade']);
});




