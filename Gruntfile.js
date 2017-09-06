const grunt = require('grunt');
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	sass: {
		options: {
            sourceMap: true
            
		},
		dist: {
			files: {
				'css/main.css': 'scss/main.scss'
			}
		}
	}
});

grunt.registerTask('default', ['sass']);