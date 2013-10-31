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

Generator.prototype.setBowerFiles = function setBowerFiles() {
  var bowerConfig = JSON.parse(this.readFileAsString(path.join(this.devDirectories.templates, 'common/_bower.json')));

  bowerConfig.dependencies = {
    "jquery": "~1.9.1",
    "angular": "latest",
    "angular-route": "*",
    "angular-bootstrap": "*",
    "angular-resource": "*",
    "angular-cookies": "*"
  };

  bowerConfig.resolutions = {
    "angular": "1.2.0-rc.3"
  };

  this.pushToConfig("scripts", "jquery", path.join(this.devDirectories.relVendor, "/jquery/jquery.js"));
  this.pushToConfig("scripts", "angular", path.join(this.devDirectories.relVendor, "/angular/angular.js"));

  _.each(this.components, function (component) {
    bowerConfig.dependencies[component] = "*";
  });

  this.setConfigFile('.bowerrc', {
    directory: this.directories.vendor
  });

  this.setConfigFile('bower.json', bowerConfig);
};

Generator.prototype.setPackageFiles = function setPackageFiles() {
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
    "grunt-karma": "*",
    "karma": "*",
    "karma-jasmine": "*",
    "karma-requirejs": "*",
    "time-grunt": "*",
    "load-grunt-tasks": "*",
    "grunt-contrib-watch": "*",
    "grunt-contrib-clean": "*",
    "grunt-contrib-jshint": "*",
    "grunt-nodemon": "*",
    "grunt-concurrent": "*",
    "grunt-bower-requirejs": "*"
  };

  this.setConfigFile('package.json', packageConfig);
};

Generator.prototype.setGeneralConfig = function setGeneralConfig() {
  this.setConfigFile(path.join(this.directories.config, 'config.js'), {
    PORT: 3000,
    dir: this.directories,
    devDir: this.devDirectories
  }, "module");
};

Generator.prototype.setRequirejsConfig = function setRequirejsConfig() {
  if(this.components.indexOf('requirejs') === -1) return;

  this.setConfigFile(path.join(this.directories.config, 'requirejs.config.js'), {
    baseUrl: '../public/js',
    paths: {
      'angular': 'vendor/angular/angular'
    },
    shim: {
      'angular' : {'exports' : 'angular'}
    }
  }, "require");
};

Generator.prototype.copyGruntfile = function copyGruntfile() {

  this.template(path.join(this.devDirectories.templates, 'common/Gruntfile.js'), 'Gruntfile.js');
};

Generator.prototype.makeAppModule = function makeAppModule() {
  if(this.options['config-only']===true) return;
  this.buildModule('common/app.js', {name: 'app', specDependencies: ['app']});
};

Generator.prototype.makeMainModule = function makeMainModule() {
  if(this.options['config-only']===true) return;
  if(this.components.indexOf('requirejs') === -1) return;
  var template = this.getTemplate('common/main.js');

  this.mainModule = this.createModule({
    name: 'main'
  });
  
  var output = this.parseTemplate(template, this.mainModule);
  this.write(this.mainModule.path + '.js', output);
};

Generator.prototype.writeIndexFile = function writeIndexFile() {
  if(this.options['config-only']===true) return;

  this.indexFile = this.readFileAsString(path.join(this.devDirectories.templates, 'boilerplate/public/index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var scripts = _.toArray(this.config.get("scripts"));

  this.indexFile = this.wireScriptBlockToFile(this.indexFile, scripts);

  this.write(path.join(this.directories.public, 'index.html'), this.indexFile);
};




