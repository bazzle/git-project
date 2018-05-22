module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
        			'style.css': 'style.scss'
      			}
			}
		}
	});

// Load grunt plugins.
grunt.loadNpmTasks('grunt-contrib-sass');
};