'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var BoilerplateGenerator = module.exports = function BoilerplateGenerator() {
  GeneratorBase.apply(this, arguments);

};

util.inherits(BoilerplateGenerator, GeneratorBase);

BoilerplateGenerator.prototype.directories = function directories() {
  
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

  this.config.forceSave();
  
};