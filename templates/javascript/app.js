// App declaration for <%= name %>
	angular.module('<%= name %>', [
		<% for(var i in dependencies) { %>'<%= dependencies[i] %>'<% if(i<dependencies.length-1) { %>,
		<% }}; %>
		])

		.config(function ($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/'});
		});