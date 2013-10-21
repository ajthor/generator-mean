// Controller definition for <%= name %>
	var <%= name %> = angular.module('controllers')
    .controller('<%= name %>', ['$scope', '$http', function($scope, $http) {
            
            // Do stuff.


    }]);
    <% if (_.has(this, 'hasRoute') && hasRoute) { %>
    <%= name %>.config(function ($routeProvider) {
            //define module-specific route here
    });<% } %>