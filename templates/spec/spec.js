<% specDependencies.forEach(function (dependency) { %>
var <%= dependency %> = require('<%= dependency %>');<% }); %>

describe('<%= name %>', function () {

	// Create some test.
	var module;

	beforeEach(function() {
		module = angular.module("app");
	});

	it("should be registered", function() {
		expect(module).not.toBe(null);
	});
	
});
