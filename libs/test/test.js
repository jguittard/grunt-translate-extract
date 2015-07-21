/// <reference path="../tasks/def/gruntjs/gruntjs.d.ts"/>
var ParserManager = require("../tasks/ParserManager");
var Options = require("../tasks/Options");
var options = new Options("../../");
console.log(options);
options.outputDir = "/testFiles/locales/";
options.builtInParser = "wordpress";
options.output = [
    'en.json',
    'es.json'
];
var grunt = require('grunt');
var pm = new ParserManager();
pm.setGrunt(grunt);
pm.setOptions(options);
pm.addFile(__dirname + "/../../testFiles/wordpress.php");
pm.save();
