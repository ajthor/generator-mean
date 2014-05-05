module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		shell: {
			options: {
				stdout: true,
				stderr: true
			},

// Git-Init Task
// -------------
// Sets up the project as a local Git repo, makes an initial commit 
// to 'master', and creates a 'development' branch.
// 
// \* Called automatically from the Yeoman generator unless the 
// `--no-git` flag is used.
			'git-init': {
				command: [
					'git init',
					'git add .',
					'git commit -a -m \"initial commit\"',
					'git checkout -b development'
				].join('&&')
			}
		}

	});

	grunt.task.loadNpmTasks('grunt-shell');

	grunt.registerTask('git-init', ['shell:git-init']);

};


