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
            },
            tasks:{
                sourceMap: false,
                reference:"src/tasks/def/translate-extract.d.ts",
                src: ["src/tasks/**/*.ts"],
                outDir:"tasks/"
            }
        },

        // Configuration to be run (and then tested).
        translate_extract: {
            getextPhp: {
                options:  {
                    output: [ "php_en.json", "php_es.json"],
                    outputDir: "testFiles/locales/",
                    builtInParser: "gettextPHP",
                    errorOnDuplicatedKeys: true
                },
                files: {
                    src: ['testFiles/gettext.php']
                }
            },
            wordpress:{
                options:{
                    output: [ 'wp_en.json', 'wp_es.json', 'wp_fr.json', 'wp_de.json' ],
                    outputDir: 'testFiles/locales/',
                    builtInParser: 'wordpress',
                    errorOnDuplicatedKeys: false
                },
                files: {
                    src: ['testFiles/wordpress.php']
                }
            },
            angularTransalte: {
                options: {
                    output: [ "ng_en.json", "ng_es.json"],
                    outputDir: "testFiles/locales/",
                    builtInParser: "angularTranslate",
                    errorOnDuplicatedKeys: true
                },
                files: {
                    src: ["testFiles/angularTranslate.html"]
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


    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

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
