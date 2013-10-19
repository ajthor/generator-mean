define(function(require) {
	<% dependencies.forEach( function ( dependency ) { %>
    var <%= dependency %> = require('<%= dependency %>');<% }); %>

	<%= module %>

	return <%= name %>;
});