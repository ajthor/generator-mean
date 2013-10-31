require.config({
	baseUrl: './js',
	paths: {
		'angular': 'vendor/angular/angular'
	},
	shim: {
		'angular' : {'exports' : 'angular'}
	}
});

require(['angular', 'app'], function (angular, app) {
	'use strict';

	angular.element(document).ready(function() {
		angular.bootstrap(angular.element(document).find('body'), ['app']);
	});

});