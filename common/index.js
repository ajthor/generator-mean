'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
  GeneratorBase.apply(this, arguments);

  this.option("config-only");

  this.hookFor('mean:main', {
    args: args,
    options: {
      options: {
        module: {
          name: 'app',
          dependencies: [],
          path: path.join(this.directories.scripts, 'app')
        }
      }
    }
  });
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
    "grunt-karma": "*",
    "karma": "*",
    "karma-mocha": "*",
    "karma-jasmine": "*",
    "karma-requirejs": "*",
    "mocha": "*",
    "chai": "*",
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

Generator.prototype.setBowerFiles = function setBowerFiles() {
  if(this.options['config-only']===true) return;

  var bowerConfig = JSON.parse(this.readFileAsString(path.join(this.devDirectories.templates, 'common/_bower.json')));

  bowerConfig.dependencies = {
    "jquery": "~1.9.1",
    "angular": "latest",
    "angular-route": "*",
    "angular-resource": "*",
    "angular-bootstrap": "*",
    "angular-ui-utils": "*"
  };

  bowerConfig.resolutions = {
    "angular": "1.0.8"
  };

  this.pushToConfig("scripts", "jquery", path.join(this.devDirectories.relVendor, "/jquery/jquery.min.js"));
  this.pushToConfig("scripts", "angular", path.join(this.devDirectories.relVendor, "/angular/angular.min.js"));

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
  }, "requirejs");
};

Generator.prototype.copyGruntfile = function copyGruntfile() {
  if(this.options['config-only']===true) return;
  this.template(path.join(this.devDirectories.templates, 'common/Gruntfile.js'), 'Gruntfile.js');
};

Generator.prototype.writeIndexFile = function writeIndexFile() {
  if(this.options['config-only']===true) return;

  this.indexFile = this.readFileAsString(path.join(this.devDirectories.templates, 'boilerplate/public/index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.pushToConfig("scripts", "app", path.join("./js/app.js"));
  this.pushToConfig("scripts", "main", path.join("./js/main.js"));

  var scripts = _.toArray(this.config.get("scripts"));

  this.indexFile = this.wireScriptBlockToFile(this.indexFile, scripts);

  this.write(path.join(this.directories.public, 'index.html'), this.indexFile);
};




