'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var CommonGenerator = module.exports = function CommonGenerator() {
  GeneratorBase.apply(this, arguments);

};

util.inherits(CommonGenerator, GeneratorBase);

CommonGenerator.prototype.buildFiles = function buildFiles() {
	console.log(this.directories);
  this.template('_bower.json', 'bower.json');
  this.template('bowerrc', '.bowerrc');
  this.template('_package.json', 'package.json');
  this.template('Gruntfile.js', 'Gruntfile.js');
};

CommonGenerator.prototype.defaultModules = function defaultModules() {
  // this.createModule({
  //   name: 'app',
  //   type: 'module',
  //   dependencies: [
  //     'ngRoute',
  //     'app.controllers',
  //     'app.directives',
  //     'app.services',
  //     'app.filters'
  //   ]
  // }, 'app.js');

  // this.createModule({
  //   name: 'main',
  //   type: 'controller',
  //   dependencies: [
  //     'app'
  //   ]
  // }, 'main.js');
};
