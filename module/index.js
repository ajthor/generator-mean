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

	var prompts = [{
		type: 'list',
		name: 'type',
		message: "What kind of module would you like to make?",
		choices: ['module', 'controller'],
		default: 'module'
	}, {
		type: 'input',
		name: 'name',
		message: "Name: "
		default: 'main'
	}, {
		type: 'input',
		name: 'dependencies',
		message: "Dependencies: "
	}, {
		when: function (r) {return r.type==='controller'},
		type: 'confirm',
		name: 'hasRoute',
		message: "Does the module have a route?"
		default: false
	}, {
		when: function (r) {return r.hasRoute;},
		type: 'input',
		name: 'route',
		message: "Route: "
	}];

	this.prompt(prompts, function (results) {
		results.dependencies = _.compact(results.dependencies.split(" "));
		this.buildModule(results, 'test.js');

		done();
	}.bind(this));
};