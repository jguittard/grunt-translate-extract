/**
 * Created by Ma on 25/08/2014.
 */
/// <reference path="../tasks/def/gruntjs/gruntjs.d.ts"/>
import ParserManager = require("../tasks/ParserManager");
import Options = require("../tasks/Options");

// Merge task-specific and/or target-specific options with these defaults.
var options:Options = new Options();
console.log(options);
var grunt:IGrunt = require('grunt');

// init the translation strings extractor
var pm = new ParserManager();
pm.setGrunt(grunt);
pm.setOptions(options);

// add filPath and pass them to the translation strings extractor.
pm.addFile("C:/Users/Ma/Dropbox/Projects/grunt-translate-extract/test/srcFiles/gettextPHP_0.php");

pm.save();

var x = {
    locales: [ 'en', 'es' ],
    outputDir: './locales',
    builtInParser: 'gettextPHP',
    customParser: null,
    errorOnDuplicatedKeys: true
}

