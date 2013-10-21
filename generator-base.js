'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setConfig = function setConfig(key, value) {
	var done = this.async();
	// validation?
	// console.log("Setting config value: " + key + ", " + value);
	this.config.set(key, value);
	done();
};

Generator.prototype.createModule = function createModule(module, dest) {
	if (!this.validateModule(module)) {
		module = _.defaults(module, {
			name: 'main',
			type: '',
			dependencies: []

		});
	}

	this.saveModule(module);
	this.buildModule(module, dest);
};

Generator.prototype.validateModule = function validateModule(module) {
	if (!module) throw "Module is undefined. Value: " + module;

	var conditionOne = _.has(module, 'name');
	var conditionTwo = _.has(module, 'value');
	var conditionThree = _.has(module, 'dependencies');

	return (!conditionOne || !conditionTwo || !conditionThree) ? false : true;
};

Generator.prototype.saveModule = function saveModule(module) {
	var modules = this.config.get('modules');
	modules || (modules = {});

	modules[module.name] = module;
	this.setConfig('modules', modules);
};

Generator.prototype.buildModule = function buildModule(module, dest) {
	if(!module) throw "Must supply a module to be built.";

	var moduleType = module.type;

	var dependencies = this.config.get('dependencies');
	var directories = this.config.get('directories');
	var templateDirectory = this.config.get('templateDirectory');

	var outputPath = path.join(directories.scripts, dest);

	var output = _.template(this.readFileAsString(path.join(templateDirectory, moduleType+'.js')), module);

	if (dependencies.indexOf('requirejs') !== -1) {
		module.module = output;

		output = _.template(this.readFileAsString(path.join(templateDirectory, 'require.js')), module);
	}

	yeoman.generators.Base.prototype.write.apply(this, [outputPath, output]);

};