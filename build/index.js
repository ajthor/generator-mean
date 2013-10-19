'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('underscore');

var JSON = require('json3');
var prettyjson = require('prettyjson');

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BuildGenerator, yeoman.generators.Base);

BuildGenerator.prototype.build = function build() {
	console.log("\n\nInitializing build...");
	// Do stuff.
	this.modules = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'config/modules.json')));

};

BuildGenerator.prototype.controllers = function controllers() {
	// Do stuff.
	var    modules = _.where(this.modules, {type: 'controller'});
	_.each(modules, function (module) {
		// Get module name and separate from directory.
		module.directory = module.name.substring(0, module.name.lastIndexOf('/')+1);
		module.name = module.name.substring(module.name.lastIndexOf('/')+1);

		var controller = _.template(this.readFileAsString(path.join(this.sourceRoot(), 'controller.js')), module);
		
		// if (this.config.bowerModules.requirejs) {
			module.module = controller;
			this.template('require.js', 'public/js/controllers/' + module.directory + module.name + '.js', module);
		// } else {
			// this.write('public/js/controllers/' + module.name + '.js', controller);
		// }
	}.bind(this));
};

