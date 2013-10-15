'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ExpressGenerator = module.exports = function ExpressGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the express subgenerator with the argument ' + this.name + '.');
};

util.inherits(ExpressGenerator, yeoman.generators.NamedBase);

ExpressGenerator.prototype.files = function files() {
  this.copy('app.js', 'app.js');
};
