'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
	GeneratorBase.apply(this, arguments);

	this.option("dont-ask");
};

util.inherits(Generator, GeneratorBase);

Generator.prototype.setDirectories = function setDirectories() {
	// Set default directory structure.
	this.directories = {
		app:            "app",
		appviews:       "app/views",
		approutes:      "app/routes",
		appcontrollers: "app/controllers",
		appmodels:      "app/models",
		public:         "public",
		images:         "public/img",
		styles:         "public/css",
		scripts:        "public/js",
		vendor:         "public/js/vendor",
		publicviews:    "public/views",
		config:         "config",
		test:           "test",
		specs:          "test/specs",
		build:          "build",
	};
	// Set 'development' directories.
	this.devDirectories = {
		templates:      path.join(this.sourceRoot(), '../../templates'),
		relScripts:     "./js",
		relVendor:      "./js/vendor"
	};
};

Generator.prototype.askForDirectories = function askForDirectories() {
	// If the argument 'dont-ask' was set, return.
	if(this.options["dont-ask"]===true) return;
	// Otherwise, set up to ask the user for some input.
	var done = this.async();
	var prompts = [];
	// Give some instructions.
	console.log(this.instructions(
		"Setting directories manually. Be careful what directories you use. " +
		"If you make a mistake, exit the generator using (Control+C) and retry. " +
		"If you want to use the default directories, run: " + 
		"[yo mean:boilerplate --dont-ask]"
		));
	// Populate the prompts array.
	_.each(this.directories, function (dir, key) {
		prompts.push({
			type: 'input',
			name: key,
			message: key,
			default: dir
		});
	}, this);
	// Ask the user one by one and replace directories.
	this.prompt(prompts, function (results) {
		// Set to new directories.
		this.directories = results;

		done();
	}.bind(this));
};

Generator.prototype.makeDirectories = function makeDirectories() {
	// Cycle through object, creating directories as specified.
	_.each(this.directories, function (dir) {

		this.mkdir(dir);

	}, this);
};

Generator.prototype.saveConfiguration = function saveConfiguration() {
	this.config.set("directories", this.directories);
	this.config.set("devDirectories", this.devDirectories);

	this.config.forceSave();
};

Generator.prototype.copyBoilerplateFiles = function copyBoilerplateFiles() {
	this.copy(path.join(this.devDirectories.templates, 'boilerplate/server.js'), 'server.js');
	this.copy(path.join(this.devDirectories.templates, 'boilerplate/routes.js'), path.join(this.directories.app, 'routes.js'));
	this.copy(path.join(this.devDirectories.templates, 'boilerplate/routes/index.js'), path.join(this.directories.approutes, 'index.js'));

	this.copy(path.join(this.devDirectories.templates, 'boilerplate/public/robots.txt'), path.join(this.directories.public, 'robots.txt'));
	this.copy(path.join(this.devDirectories.templates, 'boilerplate/public/humans.txt'), path.join(this.directories.public, 'humans.txt'));

	this.copy(path.join(this.devDirectories.templates, 'boilerplate/public/css/main.css'), path.join(this.directories.styles, 'main.css'));
	this.copy(path.join(this.devDirectories.templates, 'boilerplate/public/css/normalize.min.css'), path.join(this.directories.styles, 'normalize.min.css'));

	this.copy(path.join(this.devDirectories.templates, 'boilerplate/test/test-main.js'), path.join(this.directories.test, 'test-main.js'));
};

