'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('underscore');

var JSON = require('json3');


var MeanGenerator = module.exports = function MeanGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.hookFor('mean:angular-main', {args: args});
  this.hookFor('mean:angular-module', {args: args});
  this.hookFor('mean:build', {args: args});
  this.hookFor('mean:express', {args: args});

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MeanGenerator, yeoman.generators.Base);

MeanGenerator.prototype.ask = function ask() {
  var done = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'project',
    message: 'What is the name of the project?',
    default: 'test'
  }, {
    name: 'description',
    message: 'Give a quick description: '
  }, {
    type: 'checkbox',
    name: 'features',
    message: 'Generator comes with MEAN stack built-in. What else would you lilke?',
    choices: [{
      name: 'RequireJS Support',
      value: 'requirejs',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    // extend this with props
    _.extend(this, props);
    this.write('config/config.json', JSON.stringify(props));

    done();
  }.bind(this));
};

MeanGenerator.prototype.packageFiles = function packageFiles() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

MeanGenerator.prototype.projectFiles = function projectFiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

MeanGenerator.prototype.directoryStructure = function directoryStructure() {
  this.mkdir('app');
  this.mkdir('app/views');
  this.mkdir('config');
  this.mkdir('public/css');
  this.mkdir('public/img');
  this.mkdir('public/js');
  this.mkdir('public/js/vendor');
  this.mkdir('public/views');
  this.mkdir('public/partials');
  this.mkdir('test');
};
