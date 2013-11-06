var config = require('./config/config.js');

    //
    //
    //

module.exports = function(grunt) {
    'use strict';
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Project Configuration
    grunt.initConfig({

        //
        // Development
        //

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
                files: ['**/*.spec.js'],
                tasks: ['karma:unit:run'],
                options: {
                    livereload: true
                }
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
                config.dir.app + '/**/*.spec.js', 
                config.dir.public + '/**/*.spec.js'
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
                    cwd: "./"
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'], 
            options: {
                logConcurrentOutput: true
            }
        },

        //
        // Testing
        //

        karma: {
            unit: {
                background: true,
                options: {
                    basePath: '',
                    frameworks: ['jasmine'<% if(components.indexOf('requirejs') !== -1) { %>, 'requirejs'<% } %>],
                    files: [
                        <% if(components.indexOf('requirejs') !== -1) { %>
                        {pattern: '**/*.spec.js', included: false},
                        {pattern: 'public/js/*.js', included: false},
                        {pattern: 'public/js/**/*.js', included: false},
                        {pattern: 'public/js/**/*.spec.js', included: false},
                        {pattern: 'test/spec/*.js', included: false},

                        'test/test-main.js'
                        <% } else { %>
                        'public/js/vendor/jquery/jquery.js',
                        'public/js/vendor/angular/angular.js',
                        'public/js/vendor/bootstrap/**/*.js',
                        '**/*.spec.js',
                        'public/js/**/*.js'
                        <% } %>
                    ],
                    exclude: [
                        <% if(components.indexOf('requirejs') !== -1) { %>'public/js/main.js'<% } %>
                    ],
                    colors: true,
                    captureTimeout: 60000,
                    runnerPort: 9000,
                    logLevel: config.LOG_INFO,
                    browsers: ['Chrome']
                }
            }
        },

        //
        // Build
        //

        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [config.dir.build]
                }]
            }
        },

        autoprefixer: {
            styles: {
                expand: true,
                flatten: true,
                src: config.dir.styles + '/*.css',
                dest: config.dir.build + '/css/'
            }
        },

        // useminPrepare: {
        //     html: config.dir.public + '/index.html',
        //     options: {
        //         dest: config.dir.build
        //     }
        // },
        // usemin: {
        //     html: [config.dir.build + '/{,*/}*.html'],
        //     css: [config.dir.build + '/css/{,*/}*.css'],
        //     options: {
        //         dirs: [config.dir.build]
        //     }
        // },

        requirejs: {
            build: {
                options: {
                    mainConfigFile: config.dir.scripts + '/main.js',

                    name: 'main',
                    out: config.dir.build + '/js/main.js',

                    optimize: 'none',
                    optimizeCss: "standard.keepLines",

                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },

        bower: {
            target: {
                rjsConfig: config.dir.scripts + "/main.js"
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': config.dir.public + '/index.html'
                }
            }
        },
        cssmin: {
            build: {
                expand: true,
                cwd: config.dir.build + '/css/',
                src: ['*.css', '!*.min.css'],
                dest: config.dir.build + '/css/',
                ext: '.css'
            }
        }
    });

    grunt.option('force', true);

    //Default task.
    grunt.registerTask('preview', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['jshint', 'karma:unit:start', 'watch']);

    //Build task.
    grunt.registerTask('default', function() {
        grunt.task.run([
            'clean',
            'jshint',
            'autoprefixer',
            'cssmin',
            'htmlmin'
        ]);

        if(this.components.indexOf('requirejs') !== -1) {
            grunt.task.run(['bower', 'requirejs']);
        }
    });
};


