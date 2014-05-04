'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ServerGenerator = yeoman.generators.Base.extend({
	init: function () {},

	directories: function() {
		this.dest.mkdir('routes');
		this.dest.mkdir('views');
	},

	serverFiles: function() {
		var done = this.async();
		
		this.remote('linnovate', 'mean', 'master', function(err, remote) {
			if (err) {
				return done(err);
			}

			// remote.copy('server.js', 'server.js');

			// remote.directory('server', 'server');

			done();
		});
	}
});

module.exports = ServerGenerator;