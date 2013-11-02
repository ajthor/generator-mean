'use strict';
var util = require('util');
var path = require('path');
var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
	GeneratorBase.apply(this, arguments);
	if(this.options["remove"]) this.removeFromConfig("scripts", this.name, false);
};

util.inherits(Generator, GeneratorBase);

Generator.prototype.askFor = function askFor() {
	if(this.options["remove"]) return;
	var done = this.async();
	this.promptForModuleValues([], function (r) {
		this.module = r;
		done();
	}.bind(this));
};

Generator.prototype.makeModule = function makeModule() {
	if(this.options["remove"]) return;
	this.module.type = 'controller';
	this.buildModule('javascript/controller.js', this.module);
	this.appendScriptsToFile(path.join(this.directories.public, 'index.html'), this.module.path);
};