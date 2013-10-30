// Manual bootstrap.
window.name = "NG_DEFER_BOOTSTRAP!";

require(function (require) {
	'use strict';

	require('../../config/requirejs.config');

	var angular = require('angular');
	var app = require('app');

	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		$html.addClass('data-ng-app');
		angular.bootstrap($html, [app.app]);
	});
});