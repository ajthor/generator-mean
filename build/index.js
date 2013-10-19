'use strict';
var util = require('util');
var path = require('path');
var SubGenerator = require('../subgenerator-lib.js');
var _ = require('underscore');
var prettyjson = require('prettyjson');

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {
  SubGenerator.apply(this, arguments);
  
};

util.inherits(BuildGenerator, SubGenerator);

BuildGenerator.prototype.build = function build() {
	console.log("\n\nInitializing build...");
	// Do stuff.

};

BuildGenerator.prototype.files = function files(type) {
	// Do stuff.
	console.log(this.config);
	var modules = this.config.get('modules');
	var bowerModules = this.config.get("bowerModules");
	//        modules = _.where(modules, {type: type});
	_.each(modules, function (module) {
		var output = _.template(this.readFileAsString(path.join(this.sourceRoot(), module.type+'.js')), module);
		
		if (bowerModules.requirejs) {
			module.module = output;
			// this.template('require.js', 'public/js/controllers/' + module.directory + module.name + '.js', module);
			output = _.template(this.readFileAsString(path.join(this.sourceRoot(), 'require.js')), module);
		}
		this.write(path.join('public/js/', module.type, module.directory, module.name + '.js'), output);
	}.bind(this));
};
