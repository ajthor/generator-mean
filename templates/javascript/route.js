angular.module('app')
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'index.html',
				controller: '<%= name %>'
			});
		}]);