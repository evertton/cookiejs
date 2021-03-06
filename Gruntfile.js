module.exports = function (grunt) {

	grunt.initConfig({
		jsonlint: {
			all: {
				src: ['package.json', '.jshintrc']
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'grunt/**/*.js', 'src/*.js', 'tests/*.js'],
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
							' * Copyright 2013-2014 Evertton de Lima\n' +
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
		doxx: {
			all: {
				src: 'src',
				target: 'docs'
			},
			gh_page: {
				src: 'src',
				target: 'tmp/docs',
				options: {
					template: '.template.doxx'
				}
			}
		},
		jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'tests/*.spec.js'
            }
        }
	});

	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-doxx');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.loadTasks('.grunt/tasks');

	grunt.registerTask('check_syntax', ['jsonlint', 'jshint']);
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('build', ['beforeUglify', 'uglify', 'afterUglify']);
	grunt.registerTask('docs', ['doxx:all']);

	grunt.registerTask('default', ['check_syntax', 'test', 'build']);
};
