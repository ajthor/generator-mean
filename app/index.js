'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var wiredep = require('wiredep');
var chalk = require('chalk');


var MeanGenerator = yeoman.generators.Base.extend({
	constructor: function(args, options) {
		yeoman.generators.Base.apply(this, arguments);

		this.argument('appname', { type: String, required: false });
		this.appname = this.appname || path.basename(process.cwd());
		this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

		if (typeof this.env.options.appPath === 'undefined') {
			try {
				this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
			} catch (e) {}
				this.env.options.appPath = this.env.options.appPath || 'public';
		}

		this.appPath = this.env.options.appPath;



		args = ['main'];
		
		this.hookFor('mean:boilerplate', {
			args: args
		});

		this.hookFor('angular:main', {
			args: args
		});

		this.hookFor('angular:controller', {
			args: args
		});

	},

	init: function() {
		this.pkg = require('../package.json');

		// this.hookFor('mean:boilerplate');

		this.on('end', function() {
			this.installDependencies({
				skipInstall: this.options['skip-install'],
				callback: this._injectDependencies.bind(this)
			});

			this.invoke('karma:app', {
				options: {
					cwd: this.destinationRoot(),
					coffee: this.options.coffee,
					travis: false,
					'skip-install': this.options['skip-install'],
					components: [
						'angular/angular.js',
						'angular-mocks/angular-mocks.js',
						'angular-resource/angular-resource.js',
						'angular-cookies/angular-cookies.js',
						'angular-sanitize/angular-sanitize.js',
						'angular-route/angular-route.js'
					]
				}
			});
		});
	},

	askFor: function() {

		// have Yeoman greet the user
		this.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('You\'re using the fantastic Mean generator.'));
	},

	directories: function() {
		this.dest.mkdir('server');
		this.dest.mkdir('server/controllers');
		this.dest.mkdir('server/routes');
		this.dest.mkdir('server/views');
		this.dest.mkdir('public');
		this.dest.mkdir('public/templates');
	},

	projectFiles: function() {
		this.copy('_package.json', 'package.json');
		this.copy('_bower.json', 'bower.json');

		this.copy('gitignore', '.gitignore');
	},

	root: function() {
		this.directory('./root', '.');
	},

	bootstrap: function() {
		// var done = this.async();

		// this.prompt({
		// 	type: 'confirm',
		// 	name: 'bootstrap',
		// 	message: 'Would you like to install Twitter Bootstrap?',
		// 	default: true
		// }, function (props) {
		// 	this.bootstrap = props.bootstrap;

		// 	done();
		// }.bind(this));


		// if(this.bootstrap) {
		// 	// Install bootstrap.
		// }

	},

	_injectDependencies: function _injectDependencies() {
		if (!this.options['skip-install']) {
			wiredep({
				directory: 'public/scripts/vendor',
				bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
				ignorePath: 'public/',
				src: 'public/index.html',
				fileTypes: {
					html: {
						replace: {
							css: '<link rel="stylesheet" href="{{filePath}}">'
						}
					}
				}
			});
		}
	}

});

module.exports = MeanGenerator;


