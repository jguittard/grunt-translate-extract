/**
 * Created by Ma on 25/08/2014.
 */
/// <reference path="../tasks/def/gruntjs/gruntjs.d.ts"/>
import TranslateExtractor = require("../tasks/TranslateExtractor");
import Options = require("../tasks/Options");

// Merge task-specific and/or target-specific options with these defaults.
var options:Options = new Options();
var grunt:IGrunt = require('grunt');

// init the translation strings extractor
var tExt = new TranslateExtractor();
tExt.setGrunt(grunt);
tExt.setOptions(options);

// add filPath and pass them to the translation strings extractor.
tExt.addFile("./srcFiles/test.php");


// start parsing the sources files looking for translations strings.
tExt.parseFiles();
// save the results of the translation strings extraction.
tExt.save();