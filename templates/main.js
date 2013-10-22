// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'rconfig',
	'angular',
	'app'
], function(angular, app) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		$html.addClass('data-ng-app');
		angular.bootstrap($html, [app['name']]);
	});
});