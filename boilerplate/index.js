'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BoilerplateGenerator = yeoman.generators.Base.extend({
	init: function () {
	},

	h5bp: function () {
		var done = this.async();
		var ignores = [
			'.git',
			'CHANGELOG.md',
			'CONTRIBUTING.md',
			'README.md'
		];

		this.destinationRoot("./app/");

		this.dest.mkdir("js");
		this.dest.mkdir("js/vendor");
		this.dest.mkdir("img");

		this.remote('h5bp', 'html5-boilerplate', 'master', function(err, remote) {
			if (err) {
				return done(err);
			}

			remote.directory('css');
			remote.directory('img');
			remote.directory('js');

			this.expandFiles('*', {
				cwd: remote.src._base,
				dot: true
			}).forEach(function (el) {
				if (ignores.indexOf(el) === -1) {
					remote.copy(el, el);
				}
			});

			done();
		}.bind(this));
	}
});

module.exports = BoilerplateGenerator;


