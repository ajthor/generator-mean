'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var JSON = require('json3');

var AngularMainGenerator = module.exports = function AngularMainGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(AngularMainGenerator, yeoman.generators.Base);

AngularMainGenerator.prototype.files = function files() {
	console.log("Initializing build of AngularJS-Main generator.");
	// Do stuff.

	console.log("Creating app module.");

	this.modules = {};

	this.modules.main = {
		name: 'app',
		type: 'controller',
		dependencies: []
	};

	this.write('config/modules.json', JSON.stringify(this.modules));
	// if (this.config.modules.requirejs) 
		this.copy('main.js', 'public/js/main.js');
};
