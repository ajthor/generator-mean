'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
var async = require('async');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

	// Set these values as attributes of generators. 
	// These will be available to all generators that inherit this one.
	this.components = this.config.get('components');
	this.directories = this.config.get('directories');
	this.devDirectories = this.config.get('devDirectories');

};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.instructions = function instructions(msg) {
	var len = msg.length;
	var i, num = Math.ceil(len/80);
	var output = [];

	for(i=0; i<num; i++) {
		output+=(msg.substring(i*80, (i*80)+80).trim())+"\n";
	}
	
	return output;
};

Generator.prototype.getBowerConfig = function getBowerConfig(msg) {
	return (function () {
		var file = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'bower.json')));
		return file;
	})();
};

Generator.prototype.getPackageConfig = function getPackageConfig(msg) {
	return (function () {
		var file = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'package.json')));
		return file;
	})();
};

// Generator.prototype.getConfig = function getConfig(key) {
// 	// Fetch a result.
// 	var result = this.config.get(key);
// 	// If the result is undefined,
// 	if (!result) {
// 		// Throw an error if optional second argument is passed.
// 		if (arguments[1]===true) {
// 			console.log(arguments); 
// 			throw "Config value \'" + key + "\'' is not set. Try running the generator again.";
// 		}
// 		// Or just return void if you don't want to break anything.
// 		else { 
// 			return void 0;
// 		}
// 	}
// 	// And return the result if everything is fine.
// 	return result;
// };
// Generator.prototype.setConfig = function setConfig(key, value) {
// 	this.config.set(key, value);
// 	// Possibly force save here. Not sure yet.
// 	this.config.forceSave();
// };

Generator.prototype.validateModule = function validateModule(module) {};
Generator.prototype.buildModule = function buildModule(module, dest) {};

Generator.prototype.getIndex = function getIndex(src) {};

Generator.prototype.saveIndex = function saveIndex(dest) {};

// Generator.prototype.createModule = function createModule(module, template, dest) {
// 	var index, compiledPath;
// 	// Make sure module is 'valid'
// 	if (!this.validateModule(module)) {
// 		// If not, set some defaults.
// 		module = _.defaults(module, {
// 			name: 'main',
// 			type: 'module',
// 			dependencies: []
// 		});
// 	}

// 	// If the module is a 'module', ...
// 	if (module.type === 'module') {
// 		// Set it as the current working module.
// 		this.setConfig('currentModule', module.name);
// 		// And set the module property to the module name.
// 		module.module = module.name;
// 	}
// 	// Otherwise, set the module property to whatever the current working module is.
// 	else {
// 		if(!module.module) {
// 			module.module = this.config.get('currentModule');
// 		}
// 	}

// 	// Set the path property to be either the destination argument or 
// 	// a combination of the scripts directory, the current module, and the module name.
// 	if(dest) {
// 		module.path = dest;
// 	}
// 	else {
// 		compiledPath = path.join(this.directories.scripts, module.module, module.name);
// 		// path with extension.
// 		module.path = compiledPath+'.js';
// 		// rpath without extension.
// 		module.rpath = compiledPath;
// 	}

// 	// Get just the name from the module. Exclude slashes.
// 	if((index = module.name.lastIndexOf('/')) !== -1) 
// 		module.name = module.name.substring(index + 1);

// 	// Save and build.
// 	this.saveModule(module);
// 	this.buildModules(module, template, dest);
// };

// Generator.prototype.validateModule = function validateModule(module) {
// 	// If the module is undefined, ...
// 	if (!module) throw "Module is undefined. Value: " + module;
// 	// or has any missing values, ...
// 	var conditionOne = _.has(module, 'name');
// 	var conditionTwo = _.has(module, 'value');
// 	var conditionThree = _.has(module, 'dependencies');
// 	// return false. Otherwise, true.
// 	return (!conditionOne || !conditionTwo || !conditionThree) ? false : true;
// };

// Generator.prototype.saveModule = function saveModule(module) {
// 	// Get current modules object.
// 	var modules = this.getConfig('modules', false);
// 	// If undefined, set as empty object.
// 	modules || (modules = {});

// 	// Set modules object to include this module.
// 	modules[module.name] = module;
// 	// Save to config.
// 	this.setConfig('modules', modules);
// };

// Generator.prototype.saveScriptPath = function saveScriptPath(path) {
// 	// Get current scripts object.
// 	var scripts = this.getConfig('scripts', false);
// 	// If undefined, set as empty object.
// 	scripts || (scripts = []);

// 	// Set scripts object to include this module.
// 	scripts.push(path);
// 	// Save to config.
// 	this.setConfig('scripts', scripts);
// };

// Generator.prototype.buildModules = function buildModules(modules, template, dest) {
// 	if (!modules) throw "Must supply a module or array of modules to build routine.";

// 	// Cast to an array.
// 	if (!_.isArray(modules)) modules = [modules];

// 	// START LOOP
// 	async.eachSeries(modules, function (module) {
// 		var i, result, output;

// 		// Template is either the supplied argument or the module type + .js
// 		if(!template) {
// 			template = module.type + '.js';
// 		}
// 		// Get template from file.
// 		template = this.readFileAsString(path.join(this.templateDirectory, template));
		
// 		// Destination is either argument or module.path
// 		// Handled here again in case 'build' is called separately from 'create'.
// 		module.path = dest ? dest : module.path;

// 		// Output is the template with values filled in.
// 		output = _.template(template, module);
// 		// If require.js is specified as a component, ...
// 		if (this.components.indexOf('requirejs') !== -1) {
// 			// Run the output through another template for require.js modules.
// 			module.output = output;
// 			output = _.template(this.readFileAsString(path.join(this.templateDirectory, 'require.js')), module);
// 		}
// 		// Finally, write it.
// 		yeoman.generators.Base.prototype.write.apply(this, [module.path, output]);
	
// 	// END LOOP
// 	}.bind(this));
// };

// Generator.prototype.buildIndex = function buildIndex() {
// 	this.indexFile = this.readFileAsString(path.join(this.templateDirectory, 'boilerplate/index.html'));
// 	this.indexFile = this.engine(this.indexFile, this);

// 	this.indexFile = this.appendScripts(this.indexFile, 'js/main.js', ['js/main.js']);

// 	this.write(this.directories.publicviews, this.indexFile);

// };



