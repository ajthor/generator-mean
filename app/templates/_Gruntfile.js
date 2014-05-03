module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		shell: {
			options: {
				stdout: true,
				stderr: true
			},

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


