/**
* Created by Ma on 25/08/2014.
*/
/// <reference path="../tasks/def/gruntjs/gruntjs.d.ts"/>
var ParserManager = require("../tasks/ParserManager");
var Options = require("../tasks/Options");

// Merge task-specific and/or target-specific options with these defaults.
var options = new Options();
var grunt = require('grunt');

// init the translation strings extractor
var pm = new ParserManager();
pm.setGrunt(grunt);
pm.setOptions(options);

// add filPath and pass them to the translation strings extractor.
pm.addFile("C:/Users/Ma/Dropbox/Projects/grunt-translate-extract/test/srcFiles/test.php");

pm.save();
//# sourceMappingURL=test.js.map
