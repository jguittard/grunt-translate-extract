/**
* Created by Ma on 25/08/2014.
*/
/// <reference path="./def/gruntjs/gruntjs.d.ts"/>
var TranslateExtractor = require("./TranslateExtractor");
var Options = require("./Options");

// see https://github.com/borisyankov/DefinitelyTyped/blob/master/gruntjs/gruntjs-tests.ts
function TaskInit(grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('taskName', 'task description', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(new Options());

        // init the translation strings extractor
        var tExt = new TranslateExtractor();
        tExt.setGrunt(grunt);
        tExt.setOptions(options);

        // add filPath and pass them to the translation strings extractor.
        this.files.forEach(function (file) {
            file.src.forEach(function (filePath) {
                tExt.addFile(filePath);
            });
        });

        // start parsing the sources files looking for translations strings.
        tExt.parseFiles();

        // save the results of the translation strings extraction.
        tExt.save();
    });
}
;

module.exports = TaskInit;
//# sourceMappingURL=TaskInit.js.map
