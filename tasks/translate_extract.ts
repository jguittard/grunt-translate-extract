/**
 * Created by Ma on 25/08/2014.
 */

/// <reference path="./def/gruntjs/gruntjs.d.ts"/>
import ParserManager = require("./ParserManager");
import Options = require("./Options");

// see https://github.com/borisyankov/DefinitelyTyped/blob/master/gruntjs/gruntjs-tests.ts
function translate_extract(grunt: IGrunt){


    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('translate_extract', 'extracts translatable strings from source files', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options:Options = this.options(new Options());


        // init the translation strings extractor
        var parser_manager = new ParserManager();
        parser_manager.setGrunt(grunt);
        parser_manager.setOptions(options);

        // add filPath and pass them to the translation strings extractor.
        this.files.forEach(function (file:grunt.file.IFilesConfig) {
            file.src.forEach(function (filePath: string) {
                parser_manager.addFile(filePath);
            });
        });


        // save the results of the translation strings extraction.
        parser_manager.save();
    });

};

export = translate_extract;