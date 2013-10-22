'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var BuildGenerator = module.exports = function BuildGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the build subgenerator with the argument ' + this.name + '.');
};

util.inherits(BuildGenerator, yeoman.generators.NamedBase);

BuildGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
