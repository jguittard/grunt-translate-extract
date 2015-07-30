/**
 * Created by Ma on 25/08/2014.
 */
/// <reference path="./def/gruntjs/gruntjs.d.ts"/>
var ParserManager = require("./ParserManager");
var Options = require("./Options");
function translate_extract(grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('translate_extract', 'extracts translatable strings from source files', function () {
        var options = this.options(new Options());
        var parser_manager = new ParserManager();
        parser_manager.setGrunt(grunt);
        parser_manager.setOptions(options);
        this.files.forEach(function (file) {
            file.src.forEach(function (filePath) {
                parser_manager.addFile(filePath);
            });
        });
        parser_manager.save();
    });
}
;
module.exports = translate_extract;
