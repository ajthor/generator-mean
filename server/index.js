'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ServerGenerator = yeoman.generators.NamedBase.extend({
	init: function () {},

	directories: function() {
		this.dest.mkdir('server');
		this.dest.mkdir('server/controllers');
		this.dest.mkdir('server/routes');
		this.dest.mkdir('server/views');
	}
});

module.exports = ServerGenerator;