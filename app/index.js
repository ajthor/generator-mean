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


		this.pkg = require('../package.json');

		this.argument('appname', { type: String, required: false });
		this.argument('no-hooks', { type: Boolean, required: false });
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
		
		if(!this.arguments['no-hooks']) {
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
		}



		this.on('end', function() {
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

			if (!this.options['skip-install']) {
				this.installDependencies({
					callback: function() {
						this._injectDependencies.bind(this);

						if(!this.options['no-git']) {
							this.spawnCommand('grunt', ['git-init']);

						}
					}.bind(this)
				});
			}
		});

	},

	welcome: function() {
		// have Yeoman greet the user
		this.log(this.yeoman);

		this.log(chalk.red('---- MEAN GENERATOR ----'));
		this.log(chalk.yellow(
			'The MEAN generator is modular, and made to be used with\n',
			'other existing Yeoman generators*. Either run the base\n',
			'MEAN generator, or call each generator independently.\n\n',
			'*Compatibility with angular and backbone generators\n',
			'using the \'--appPath=\"public\"\' option.\n'
			));

		this.log(chalk.yellow('Generators included:'));
		this.log(chalk.green('- app'));
		this.log(chalk.green('- boilerplate'));
		this.log(chalk.green('- server\n\n'));
	},

	askFor: function() {
		// var done = this.async();

		// var prompts = [{
		// 	name: 'githubUser',
		// 	message: 'What is your GitHub user name?'
		// }, {
		// 	name: 'name',
		// 	message: 'What is the name of your project?',
		// 	default: path.basename(process.cwd())
		// }, {
		// 	name: 'description',
		// 	message: 'Description'
		// }];

		// this.prompt(prompts, function(props) {
		// 	this.githubUser = props.githubUser;

		// 	this.name = this._.slugify(props.name);
		// 	this.description = props.description;
			
		// 	this.repoUrl = 'https://github.com/' + props.githubUser + '/' + this.name + '.git';
		// 	this.repoLink = 'git@github.com:' + props.githubUser + '/' + this.name + '.git';

		// 	done();
		// }.bind(this));

		this.githubUser = 'ajthor';
		this.name = 'mean-test';
		this.description = '';
		this.repoUrl = 'https://github.com/' + this.githubUser + '/' + this.name + '.git';
		this.repoLink = 'git@github.com:' + this.githubUser + '/' + this.name + '.git';

	},

	directories: function() {
		this.dest.mkdir('routes');
		this.dest.mkdir('views');
		this.dest.mkdir('public');
		this.dest.mkdir('public/templates');
	},

	projectFiles: function() {
		this.template('_package.json', 'package.json');
		this.template('_bower.json', 'bower.json');

		this.template("_Gruntfile.js", "Gruntfile.js");
		this.template("_gulpfile.js", "gulpfile.js");
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


