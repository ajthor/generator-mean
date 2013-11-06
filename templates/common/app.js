angular.module('<%= name %>', 
	[<% for(var i in dependencies) { %>'<%= dependencies[i] %>'<% if(i<dependencies.length-1) { %>,
	<% }}; %>], 

	function($routeProvider, $locationProvider) {
        $routeProvider.otherwise( { redirectTo: '/'} );
        $locationProvider.html5Mode(true);
    })

	.run(function ($rootScope) {
		$rootScope.message = "Hello, World!";
	});