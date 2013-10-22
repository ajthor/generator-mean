'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

	this.dependencies = this.getConfig('dependencies');
	this.directories = this.getConfig('directories');
	this.templateDirectory = this.getConfig('templateDirectory');
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.getConfig = function getConfig(key) {
	var result = this.config.get(key);

	if (!result) {
		if (arguments[1]===true) {
			console.log(arguments); 
			throw "Config value \'" + key + "\'' is not set. Try running the generator again.";
		}
		else { 
			return void 0;
		}
	}

	return result;
};

Generator.prototype.setConfig = function setConfig(key, value) {
	// validation?
	// console.log("Setting config value: " + key + ", " + value);
	this.config.set(key, value);
};

Generator.prototype.createModule = function createModule(module, template, dest) {
	if (!this.validateModule(module)) {
		module = _.defaults(module, {
			name: 'main',
			type: '',
			dependencies: []
		});
	}

	this.saveModule(module);
	this.buildModule(module, template, dest);
};

Generator.prototype.validateModule = function validateModule(module) {
	if (!module) throw "Module is undefined. Value: " + module;

	var conditionOne = _.has(module, 'name');
	var conditionTwo = _.has(module, 'value');
	var conditionThree = _.has(module, 'dependencies');

	return (!conditionOne || !conditionTwo || !conditionThree) ? false : true;
};

Generator.prototype.saveModule = function saveModule(module) {
	var modules = this.getConfig('modules', false);
	modules || (modules = {});

	modules[module.name] = module;
	this.setConfig('modules', modules);
};

Generator.prototype.buildModule = function buildModule(module, template, dest) {
	this.validateModule(module);

	var outputPath = dest ? dest : path.join(this.directories.scripts, module.name+'.js');

	template = this.readFileAsString(path.join(this.templateDirectory, (template ? template : module.type+'.js')));
	var output = _.template(template, module);

	if (this.dependencies.indexOf('requirejs') !== -1) {
		module.module = output;

		output = _.template(this.readFileAsString(path.join(this.templateDirectory, 'require.js')), module);
	}

	yeoman.generators.Base.prototype.write.apply(this, [outputPath, output]);

};