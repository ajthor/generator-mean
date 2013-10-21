// Controller definition for <%= name %>
	var <%= name %> = angular.module('controllers')
		.controller('<%= name %>', ['$scope', '$http', function($scope, $http) {

			// Do stuff.


		}])<% if (hasRoute) { %>
		
		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('<%= when %>', {
				templateUrl: '<%= route %>',
				controller: '<%= name %>'
			});
		}]);<% } %>