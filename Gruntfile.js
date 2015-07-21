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


        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['libs/*']
        },

        ts: {
            options: {
                module: 'commonjs', //node.js module system
                target: 'es5', //or es3
                sourceMap: false,
                declaration: false
            },
            app : {
                sourceMap: false,
                reference:"src/tasks/def/translate-extract.d.ts",
                src: ["src/**/*.ts"],
                outDir:"libs/"
            }
        },

        // Configuration to be run (and then tested).
        translate_extract: {
            getextPhp: {
                options:  {
                    locales: [ "en", "es"],
                    outputDir: "testFiles/locales/gettextPHP",
                    builtInParser: "gettextPHP",
                    errorOnDuplicatedKeys: true
                },
                files: {
                    src: ['testFiles/**/*.php']
                }
            },
            other:{
                options:{
                    output: [ 'en.json', 'es.json', 'fr.json', 'de.json' ],
                    outputDir: 'locales',
                    basePath: 'c:\\Users\\Ma jerez\\Projects\\grunt-translate-extract',
                    builtInParser: 'gettextPHP',
                    customParser: null,
                    errorOnDuplicatedKeys: false,
                    contextSeparator: '\u0004'
                }
            },
            angularTransalte: {
                options: {
                    locales: [ "en", "es"],
                    outputDir: "testFiles/locales/angularTranslate",
                    builtInParser: "angularTranslate",
                    errorOnDuplicatedKeys: true
                },
                files: {
                    src: ["testFiles/**/*.html"]
                }
            }
        },



        watch: {
            scripts: {
                files: ['**/*.ts'],
                tasks: ['ts'],
                options: {
                    spawn: false
                }
            }
        },


        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt.registerTask('test', ['clean', 'translate_extract']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ["clean",'ts','watch']);

};
