'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var MeanGenerator = module.exports = function MeanGenerator() {
  GeneratorBase.apply(this, arguments);

  this.on('end', function () {
    // this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MeanGenerator, GeneratorBase);

MeanGenerator.prototype.askFor = function askFor() {
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
  }, {
    when: function (r) {return r.dependencies.indexOf('other') !== -1;},
    type: 'input',
    name: 'other',
    message: "Other dependencies (separate with a space): "
  }];

  this.prompt(prompts, function (results) {

    console.log(results.dependencies);
    this.setConfig("dependencies", results.dependencies);
    this.dependencies = results.dependencies;

    done();
  }.bind(this));

};

