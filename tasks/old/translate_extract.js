/*
 * grunt-translate-extract
 * https://github.com/M-jerez/grunt-translate-extract
 *
 * Copyright (c) 2014 Ma-Jerez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('translate_extract', 'extracts translatable strings from source files.', function () {
        var tm = require("./translatorManager")(grunt);

        // Check options.
        var options = this.options({
            locales: ["en", "es"],
            outputDir: "./locales",
            parser: "phpFunction"
        });


        if (options.locales && options.locales instanceof Array)
            tm.setLocales(options.locales);
        else if (options.locales)
            grunt.fail.warn("grunt config options locales must be and array i.e: ['en','de','es']", 3);

        // parse each file to find i18n definitions.
        this.files.forEach(function (file) {
            file.src.forEach(function (filePath) {
                tm.parseFile(filePath);
            });
        });

        // Generate the translated version and save them into json files.
        // Also generated the locales files.
        tm.save();
    });
};
