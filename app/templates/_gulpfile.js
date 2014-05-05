var gulp = require('gulp');

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


