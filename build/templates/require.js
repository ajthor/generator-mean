define(function(require) {
	<% for(var i in dependencies) { %>
	var <%= dependencies[i] %> = require('<%= dependencies[i] %>');<% } %>

	<%= module %>
});