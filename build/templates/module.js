var <%= name %> = angular.module('something', [
		<% for(var i in dependencies) {
			%>'<%= dependencies[i] %>'<% if (i<dependencies.length-1) { %>,
		<% }} %>
	]);