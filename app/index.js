'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');
var JSON = require('json3');

//
// Begin generator
//

var MeanGenerator = module.exports = function MeanGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.hookFor('mean:common', {
    args: args
  });

  this.hookFor('mean:build', {
    args: args
  });

  this.on('end', function () {
    // this.installDependencies({skipInstall: options['skip-install']});
  });

};

util.inherits(MeanGenerator, yeoman.generators.Base);

MeanGenerator.prototype.setConfiguration = function setConfiguration() {

  var done = this.async();
  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Generator comes with MEAN stack built-in. What else would you lilke?',
    choices: [{
      name: 'RequireJS Support (experimental)',
      value: 'requirejs',
      checked: true
    }, {
      name: 'RequireJS Text Add-on',
      value: 'requirejs-text',
      checked: true
    }, {
      name: 'Twitter Bootstrap',
      value: 'bootstrap',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {

    this.config.set("bowerModules", props.modules);

    done();
  }.bind(this));
};
