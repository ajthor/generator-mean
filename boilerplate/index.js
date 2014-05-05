'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BoilerplateGenerator = yeoman.generators.Base.extend({
	init: function() {
		this.on('end', function() {
			this.spawnCommand('gulp', ['wire-dependencies']);
		});
	},

	directories: function() {
		this.dest.mkdir('server/routes');
		this.dest.mkdir('server/views');
		this.dest.mkdir('public/scripts');
		this.dest.mkdir('public/scripts/vendor');
		this.dest.mkdir('public/css');
		this.dest.mkdir('public/img');
	},

	h5bp: function() {
		var done = this.async();
		var ignores = [
			'index.html',
			'404.html',
			'.DS_Store',
			'.git',
			'.gitignore',
			'.gitattributes',
			'tile.png',
			'tile-wide.png',
			'browserconfig.xml',
			'CHANGELOG.md',
			'CONTRIBUTING.md',
			'README.md'
		];

		this.remote('h5bp', 'html5-boilerplate', 'master', function(err, remote) {
			if (err) {
				return done(err);
			}

			remote.directory('css', 'public/css');
			remote.directory('img', 'public/img');
			// remote.directory('js', 'public/scripts');

			this.expandFiles('*', {
				cwd: remote.src._base,
				dot: true
			}).forEach( function(file) {
				if( ignores.indexOf(file) === -1 ) {
					remote.copy( file, path.join("public/", file) );
				}
			});

			remote.copy('404.html', 'server/views/404.html');

			done();
		}.bind(this));

	},

	indexFile: function() {
		var index = this.read("index.html");

		this.write("server/views/index.html", index);
	}
});

module.exports = BoilerplateGenerator;


