'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');


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
  }];

  this.prompt(prompts, function (results) {
    this.setConfig("dependencies", results.dependencies);

    done();
  }.bind(this));

};

MeanGenerator.prototype.directory = function directory() {
  
  var directory = this.directory = {
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

  this.setConfig("directory", directory);
  
};
