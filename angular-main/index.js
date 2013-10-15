'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var AngularMainGenerator = module.exports = function AngularMainGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(AngularMainGenerator, yeoman.generators.Base);

AngularMainGenerator.prototype.files = function files() {
	console.log("Initializing build of AngularJS-Main generator.");
  // Do stuff.
};
