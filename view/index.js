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
	this.promptForModuleValues([], function (r) {
		this.module = r;
		done();
	}.bind(this));
};

Generator.prototype.makeModule = function makeModule() {
	this.module.type = 'view';
	this.buildModule('javascript/view.js', this.module);
	this.appendScriptsToFile(path.join(this.directories.public, 'index.html'), true);
};