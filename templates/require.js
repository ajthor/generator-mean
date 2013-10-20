define(function (require) {

	var angular = require('angular');
	<% dependencies.forEach(function (dependency) { %>
	var <%= dependency %> = require('<%= dependency %>');<% }); %>

	<%= module %>

	return <%= name %>;
});