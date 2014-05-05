var gulp = require('gulp');

var csslint = require("gulp-csslint");
var jshint = require("gulp-jshint");

var ngmin = require("gulp-ngmin");
var wiredep = require('wiredep').stream;

// Post-Generator Tasks
// ====================
// These tasks are run after the generator finishes its work. These 
// tasks are related to setting up the project and not necessarily 
// related to the build process.

// Wire Dependencies
// -----------------
// - Wire the bower.json vendor scripts to the index.html file.
gulp.task('wire-dependencies', function() {
	gulp.src('server/views/index.html')
		.pipe(wiredep({
			directory: 'public/scripts/vendor/'
		}))
		.pipe(gulp.dest('server/views/'));
});

gulp.task('bower', function() {
	gulp.src('server/views/index.html')
		.pipe(wiredep({
			directory: 'public/scripts/vendor/'
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('lint', function() {
	gulp.src(['public/css'])
		.pipe(csslint('./.csslintrc'))
		.pipe(csslint.reporter());

	// gulp.src(['public/scripts/**/*.js', '!public/scripts/vendor/'])
	// 	.pipe(jshint())
	// 	.pipe(jshint.reporter('default'));
});

// gulp.task('ngmin', function() {
// 	gulp.src(['public/scripts/**/*.js', '!public/scripts/vendor/'])
// 		.pipe(ngmin())
// 		.pipe(gulp.dest('build/scripts'));
// });


gulp.task('default', ['lint', 'bower']);