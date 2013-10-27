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

Generator.prototype.getBowerConfig = function getBowerConfig() {return this.getConfigFile('bower.json');};

Generator.prototype.getPackageConfig = function getPackageConfig() {return this.getConfigFile('package.json');};

Generator.prototype.getConfigFile = function getConfigFile(fileName) {
	if(!fileName) throw "ERR: Must supply non-falsey arguments to \'getConfigFile\' function.";
	return (function (fname) {
		var file = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), fileName)));
		return (file=='undefined') ? file : {};
	}.bind(this))(fileName);
};

Generator.prototype.setConfigFile = function setConfigFile(dest, obj, isModule) {
	if(!obj || !dest) throw "ERR: Must supply non-falsey arguments to \'setConfigFile\' function.";
	var output, parsed = JSON.stringify(obj);
	
	if(isModule===true) output = "module.exports = " + parsed + ";";
	else output = parsed;
	
	this.write(dest, output);
};


Generator.prototype.validateModule = function validateModule(module) {
	if(!module) throw "ERR: 'module' is falsey: " + module;
	module = _.defaults(module, {
		name: _.uniqueId(),
		dependencies: [],
		path: this.directories.scripts
	});
	return module;
};

Generator.prototype.getTemplate = function getTemplate(templateName) {
	return (function (fname) {
		return this.readFileAsString(path.join(this.devDirectories.templates, fname));
	}.bind(this))(templateName);
};

Generator.prototype.getModuleValues = function getModuleValues(callback) {
	var results = {};
	
	var done = this.async();
	var pathMsg = function () {return this.directories.scripts;}.bind(this);

	var prompts = [{
		name: 'name',
		type: 'input',
		message: 'Name: '
	}, {
		name: 'dependencies',
		type: 'input',
		message: 'Dependencies: '
	}, {
		name: 'path',
		type: 'input',
		message: 'Path: ',
		default: pathMsg()
	}];

	this.prompt(prompts, callback.bind(this));

	return results;
};

Generator.prototype.createModule = function createModule(obj) {
	if(!obj) throw "ERR: Must supply non-falsey arguments to \'createModule\' function.";
	var module = {};

	module = this.validateModule(obj);
	
	console.log("Adding " + module.path + " to {scripts} configuration.");
	this.pushToConfig("scripts", module.name, module.path);

	return module;
};

Generator.prototype.pushToConfig = function pushToConfig(name, key, value, force) {
	if(!name || !value || !key) throw "ERR: Must supply non-falsey arguments to \'pushToConfig\' function.";
	return (function (name, key, value, force) {

		var config = this.config.get(name) || {};
		config[key] = value;
	
		this.config.set(name, config);
		if(force) this.config.forceSave();

		return config;

	}.bind(this))(name, key, value, force);
};

Generator.prototype.showConfig = function showConfig(name) {console.log(this.config.get(name));};

Generator.prototype.parseTemplate = function parseTemplate(template, module) {
	if(!template || !module) throw "ERR: Must supply non-falsey arguments to \'parseTemplate\' function.";
	var input, output, requirejsTemplate;
	
	input = this.validateModule(module);

	output = _.template(template, input);

	if(this.components.indexOf('requirejs') !== -1) {
		input = module;
		input.output = output;

		requirejsTemplate = this.getTemplate('javascript/require.js');

		output = _.template(requirejsTemplate, input);

	}

	return output;
};

Generator.prototype.writeModule = function writeModule(path, output) {
	this.write(path, output);
};

Generator.prototype.getScriptBlock = function getScriptBlock(file) {
	var start = file.indexOf('<!-- build:js js/main.js -->');
	var finish = file.indexOf('<!-- endbuild -->') + 17;

	return file.slice(start, finish);
};

Generator.prototype.generateScriptBlock = function generateScriptBlock(path, files) {
	return this.generateBlock("js", path, files);
};

Generator.prototype.replaceScriptBlock = function replaceScriptBlock(file, newBlock) {
	var oldBlock = this.getScriptBlock(file);
	return file.replace(oldBlock, newBlock);
};

Generator.prototype.writeScriptsToFile = function writeScriptsToFile(file) {
	
	if(this.components.indexOf('requirejs') !== -1) {
		file = this.appendScripts(file, 'js/main.js', [path.join(this.directories.vendor, 'requirejs/require.js')], {'data-main': path.join(this.directories.scripts, 'main')});
	} else {
		file = this.appendScripts(file, 'js/main.js', _.toArray(this.config.get("scripts")));
	}

	return file;

};


        // <!-- build:js js/main.js -->
        // <% _.each(scripts, function (script) { %><script src="<%= script %>"></script><% }); %>
        // <!-- endbuild -->
