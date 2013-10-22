'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args) {
  GeneratorBase.apply(this, arguments);

  args.ask = false;

  this.hookFor('mean:boilerplate', {
    args: args
  });

  this.hookFor('mean:common', {
    args: args
  });

  this.hookFor('mean:build', {
    args: args
  });

  this.on('end', function () {
    // this.installDependencies({ skipInstall: options['skip-install'] });
  });

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.askFor = function askFor() {
  // have Yeoman greet the user.
  console.log(this.yeoman);

  var done = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'dependencies',
    message: "What else would you like?",
    choices: [{
      name: 'RequireJS Support',
      value: 'requirejs',
      checked: true
    }, {
      name: 'RequireJS Text Plugin',
      value: 'requirejs-text',
      checked: true
    }]
  }];

  this.prompt(prompts, function (results) {
    // Set dependencies to an empty array.
    this.dependencies = [];
    // Add dependencies which the user selected.
    this.dependencies = results.dependencies;
    // Push on some more (default) dependencies.
    this.dependencies.push('angular');
    this.dependencies.push('angular-route');
    // And send the dependencies to the configuration file.
    this.setConfig("dependencies", this.dependencies);

    // WARNING: Need this async 'done' call to ensure hooks work???
    done();
  }.bind(this));


};

