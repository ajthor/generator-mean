'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('underscore');

var JSON = require('json3');
var prettyjson = require('prettyjson');

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(BuildGenerator, yeoman.generators.Base);

BuildGenerator.prototype.build = function build() {
	console.log("\n\nInitializing build...");
	// Do stuff.
	this.modules = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'config/modules.json')));

};

BuildGenerator.prototype.controllers = function controllers() {
	// Do stuff.
	var    modules = _.where(this.modules, {type: 'controller'});
	_.each(modules, function (module) {
		var controller = _.template(this.readFileAsString(path.join(this.sourceRoot(), 'controller.js')), module);

		module.module = controller;
		this.template('require.js', 'public/js/controllers/' + module.name + '.js', module);
	}.bind(this));
};

// BuildGenerator.prototype.create = function create() {
// 	var obj = {};
// 	obj.dependencies = ['something'];
// 	obj.module = this.readFileAsString(path.join(this.sourceRoot(), 'controller.js'));
// 	_.template(obj.module, )
// 	this.template('require.js', 'test.js', obj);
// };

