'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
var async = require('async');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

	this.argument('name', { type: String, required: false });
	this.option("dont-ask");
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

//
// Configuration functions.
//

Generator.prototype.getBowerConfig = function getBowerConfig() {return this.getConfigFile('bower.json');};
Generator.prototype.getPackageConfig = function getPackageConfig() {return this.getConfigFile('package.json');};

Generator.prototype.getConfigFile = function getConfigFile(fileName) {
	if(!fileName) throw "ERR: Must supply non-falsey arguments to \'getConfigFile\' function.";
	return (function (fname) {
		var file = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), fileName)));
		return (file=='undefined') ? file : {};
	}.bind(this))(fileName);
};
Generator.prototype.setConfigFile = function setConfigFile(dest, obj, template) {
	if(!dest || !obj) throw "ERR: Must supply non-falsey arguments to \'setConfigFile\' function.";
	var output, parsed = JSON.stringify(obj);

	if(template) {
		template = this.getTemplate(path.join('common/config', template + '.js'));
		output = _.template(template, {output: parsed});
	}
	else output = parsed;
	
	this.write(dest, output);
};
Generator.prototype.showConfig = function showConfig(name) {console.log(this.config.get(name));};
Generator.prototype.pushToConfig = function pushToConfig(name, key, value, force) {
	if(!name || !value || !key) throw "ERR: Must supply non-falsey arguments to \'pushToConfig\' function."
		+ "\nname: " + name
		+ "\nvalue: " + value
		+ "\nkey: " + key;
	return (function (name, key, value, force) {

		var config = this.config.get(name) || {};
		config[key] = value;
	
		this.config.set(name, config);
		if(force) this.config.forceSave();

		return config;

	}.bind(this))(name, key, value, force);
};

//
// Template functions.
//

Generator.prototype.getTemplate = function getTemplate(templateName) {
	if(!templateName) throw "Must supply a template name to \'getTemplate\' function.";
	return (function (fname) {
		return this.readFileAsString(path.join(this.devDirectories.templates, fname));
	}.bind(this))(templateName);
};
Generator.prototype.parseTemplate = function parseTemplate(template, data, callback) {
	if(!template || !data) throw "ERR: Must supply non-falsey arguments to \'parseTemplate\' function.";
	
	var output = _.template(template, data);

	if(callback && _.isFunction(callback)) output = callback(output, data);

	return output;
};

//
// Functions for writing files.
//

Generator.prototype.writeSpec = function writeSpec(path, module) {
	if(!path || !module) throw "Must supply non-falsey values to \'writeSpec\'!";
	var template;
	
	if(this.components.indexOf('requirejs') !== -1) {
		template = this.getTemplate('spec/require-spec.js');
	} else {
		template = this.getTemplate('spec/spec.js');
	}

	var output = this.parseTemplate(template, module);

	path.replace(/\.[^/.]+$/, "");
	
	this.write(path + '.spec.js', output);
};

Generator.prototype.writeModule = function writeModule(path, module, template) {
	if(!path || !template || !module) throw "Must supply non-falsey values to \'writeModule\'!";

	this.validateModule(module);

	var output = this.parseTemplate(template, module, function (output, data) {
		if(this.components.indexOf('requirejs') == -1) return;

		var input = data;
		input.module = output;

		var requirejsTemplate = this.getTemplate('javascript/require.js');

		return _.template(requirejsTemplate, input);

	}.bind(this));

	this.write(path + '.js', output);
};

//
// Functions for dealing with Usemin blocks.
//

Generator.prototype.getUseminBlock = function getUseminBlock(file, match) {
	if(!match) match = '<!-- build:js js/main.js -->';
	var start = file.lastIndexOf("\n", file.indexOf(match)) - 1;
	var finish = file.indexOf('<!-- endbuild -->', start) + 17;
	return file.slice(start, finish);
};
Generator.prototype.removeUseminBlock = function removeUseminBlock(file, match) {
	var oldBlock = this.getUseminBlock(file, match);
	return file.replace(oldBlock, "");
};

//
// Functions for creating modules.
// 

Generator.prototype.promptForModuleValues = function promptForModuleValues(extraPrompts, callback) {
	if(extraPrompts && !_.isArray(extraPrompts)) throw "Argument must be an array. \'promptForModuleValues\'";
	var pathMsg = function () {return "(Path) " + this.directories.scripts;}.bind(this);

	var prompts = [{
		name: 'dependencies',
		type: 'input',
		message: 'Dependencies: '
	}, {
		name: 'path',
		type: 'input',
		message: pathMsg()
	}];

	prompts = _.union(prompts, extraPrompts);

	this.prompt(prompts, callback);

};

Generator.prototype.createModule = function createModule(values) {
	if(!values) throw "ERR: 'values' is falsey: " + values;
	// Defaults for any missing values.
	var module = _.defaults(values, {
		type: 'module',
		name: this.name || '',
		dependencies: [],
		specDependencies: [this.name],
		path: ''
	});
	// Set name if unspecified.
	if(module.name === '') module.name = module.type;

	// Post-processing.
	if(_.isString(module.dependencies)) 
		module.dependencies = _.compact(module.dependencies.split(" "));

	module.path = path.join(this.directories.scripts, module.path, module.name);

	this.pushToConfig("scripts", module.name, module.path + '.js');


	this.validateModule(module);
	// Return new module.
	return module;
};

Generator.prototype.buildModule = function buildModule(template, values, hasSpec) {
	if(!template) throw "Must pass a template to the function: \'buildModule\'.";

	var template = this.getTemplate(template);
	var module = this.createModule(values);

	this.writeModule(module.path, module, template);
	if(!(hasSpec===false) || hasSpec===true) 
		this.writeSpec(module.path, module);
};

// Overwritable function to validate modules according to the user.
Generator.prototype.validateModule = function validateModule(module) {
	if(!module) throw "ERR: 'module' is falsey: " + module;
	
	return module;
};

//
// Functions for writing scripts to files.
//

Generator.prototype.wireScriptBlockToFile = function wireScriptBlockToFile(file, scripts, remove) {
	
	if(remove===true) file = this.removeUseminBlock(file);

	if(this.components.indexOf('requirejs') !== -1) {
		file = this.appendScripts(file, 'js/main.js', [path.join(this.devDirectories.relVendor, 'requirejs/require.js')], {'data-main': path.join(this.devDirectories.relScripts, 'main')});
	} else {
		file = this.appendScripts(file, 'js/main.js', scripts);
	}

	return file;
};

Generator.prototype.appendScriptsToFile = function appendScriptsToFile(fileName, remove) {
	if(!fileName) throw "Must supply a fileName to \'appendScriptsToFile\' function.";
	var file = this.readFileAsString(fileName);
	var scripts = _.toArray(this.config.get("scripts"));

	file = this.wireScriptBlockToFile(file, scripts, remove);

	this.write(fileName, file);
};


