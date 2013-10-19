'use strict';
var util = require('util');
var SubGenerator = require('../subgenerator-lib.js');
var prettyjson = require('prettyjson');

var CommonGenerator = module.exports = function CommonGenerator(args, options, config) {
  SubGenerator.apply(this, arguments);
  
};

util.inherits(CommonGenerator, SubGenerator);

CommonGenerator.prototype.directoryStructure = function directoryStructure() {
	var directory = {
		app:         "app",
		appviews:    "app/views",
		public:      "public",
		scripts:     "public/js",
		vendor:      "public/js/vendor",
		publicviews: "public/views",
		test:        "test",
	};

	this.config.set("directory", directory);
};
