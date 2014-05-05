'use strict';

var mongoose = require('mongoose');
var config = require('./server/config/config');

// Bootstrap the database connection.
var db = mongoose.connect(config.db);

// Initialize Express
var app = require('./server/config/express')(db);


// Start the app
app.listen(config.port);

exports = module.exports = app;


console.log('Mean.js application started on port: %d (%s)', config.port, process.env.NODE_ENV);