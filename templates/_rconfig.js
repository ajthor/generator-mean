require.config({
	paths: {
		angular: 'vendor/angular/angular-min',
		angularRoute: 'vendor/angular-route/angular-route',
		text: 'vendor/requirejs-text/text'
	},
	baseUrl: 'public/js',
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular']
	},
	priority: [
		"angular"
	]
});