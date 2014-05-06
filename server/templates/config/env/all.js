'use strict';

module.exports = {
	app: {
		title: 'MEAN.js'
	},

	templateEngine: 'jade',

	port: process.env.PORT || 3000,
	hostname: process.env.HOST || process.env.HOSTNAME,

	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};