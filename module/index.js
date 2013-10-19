'use strict';
var util = require('util');
var SubGenerator = require('../subgenerator-lib.js');
var _ = require('underscore');
var prettyjson = require('prettyjson');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  SubGenerator.apply(this, arguments);
  
};

util.inherits(ModuleGenerator, SubGenerator);

ModuleGenerator.prototype.ask = function ask() {

	var done = this.async();
	this.modules || (this.modules = {});

	console.log("\n\nInitializing build of AngularJS-Modules generator.");
	// Do stuff.

	var prompts = [{
		type: 'list',
		name: 'type',
		message: 'What type of module would you like to add?',
		choices: ['controller', 'module']
	}, {
		type: 'input',
		name: 'name',
		message: 'What is the name of the module?',
	}, {
		type: 'input',
		name: 'dependencies',
		message: "What are the dependencies of this module? \n(Separate multiple dependencies with spaces)"
	}, {
		when: function (r) {return r.type == 'controller';},
		type: 'confirm',
		name: 'hasRoute',
		message: "Does the controller have a route?",
		default: false
	}, {
		when: function (r) {return r.hasRoute;},
		type: 'input',
		name: 'route',
		message: "What is the name of the route?",
		default: "index.html"
	}];

	this.prompt(prompts, function (props) {
		// extend this with props

		props.dependencies = _.compact(props.dependencies.split(" "));

		this.modules[props.name] = _.pick(props, 'type', 'name', 'dependencies', 'hasRoute', 'route');

		done();
	}.bind(this));

};

ModuleGenerator.prototype.deps = function deps() {

	var done  = this.async();
	var deps = _.flatten(_.pluck(this.modules, 'dependencies'));
	var keys = _.keys(this.modules);
	deps = _.difference(deps, keys);

	var msg = function() {
		return "Do you want to create modules for the dependencies:\n" + deps;
	};
	var prompts = [{
		when: function (response) {
			return deps.length;
		},
		type: 'confirm',
		name: 'makeDeps',
		message: msg(),
		default: true
	}];

	this.prompt(prompts, function (props) {
		// Do something.
		if(props.makeDeps) {
			_.each(deps, function (dep) {
				this.modules[dep] = {
					name: dep,
					type: 'controller',
					dependencies: [],
					hasRoute: false,
					route: ""
				};

			}, this);
		}
		done();
	}.bind(this));
};

ModuleGenerator.prototype.setOtherOptions = function setOtherOptions() {

	_.each(this.modules, function (module) {
		
		module.appName = this.config.get.appName;
		module.directory = module.name.substring(0, module.name.lastIndexOf('/')+1);
		module.name = module.name.substring(module.name.lastIndexOf('/')+1);
		
	}, this);

};

ModuleGenerator.prototype.confirm = function confirm() {
	var done = this.async();
	var msg = function() {
		return "Modules:\n\n" + prettyjson.render(this.modules) + "\n\nDoes this look good?";
	}.bind(this);

	var prompts = [{
		type: 'confirm',
		name: 'looksGood',
		message: msg(),
		default: true
	}];

	this.prompt(prompts, function (props) {
		if(props.looksGood) this.config.set('modules', this.modules);
		// this.write('config/modules.json', JSON.stringify(this.modules));
		done();
	}.bind(this));

};
