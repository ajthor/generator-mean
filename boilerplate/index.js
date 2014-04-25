'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BoilerplateGenerator = yeoman.generators.Base.extend({
	init: function() {

	},

	h5bp: function() {
		var done = this.async();
		var ignores = [
			'index.html',
			'.DS_Store',
			'.git',
			'.gitignore',
			'.gitattributes',
			'tile.png',
			'tile-wide.png',
			'apple-touch-icon-precomposed.png',
			'browserconfig.xml',
			'CHANGELOG.md',
			'CONTRIBUTING.md',
			'README.md'
		];

		this.dest.mkdir('public/scripts');
		this.dest.mkdir('public/scripts/vendor');
		this.dest.mkdir('public/img');

		this.remote('h5bp', 'html5-boilerplate', 'master', function(err, remote) {
			if (err) {
				return done(err);
			}

			remote.directory('public/css');
			remote.directory('public/img');

			this.expandFiles('*', {
				cwd: remote.src._base,
				dot: true
			}).forEach( function(file) {
				if( ignores.indexOf(file) === -1 ) {
					remote.copy( file, path.join("public/", file) );
				}
			});

			done();
		}.bind(this));
	}
});

module.exports = BoilerplateGenerator;


