var async = require('async');

module.exports = function(app) {
	
	var index = require('./routes/index');

    app.get('/', index.render);

};