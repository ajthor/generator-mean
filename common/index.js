'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
  GeneratorBase.apply(this, arguments);

  this.option("config-only");
};

util.inherits(Generator, GeneratorBase);

Generator.prototype.setPackageFiles = function setPackageFiles() {
  if(this.options['config-only']===true) return;

  var packageConfig = JSON.parse(this.readFileAsString(path.join(this.devDirectories.templates, 'common/_package.json')));

  packageConfig.dependencies = {
    "express": "*",
    "jade": "*",
    "mongoose": "*",
    "bower": "*",
    "grunt": "*",
    "grunt-cli": "*",
    "async": "*",
    "lodash": "*"
  };

  packageConfig.devDependencies = {
    "karma": "*",
    "karma-mocha": "*",
    "mocha": "*",
    "chai": "*",
    "time-grunt": "*",
    "load-grunt-tasks": "*",
    "grunt-contrib-watch": "*",
    "grunt-contrib-clean": "*",
    "grunt-contrib-jshint": "*",
    "grunt-nodemon": "*",
    "grunt-concurrent": "*",
    "grunt-karma": "*",
    "grunt-mocha-test": "*"
  };

  this.setConfigFile('package.json', packageConfig);
};

Generator.prototype.setBowerFiles = function setBowerFiles() {
  if(this.options['config-only']===true) return;

  var bowerConfig = JSON.parse(this.readFileAsString(path.join(this.devDirectories.templates, 'common/_bower.json')));

  bowerConfig.dependencies = {
    "jquery": "~1.9.1",
    "angular": "~1.0.8",
    "angular-route": "*",
    "angular-resource": "*",
    "angular-bootstrap": "*",
    "angular-ui-utils": "*"
  };

  this.pushToConfig("scripts", "jquery", path.join("js/vendor/jquery/jquery.min.js"));
  this.pushToConfig("scripts", "angular", path.join("js/vendor/angular/angular.min.js"));
  this.pushToConfig("scripts", "angular-bootstrap", path.join("js/vendor/angular-bootstrap/ui-bootstrap.min.js"));
  this.pushToConfig("scripts", "angular-route", path.join("js/vendor/angular-route/angular-route.min.js"));

  this.showConfig("scripts");

  _.each(this.components, function (component) {
    bowerConfig.dependencies[component] = "*";
  });

  this.setConfigFile('.bowerrc', {
    directory: this.directories.vendor
  });

  this.setConfigFile('bower.json', bowerConfig);
};

Generator.prototype.setGeneralConfig = function setGeneralConfig() {
  this.setConfigFile(path.join(this.directories.config, 'config.js'), {
    PORT: 3000,
    dir: this.directories
  }, true);
};

Generator.prototype.copyGruntfile = function copyGruntfile() {
  if(this.options['config-only']===true) return;
  this.template(path.join(this.devDirectories.templates, 'common/Gruntfile.js'), 'Gruntfile.js');
};

Generator.prototype.writeIndexFile = function writeIndexFile() {
  if(this.options['config-only']===true) return;
  this.indexFile = this.readFileAsString(path.join(this.devDirectories.templates, 'boilerplate/public/index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  if(this.components.requirejs) {
    this.indexFile = this.appendScripts(this.indexFile, 'js/main.js', 
      [path.join(this.directories.vendor, 'requirejs/require.js')], {'data-main': path.join(this.directories.scripts, 'main')});
  } else {
    this.indexFile = this.appendScripts(this.indexFile, 'js/main.js',
      _.toArray(this.config.get("scripts")));
  }

  this.write(path.join(this.directories.public, 'index.html'), this.indexFile);
};




