angular.module('<%= name %>', [
		<% for(var i in dependencies) { %>'<%= dependencies[i] %>'<% if(i<dependencies.length-1) { %>,
		<% }}; %>
		]);