'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

	this.done = this.async();
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setConfig = function setConfig(key, value) {
	// console.log("Setting config value: " + key + ", " + value);
	this.config.set(key, value);
};

Generator.prototype.buildModule = function buildModule(module, dest) {
	if(!module) throw "Must supply a module to be built.";

	module = _.defaults(module, {
		name: 'main',
		type: 'module',
		route: './',
		dependencies: []
	});

	var moduleType = module.type;

	var dependencies = this.config.get('dependencies');
	var inputPath = path.join(this.sourceRoot(), '../../templates');
	var outputPath = path.join(this.destinationRoot(), 'public/js', dest);

	var output = _.template(this.readFileAsString(path.join(inputPath, moduleType+'.js')), module);

	if (dependencies.indexOf('requirejs') !== -1) {
		module.module = output;

		output = _.template(this.readFileAsString(path.join(inputPath, 'require.js')), module);
	}

	yeoman.generators.Base.prototype.write.apply(this, [outputPath, output]);

};