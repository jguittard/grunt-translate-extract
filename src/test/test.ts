/**
 * Created by Ma on 25/08/2014.
 */
/// <reference path="../tasks/def/gruntjs/gruntjs.d.ts"/>
import ParserManager = require("../tasks/ParserManager");
import Options = require("../tasks/Options");

// Merge task-specific and/or target-specific options with these defaults.
var options:Options = new Options("../../");
console.log(options);
options.outputDir = "/testFiles/locales/";
options.builtInParser = "wordpress";
options.output = [
    'en.json',
    'es.json'
];
var grunt:IGrunt = require('grunt');

// init the translation strings extractor
var pm = new ParserManager();
pm.setGrunt(grunt);
pm.setOptions(options);

// add filPath and pass them to the translation strings extractor.
//pm.addFile(__dirname+"/../../testFiles/gettext.php");
pm.addFile(__dirname+"/../../testFiles/wordpress.php");

pm.save();



