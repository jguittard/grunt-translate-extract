/*
 * grunt-translate-extract
 * https://github.com/M-jerez/grunt-translate-extract
 *
 * Copyright (c) 2014 Ma-Jerez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        translate_extract: {
            getextPhp: {
                options:  {
                    locales: [ "en", "es"],
                    outputDir: "./locales/gettextPHP",
                    builtInParser: "gettextPHP",
                    errorOnDuplicatedKeys: true
                },
                files: {
                    src: ['test/srcFiles/**/*.php']
                }
            },
            angularTransalte: {
                options: {
                    locales: [ "en", "es"],
                    outputDir: "./locales/angularTranslate",
                    builtInParser: "angularTranslate",
                    errorOnDuplicatedKeys: true
                },
                files: {
                    src: ["test/srcFiles/**/*.html"]
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'translate_extract']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
