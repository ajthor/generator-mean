'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var AngularCommonGenerator = module.exports = function AngularCommonGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(AngularCommonGenerator, yeoman.generators.Base);

AngularCommonGenerator.prototype.files = function files() {
	console.log("Initializing build of AngularJS-Common generator.");
  // Do stuff.
};
