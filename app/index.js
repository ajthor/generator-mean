'use strict';
var fs = require('fs');
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
			if(!this.env.options.appPath) {
				this.env.options.appPath = this.options.appPath || 'public';
			}
		}

		this.config.set('appPath', this.env.options.appPath);
		this.appPath = this.env.options.appPath;



		args = ['main'];
		
		this.hookFor('mean:boilerplate', {
			args: args,
			options: {
				options: {
					'appPath': 'public'
				}
			}
		});

		this.hookFor('angular:main', {
			args: args,
			options: {
				options: {
					'appPath': 'public'
				}
			}
		});

		this.hookFor('angular:controller', {
			args: args,
			options: {
				options: {
					'appPath': 'public'
				}
			}
		});
		
		this.hookFor('mean:server', {
			args: args,
			options: {
				options: {
					'appPath': 'public'
				}
			}
		});

	},

	init: function() {
		this.pkg = require('../package.json');

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

	welcome: function() {
		// have Yeoman greet the user
		this.log(this.yeoman);

		this.log(chalk.red('---- MEAN GENERATOR ----'));
		this.log(chalk.yellow(
			'The MEAN generator is modular, and made to be used with\n',
			'other existing Yeoman generators. Either run the base\n',
			'MEAN generator, or call each generator independently.\n'
			));

		this.log(chalk.yellow('Generators included:'));
		this.log(chalk.green('- app'));
		this.log(chalk.green('- boilerplate'));
		this.log(chalk.green('- server'));
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

	rootFiles: function() {
		var ignores = [
			'.DS_Store'
		];

		this.expandFiles('*', {
			cwd: path.join(this.src._base, '/root'),
			dot: true
		}).forEach(function(file) {
			if( ignores.indexOf(file) === -1 ) {
				this.copy(path.join(this.src._base, '/root', file), file);
			}
		}.bind(this));
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


