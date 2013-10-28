'use strict';
var util = require('util');
var path = require('path');
var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
  GeneratorBase.apply(this, arguments);

  this.option("module");
};

util.inherits(Generator, GeneratorBase);

Generator.prototype.askFor = function askFor() {
	if(this.options["module"]) {
		this.appModule = this.options["module"];
		return;
	}

	var done = this.async();

	this.promptForModuleValues([], function (r) {

		r.dependencies = _.compact(r.dependencies.split(" "));
		r.path = path.join(this.devDirectories.relScripts, r.path, r.name);
		r.type = "main";

		this.appModule = r;

		done();
	});
};

Generator.prototype.makeAppModule = function makeAppModule() {
	var template = this.getTemplate('javascript/app.js');

	this.appModule = this.createModule(this.appModule);
	this.writeModule(this.appModule.path, template, this.appModule);
	this.writeSpec(this.appModule.path, this.appModule);
};

Generator.prototype.makeMainModule = function makeMainModule() {
	var template = this.getTemplate('javascript/main.js');

	this.mainModule = this.createModule({
		name: 'main',
		dependencies: [],
		path: path.join(this.directories.scripts, 'main')
	});
	
	var output = _.template(template, this.mainModule);
	this.write(this.mainModule.path + '.js', output);

	this.writeSpec(this.mainModule.path, this.mainModule);
};


