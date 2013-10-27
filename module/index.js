'use strict';
var util = require('util');
var path = require('path');
var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
  GeneratorBase.apply(this, arguments);

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.askFor = function askFor() {
	
	var done = this.async();

	this.getModuleValues(function (r) {

		r.dependencies = _.compact(r.dependencies.split(" "));
		r.path = path.join(r.path, r.name) + ".js";

		this.module = r;

		done();
	});
};

Generator.prototype.makeModule = function makeModule() {

	this.module = this.createModule(this.module);

	var template = this.getTemplate('javascript/module.js');

	var output = this.parseTemplate(template, this.module);

	this.writeModule(this.module.path, output);

};