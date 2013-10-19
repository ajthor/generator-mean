'use strict';
var util = require('util');
var SubGenerator = require('../subgenerator-lib.js');

var ExpressGenerator = module.exports = function ExpressGenerator(args, options, config) {
  SubGenerator.apply(this, arguments);
  
};

util.inherits(ExpressGenerator, SubGenerator);

ExpressGenerator.prototype.files = function files() {
  var done = this.async();

  var prompts = [{
    name: 'PORT',
    message: 'Please choose a {port} to run on: ',
    default: '3000'
  }];

  this.prompt(prompts, function (props) {
    // extend this with props
    _.extend(this, props);
    
    done();
  }.bind(this));

  this.template('app.js', 'app.js');

};