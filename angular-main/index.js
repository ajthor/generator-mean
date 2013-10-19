'use strict';
var util = require('util');
var SubGenerator = require('../subgenerator-lib.js');

var AngularMainGenerator = module.exports = function AngularMainGenerator(args, options, config) {
  SubGenerator.apply(this, arguments);
  
};

util.inherits(AngularMainGenerator, SubGenerator);

AngularMainGenerator.prototype.files = function files() {
	console.log("Initializing build of AngularJS-Main generator.");
	// Do stuff.

	console.log("Creating app module.");
	var done = this.async();
	this.modules = {};
	this.modules.app = {
		name: 'app',
		type: 'module',
		dependencies: ['ngRoute'],
		hasRoute: true,
		route: "/index.html"
	};

	var prompts = [{
		name: 'appName',
		message: "What is the app name?\n(Use an abbreviation, will be prefixed on modules)",
		default: 'app'
	}];

	this.prompt(prompts, function (props) {
		// extend this with props
		_.extend(this.options, props);
		done();
	}.bind(this));


	// this.saveConfigFile('modules');
	if (this.options.bowerModules.requirejs) 
		this.copy('main.js', 'public/js/main.js');
};
