/**
* Created by Ma on 17/08/2014.
*/
var ParserList = require("./ParserList");

var utils = require("./Utils");

/*
class Options{
locales:string[] = ["en", "es"];
outputDir  = "./locales";
builtInParser:string = "gettextPHP";
customParser:Parser = null;
sourcesDir:string = null;
}
*/
var TranslateExtractor = (function () {
    function TranslateExtractor() {
        this.localeFiles = {
            "localeName": {
                "file1": {
                    "key1": "translate this text",
                    "key2": "hello world"
                },
                "file2": {
                    "key1": "translate this text",
                    "key2": "hello world"
                }
            }
        };
    }
    TranslateExtractor.prototype.setGrunt = function (grunt) {
        this.grunt = grunt;
    };

    TranslateExtractor.prototype.setOptions = function (options) {
        this.opt = options;
        this.initParser();
    };

    /**
    * Checks that the parser object passed in the options
    * is actually a Parser, that means that implements the
    * getRegexps() and parseTranslateEntry() functions.
    */
    TranslateExtractor.prototype.initParser = function () {
        if (this.opt.customParser !== null) {
            if (typeof this.opt.customParser === "object" && typeof this.opt.customParser.getRegexpList === "function" && typeof this.opt.customParser.parseTranslateEntry === "function") {
                this.parser = this.opt.customParser;
                console.log("using custom parser");
            } else {
                this.grunt.fail.fatal("'options.customParser' must be an object and implement the 'getRegexpList()' and 'parseTranslateEntry()' methods", 3);
            }
        } else {
            if (typeof this.opt.builtInParser === "string" && typeof ParserList[this.opt.builtInParser] === "function") {
                this.parser = ParserList[this.opt.builtInParser]();
            } else {
                this.grunt.fail.fatal("options.builtInParser: '" + this.opt.builtInParser + "' is not a valid Built-In Parser, please use one of the following values instead. \n" + "[" + utils.getMethods(ParserList).join(" , ") + "]");
            }
        }
    };

    TranslateExtractor.prototype.readLocaleFiles = function () {
    };

    TranslateExtractor.prototype.addFile = function (path) {
    };

    TranslateExtractor.prototype.parseFiles = function () {
    };

    TranslateExtractor.prototype.save = function () {
    };

    TranslateExtractor.prototype.parseFile = function () {
    };

    TranslateExtractor.prototype.parseLine = function () {
    };
    return TranslateExtractor;
})();

module.exports = TranslateExtractor;
//# sourceMappingURL=TranslateExtractor.js.map
