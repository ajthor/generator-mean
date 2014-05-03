var gulp = require('gulp');

var csslint = require("gulp-csslint");
var jshint = require("gulp-jshint");

var ngmin = require("gulp-ngmin");
var wiredep = require('wiredep').stream;

gulp.task('bower', function() {
	gulp.src('server/views/index.html')
		.pipe(wiredep({
			directory: 'public/scripts/vendor'
		}))
		.pipe(gulp.dest('build'));
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