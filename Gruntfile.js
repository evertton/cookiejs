module.exports = function (grunt) {

	grunt.initConfig({
		jsonlint: {
			all: {
				src: ['package.json', '.jshintrc']
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'grunt/**/*.js', 'src/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		beforeUglify: {
			all: {
				files: {
					'dist/cookie.js': ['src/cookie.js'],
					'dist/cookie.before-min.js': ['dist/cookie.js']
				},
				options: {
					header: '/*!\n' +
							' * Cookie JavaScript Library v<%= grunt.file.readJSON(\'package.json\').version %>\n' +
							' * \n' +
							' * Copyright 2013 Evertton de Lima\n' +
							' * Released under The MIT License\n' +
							' * http://evertton.mit-license.org/\n' +
							' */\n'
				}
			}
		},
		uglify: {
			all: {
				files: {
					'dist/cookie.min.js': ['dist/cookie.before-min.js']
				},
				options: {
					preserveComments: 'some',
					report: 'min',
					beautify: {
						ascii_only: true
					},
					compress: {
						hoist_funs: false,
						join_vars: false,
						loops: false,
						unused: false
					}
				}
			}
		},
		afterUglify: {
			all: {
				files: {
					'dist/cookie.min.js.tmp': ['dist/cookie.min.js']
				},
				options: {
					tempFiles: ['dist/cookie.min.js.tmp', 'dist/cookie.before-min.js']
				}
			}
		},
		shell: {
			doxx: {
				command: 'doxx --template .template.doxx --source ./src --target ./docs'
			}
		}
	});

	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-shell');

	grunt.loadTasks('.grunt/tasks');

	grunt.registerTask('check_syntax', ['jsonlint', 'jshint']);
	grunt.registerTask('docs', ['shell:doxx']);
	grunt.registerTask('build', ['beforeUglify', 'uglify', 'afterUglify']);

	grunt.registerTask('default', ['check_syntax', 'build']);
	grunt.registerTask('test', ['check_syntax']);

};
