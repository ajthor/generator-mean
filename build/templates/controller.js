var <%= name %> = angular.module('controllers')
	.controller('<%= name %>', ['$scope', '$http', function($scope, $http) {
		
		// Do stuff.


	}]);
	<% if (hasRoute) { %>
	<%= name %>.config(function ($routeProvider) {
		//define module-specific route here
	});<% } %>