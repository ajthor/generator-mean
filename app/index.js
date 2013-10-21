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
    }, {
      name: 'Other',
      value: 'other',
      checked: false
    }]
  }, {
    when: function (r) {return r.dependencies.indexOf('other') !== -1;},
    type: 'input',
    name: 'other',
    message: "Other dependencies (separate with a space): "
  }];

  this.prompt(prompts, function (results) {
    results.dependencies = _.filter(results.dependencies, function (r) {return r !== 'other';});
    if(results.dependencies.indexOf('other') !== -1) {
      results.other = _.compact(results.other.split(" "));
      results.dependencies = _.union(results.dependencies, results.other);
    }

    console.log(results.dependencies);
    this.setConfig("dependencies", results.dependencies);
    this.dependencies = results.dependencies;

    done();
  }.bind(this));

};

MeanGenerator.prototype.buildFiles = function buildFiles() {
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('Gruntfile.js', 'Gruntfile.js');
};

MeanGenerator.prototype.defaultModules = function defaultModules() {
  this.createModule({
    name: 'app',
    type: 'module',
    dependencies: [
      'ngRoute',
      'app.controllers',
      'app.directives',
      'app.services',
      'app.filters'
    ]
  }, 'app.js');

  this.createModule({
    name: 'main',
    type: 'controller',
    dependencies: [
      'app'
    ]
  }, 'main.js');
};

MeanGenerator.prototype.directories = function directories() {
  
  var done = this.async();

  var directories = this.directories = {
    app:         "app",
    appviews:    "app/views",
    public:      "public",
    images:      "public/img",
    styles:      "public/css",
    scripts:     "public/js",
    vendor:      "public/js/vendor",
    publicviews: "public/views",
    test:        "test",
    specs:       "test/specs"
  };

  var templateDirectory = this.templateDirectory = path.join(this.sourceRoot(), '../../templates');

  this.setConfig("directories", directories);
  this.setConfig("templateDirectory", templateDirectory);

  _.each(directories, function (dir) {
    // console.log("Creating directory: " + dir);
    this.mkdir(dir);
    
    done();
  }, this);
  
};
