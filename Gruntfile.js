module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			target: [
				"lib/*.js",
				"index.js"
			]
		}
	});

	// tasks
	grunt.loadNpmTasks("grunt-eslint");

	// aliases
	grunt.registerTask("test", ["eslint"]);
	grunt.registerTask("default", ["test"]);
};
