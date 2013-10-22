'use strict';
var util = require('util');
var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
  GeneratorBase.apply(this, arguments);

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.askFor = function askFor() {

	var done = this.async();
	var currentModule = this.config.get('currentModule');
	currentModule = currentModule ? currentModule : "app";

	var prompts = [{
		type: 'list',
		name: 'type',
		message: "What kind of module would you like to make?",
		choices: ['module', 'controller', 'directive'],
		default: 'module'
	}, {
		when: function (r) {return r.type!=='module';},
		type: 'input',
		name: 'module',
		message: "Module: ",
		default: currentModule
	}, {
		type: 'input',
		name: 'name',
		message: "Name: "
	}, {
		type: 'input',
		name: 'dependencies',
		message: "Dependencies (separate with a space): "
	}, {
		when: function (r) {return r.type==='controller';},
		type: 'confirm',
		name: 'hasRoute',
		message: "Does the module have a route?",
		default: true
	}];

	this.prompt(prompts, function (results) {

		results.dependencies = _.compact(results.dependencies.split(" "));
		this.createModule(results);

		done();
	}.bind(this));
};