'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
  GeneratorBase.apply(this, arguments);

  this.hookFor('mean:boilerplate', {
    args: args,
    options: {
      options: {
        "dont-ask": this.options["dont-ask"] || true
      }
    }
  });

  this.hookFor('mean:common', {
    args: args,
    options: {
      options: {
        "config-only": false
      }
    }
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.askFor = function askFor() {
  // If the argument 'dont-ask' was set, return.
  if(this.options["dont-ask"]===true) return;

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var done = this.async();

  // var prompts = [{
  //   type: 'checkbox',
  //   name: 'components',
  //   message: "What else would you like?",
  //   choices: [{
  //     name: 'RequireJS Support',
  //     value: 'requirejs',
  //     checked: true
  //   }]
  // }];

  // this.prompt(prompts, function (results) {
  //   // Set components to an empty array.
  //   this.components = [];
  //   // Add components which the user selected.
  //   _.each(results.components, function (component) {
  //     this.components.push(component);
  //   }, this);
  //   // And send the components to the configuration file.
  //   this.config.set("components", this.components);
  //   this.config.forceSave();

  //   // WARNING: Need this async 'done' call to ensure hooks work???
  //   done();
  // }.bind(this));


};



