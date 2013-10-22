'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args) {
  GeneratorBase.apply(this, arguments);

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.setDirectories = function setDirectories() {

	var directories = this.directories = {
		app:         "app",
		appviews:    "app/views",
		public:      "public",
		images:      "public/img",
		styles:      "public/css",
		scripts:     "public/js",
		vendor:      "public/js/vendor",
		publicviews: "public/views",
		test:        "test",
		specs:       "test/specs"
	};

};

Generator.prototype.askFor = function askFor() {
	if(this.args.ask===false) return;

	var prompts = [];
	var done = this.async();

	_.each(this.directories, function (dir, key) {
		prompts.push({
			type: 'input',
			name: key,
			message: key,
			default: dir
		});
	}, this);

	this.prompt(prompts, function (results) {

		this.directories = results;

		done();
	}.bind(this));
};

Generator.prototype.makeDirectories = function makeDirectories() {
	var done = this.async();

	_.each(this.directories, function (dir) {
		// console.log("Creating directory: " + dir);
		this.mkdir(dir);

		done();
	}, this);
};

Generator.prototype.saveConfiguration = function saveConfiguration() {

	var templateDirectory = this.templateDirectory = path.join(this.sourceRoot(), '../../templates');

	this.setConfig("directories", this.directories);
	this.setConfig("templateDirectory", this.templateDirectory);


	this.config.forceSave();
};
