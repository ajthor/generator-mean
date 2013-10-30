define(function (require) {
	'use strict';

	var angular = require('angular');
	<% dependencies.forEach(function (dependency) { %>
	var <%= dependency %> = require('<%= dependency %>');<% }); %>

	var <%= name %> = <%= module %>

	return <%= name %>;
});