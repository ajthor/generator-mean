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
	var done = this.async();
	this.modules = {};

	var prompts = [{
		name: 'name',
		message: "What is the app name?\n(Use an abbreviation, will be prefixed on modules)",
		default: 'app'
	}];

	this.prompt(prompts, function (props) {
		// extend this with props
		this.modules.app = {
			name: 'app',
			type: 'controller',
			dependencies: [],
			hasRoute: true,
			route: "/index.html"
		};
		this.modules.app.name = props.name || "app";

		done();
	}.bind(this));	

	this.write('config/modules.json', JSON.stringify(this.modules));
	// if (this.config.modules.requirejs) 
		this.copy('main.js', 'public/js/main.js');
};
