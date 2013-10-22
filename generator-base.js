'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

	// Set these values as attributes of generators. 
	// These will be available to all generators that inherit this one.
	this.dependencies = this.getConfig('dependencies');
	this.directories = this.getConfig('directories');
	this.templateDirectory = this.getConfig('templateDirectory');
	
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.getConfig = function getConfig(key) {
	// Fetch a result.
	var result = this.config.get(key);
	// If the result is undefined,
	if (!result) {
		// Throw an error if optional second argument is passed.
		if (arguments[1]===true) {
			console.log(arguments); 
			throw "Config value \'" + key + "\'' is not set. Try running the generator again.";
		}
		// Or just return void if you don't want to break anything.
		else { 
			return void 0;
		}
	}
	// And return the result if everything is fine.
	return result;
};

Generator.prototype.setConfig = function setConfig(key, value) {
	this.config.set(key, value);
	// Possibly force save here. Not sure yet.
	// this.config.forceSave();
};

Generator.prototype.createModule = function createModule(module, template, dest) {
	var path;
	// Make sure module is 'valid'
	if (!this.validateModule(module)) {
		// If not, set some defaults.
		module = _.defaults(module, {
			name: 'main',
			type: 'module',
			dependencies: []
		});
	}

	// If the module is a 'module', ...
	if (module.type === 'module') {
		// Set it as the current working module.
		this.setConfig('currentModule', module.name);
		// And set the module property to an empty string.
		module.module = "";
	}
	// Otherwise, set the module property to whatever the current working module is.
	else {
		if(!module.module) {
			module.module = this.config.get('currentModule');
		}
	}

	// If destination is passed, set it here.
	if(dest) {
		module.path = dest;
	}
	// Otherwise, interpret it from values.
	else {
		// Set the path property to be either the destination argument or 
		// a combination of the scripts directory, the current module, and the module name.
		path = path.join(this.directories.scripts, module.module, module.name);
		// path with extension.
		module.path = path+'.js';
		// rpath without extension.
		module.rpath = path;
	}

	// Save and build.
	this.saveModule(module);
	this.buildModule(module, template, dest);
};

Generator.prototype.validateModule = function validateModule(module) {
	// If the module is undefined, ...
	if (!module) throw "Module is undefined. Value: " + module;
	// or has any missing values, ...
	var conditionOne = _.has(module, 'name');
	var conditionTwo = _.has(module, 'value');
	var conditionThree = _.has(module, 'dependencies');
	// return false. Otherwise, true.
	return (!conditionOne || !conditionTwo || !conditionThree) ? false : true;
};

Generator.prototype.saveModule = function saveModule(module) {
	// Get current modules object.
	var modules = this.getConfig('modules', false);
	// If undefined, set as empty object.
	modules || (modules = {});

	// Set modules object to include this module.
	modules[module.name] = module;
	// Save to config.
	this.setConfig('modules', modules);
};

Generator.prototype.buildModule = function buildModule(module, template, dest) {
	var output;
	// Validate to make sure the module can be used here.
	this.validateModule(module);

	// Template is either the supplied argument or the module name + .js
	if(!template) {
		template = module.type + '.js';
	}
	// Get template from file.
	template = this.readFileAsString(path.join(this.templateDirectory, (template)));

	// START LOOP
	// Destination is either argument or module.path
	// Handled here again in case 'build' is called separately from 'create'.
	dest = dest ? dest : module.path;
	// Output is the template with values filled in.
	output = _.template(template, module);
	// If require.js is specified as a component, ...
	if (this.dependencies.indexOf('requirejs') !== -1) {
		// Run the output through another template for require.js modules.
		module.output = output;
		output = _.template(this.readFileAsString(path.join(this.templateDirectory, 'require.js')), module);
	}
	// Finally, write it.
	yeoman.generators.Base.prototype.write.apply(this, [dest, output]);
	// END LOOP

};