'use strict';

function configureGrunt(grunt) {
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks("grunt-hogan");

	grunt.initConfig({

		browserify: {
			build: {
				src: [
					'./app/code/**/*.js'
				],
				dest: './public/javascripts/application.js',
				options: {
					alias: [
						'./node_modules/brisket/lib/brisket.js:brisket',
						'./app/code/client/ClientApp.js:app/ClientApp'
					],
					ignore: [
						'./app/code/server/**/*.js',
						'./node_modules/brisket/lib/server/**/*.js'
					],
					shim: {
						'jquery-mockjax': {
							path: 'node_modules/brisket/node_modules/jquery-mockjax/jquery.mockjax.js',
							exports: null,
							depends: {
								jquery: 'jQuery'
							}
						}
					}
				}
			}

		},

		compass: {
			build: {
				options: {
					sourcemap: true,
					config: 'config/compass.rb'
				}
			}
		},

		clean: {
			js: [
				'public/javascripts',
			],
			css: [
				'public/stylesheets',
			],
			html: [
				'app/build/templates.js'
			]
		},

		exec: {
			nodemon: {
				cmd: 'node_modules/.bin/nodemon server.js'
			}
		},

		hogan: {
            compile: {
                src: [
                    "app/components/**/*.html",
                ],
                dest: "app/build/templates.js",
                options: {
                    binderName: "nodejs",
                    nameFunc: stripPathAndExtension,
                    exposeTemplates: true
                }
            }
        },

        concurrent: {
            server: {
                tasks: [
                    "exec:nodemon",
                    "watch"
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

		watch: {
			options: {
				interrupt: true,
				debounceDelay: 250
			},
			js: {
				files: [
					'app/code/**/*.js',
					'server.js',
					'Gruntfile.js',
				],
				tasks: [
					'build',
				]
			},
			css: {
				files: [
					'app/**/*.scss',
				],
				tasks: [
					'build'
				]
			},
			html: {
				files: [
					'app/**/*.html'
				],
				tasks: [
					'build'
				]
			}
		}

	});


	grunt.registerTask('build', [
		'clean:js',
		'browserify:build',
		'clean:css',
		'clean:html',
		'hogan',
		'compass:build'
	]);

	grunt.registerTask('server', [
		'build',
		'concurrent:server',
	]);

	grunt.registerTask('default', ['server']);
}

function stripPathAndExtension(file) {
    return file.replace("app/components/", "").split(".")[0];
}
module.exports = configureGrunt;
