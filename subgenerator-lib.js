'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('underscore');
var JSON = require('json3');

//
// Create generator universal function lib.
//

var Generator = module.exports = function Generator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
	
};

util.inherits(Generator, yeoman.generators.Base);