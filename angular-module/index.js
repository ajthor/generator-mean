'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('underscore');

var JSON = require('json3');
var prettyjson = require('prettyjson');

var AngularModuleGenerator = module.exports = function AngularModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(AngularModuleGenerator, yeoman.generators.Base);

AngularModuleGenerator.prototype.ask = function ask() {

	var done = this.async();

	console.log("\n\nInitializing build of AngularJS-Modules generator.");
	// Do stuff.
	this.modules = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'config/modules.json')));

	var prompts = [{
		type: 'list',
		name: 'type',
		message: 'What type of module would you like to add?',
		choices: ['controller', 'view', 'module']
	}, {
		type: 'input',
		name: 'name',
		message: 'What is the name of the module?',
	}, {
		type: 'input',
		name: 'dependencies',
		message: "What are the dependencies of this module? \n(Separate multiple dependencies with spaces)"
	}];

	this.prompt(prompts, function (props) {
		// extend this with props

		props.dependencies = _.compact(props.dependencies.split(" "));
		this.modules[props.name] = _.pick(props, 'type', 'name', 'dependencies');

		done();
	}.bind(this));

};

AngularModuleGenerator.prototype.deps = function deps() {

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
					dependencies: []
				};

			}, this);
		}
		done();
	}.bind(this));
};

// AngularModuleGenerator.prototype.another = function another() {
// 	var done = this.async();
// 	var another = true;
// 	var prompts = [{
// 		type: 'confirm',
// 		name: 'another',
// 		message: 'Would you like to create another module?',
// 		default: false
// 	}];

// 	for(var i = 0;another;i++) {
// 		this._ask();
// 		this.prompt(prompts, function (props) {
// 			another = props.another;
// 			done();
// 		}.bind(this));

// 		if(i==5) another = false; 
// 	}
// };

AngularModuleGenerator.prototype.confirm = function confirm() {
	var done = this.async();
	var msg = function() {
		return "module.json\n\n" + prettyjson.render(this.modules) + "\n\nDoes this look good?";
	}.bind(this);

	var prompts = [{
		type: 'confirm',
		name: 'looksGood',
		message: msg(),
		default: true
	}];

	this.prompt(prompts, function (props) {
		if(props.looksGood) this.write('config/modules.json', JSON.stringify(this.modules));
		done();
	}.bind(this));

};
