// Controller definition for <%= name %>
	var <%= name %> = angular.module('<%= module %>')
		.controller('<%= name %>', ['$scope', '$http', function($scope, $http) {

			// Do stuff.


		}])<% if (hasRoute) { %>
		
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: 'index.html',
				controller: '<%= name %>'
			});
		}]);<% } %>