var express = require('express');

// Load config specific to the environment.
var config = require('./config');

// Load dependencies.
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var consolidate = require('consolidate');

var session = require('express-session');
var mongoStore = require('connect-mongo')({
	session: session
});

// Express Configuration
// =====================
// Set up the Express application here.

module.exports = function(db) {

	var app = express();

	app.set('showStackError', true);

	// View Config
	// -----------
	// - View directory: ./server/views
	// - Template engine: jade
	app.set('views', './server/views');

    app.engine('html', consolidate[config.templateEngine]);
    app.set('view engine', 'html');

	// Environment-Specific Config
	// ---------------------------
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));

	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}


	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// MongoDB Config
	// --------------
	app.use(session({
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// Passport Config
	// ---------------
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	// Routes
	// ======
	// Set up middleware for default app routes.

	// Static Folder
	// -------------
	// Set up the app router and public folder.
	app.use(express.static(path.resolve('./public')));

	// 404
	// ---
	// Assume 404 since no middleware responded.
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	return app;

};