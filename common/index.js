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
  this.packageConfig = JSON.parse(this.readFileAsString(path.join(this.devDirectories.templates, 'common/_package.json')));

  this.packageConfig.dependencies = {};
  _.extend(this.packageConfig["dependencies"], {
    "express": "*",
    "jade": "*",
    "mongoose": "*",
    "bower": "*",
    "grunt": "*",
    "grunt-cli": "*",
    "async": "*",
    "lodash": "*"
  });

  this.packageConfig.devDependencies = {};
  _.extend(this.packageConfig["devDependencies"], {
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
  });

  this.write('package.json', JSON.stringify(this.packageConfig));
};

Generator.prototype.setBowerFiles = function setBowerFiles() {
  if(this.options['config-only']===true) return;
  this.bowerConfig = JSON.parse(this.readFileAsString(path.join(this.devDirectories.templates, 'common/_bower.json')));

  this.bowerConfig.dependencies = {};
  _.extend(this.bowerConfig["dependencies"], {
    "jquery": "~1.9.1",
    "angular": "~1.0.8",
    "angular-route": "*",
    "angular-resource": "*",
    "angular-bootstrap": "*",
    "angular-ui-utils": "*"
  });

  _.each(this.components, function (component) {
    this.bowerConfig.dependencies[component] = "*";
  }, this);

  this.bowerrcConfig = {};
  this.bowerrcConfig.directory = this.directories.vendor;

  this.write('bower.json', JSON.stringify(this.bowerConfig));
  this.write('.bowerrc', JSON.stringify(this.bowerrcConfig));
};

Generator.prototype.setGeneralConfig = function setGeneralConfig() {
  var output, generalConfig = {};
  generalConfig.PORT = 3000;
  generalConfig.dir = {};
  _.extend(generalConfig.dir, this.directories);
  output = "module.exports = " + JSON.stringify(generalConfig) + ";";
  this.write(path.join(this.directories.config, 'config.js'), output);
};

Generator.prototype.copyGruntfile = function copyGruntfile() {
  if(this.options['config-only']===true) return;
  this.template(path.join(this.devDirectories.templates, 'common/Gruntfile.js'), 'Gruntfile.js');
};

// Generator.prototype.setGruntConfigFiles = function setGruntConfigFiles() {
//   var output;
//   this.gruntConfig = {};

//   this.gruntConfig.appDir = this.directories.app;
//   this.gruntConfig.buildDir = this.directories.build;

//   this.gruntConfig.files = {
//     js: path.join(this.directories.app, '/**/*.js'), 
//     html: path.join(this.directories.app, '/**/*.html'), 
//     jade: path.join(this.directories.appviews, '/**/*.jade'), 
//     css: path.join(this.directories.styles, '/**'), 
//     specs: [path.join(this.directories.app, '/**/*.spec.js'), path.join(this.directories.specs, '/**/*.spec.js')]
//   };

//   output = "module.exports = " + JSON.stringify(this.gruntConfig) + ";";
//   this.write('grunt.config.js', output);
// };

Generator.prototype.writeIndexFile = function writeIndexFile() {
  if(this.options['config-only']===true) return;
  this.indexFile = this.readFileAsString(path.join(this.devDirectories.templates, 'boilerplate/public/index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendScripts(this.indexFile, 'js/main.js', 
    [path.join(this.directories.vendor, 'requirejs/require.js')], {'data-main': path.join(this.directories.scripts, 'main')});

  this.write(path.join(this.directories.public, 'index.html'), this.indexFile);
};




