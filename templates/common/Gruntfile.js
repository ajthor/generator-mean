'use strict';

var config = require('./config/config.js');

    //
    //
    //

module.exports = function(grunt) {  
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Project Configuration
    grunt.initConfig({
        watch: {
            js: {
                files: [
                    config.dir.app + '/**/*.js', 
                    "!" + config.dir.vendor + "**", 
                    '!**/node_modules/**'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: [config.dir.styles + '/**'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: [config.dir.public + '/**/*.spec.js'],
                tasks: ['karma:unit:run']
            }
        },

        jshint: {
            options: {
                globals: {
                    "require"    : false,
                    "define"     : false,
                    "module"     : false,
                    "angular"    : false,
                    "describe"   : false,
                    "it"         : false,
                    "before"     : false,
                    "beforeEach" : false,
                    "after"      : false,
                    "afterEach"  : false
                }
            },
            Gruntfile: ['Gruntfile.js'],
            public: [
                config.dir.public + '/**/*.js', 
                "!" + config.dir.vendor + '/**/*.js'
            ],
            test: [
                config.dir.test + '/**/*.js', 
                config.dir.app + '/**/*.spec.js'
            ]
        },

        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', config.dir.vendor + '/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config', 'public'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'], 
            options: {
                logConcurrentOutput: true
            }
        },

        karma: {
            unit: {
                background: true,
                options: {
                    captureTimeout: 60000,
                    runnerPort: 9000,
                    browsers: ['Chrome']
                }
            }
        }
    });

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['jshint', 'karma:unit:start', 'watch']);
};
