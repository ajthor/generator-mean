'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
  GeneratorBase.apply(this, arguments);

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.buildAllModules = function buildAllModules() {
	var modules = this.getConfig('modules');
	var done = this.async();

	var prompts = [{
		type: 'confirm',
		name: 'confirm',
		message: "Would you like to build the project?",
		default: true
	}];

	this.prompt(prompts, function (results) {
		// If user says yes, ...
		if(results.confirm) {
			// For each module in the collection, ...
			_.each(modules, function (module, key) {

				// Cycle through all submodules and build them.
				_.each(module, function (submodule, name) {

					var dependencies = _.without(_.keys(module), key);

					if(name === key) {
						submodule.dependencies = _.union(submodule.dependencies, dependencies);
					}
					this.buildModule(submodule);
				}, this);

			}, this);

		}

		done();
	}.bind(this));
};