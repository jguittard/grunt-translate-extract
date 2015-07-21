/**
 * Created by Ma on 17/08/2014.
 */
var ParserList = require("./ParserList");
var utils = require("./Utils");
var p = require("path");
var ParserManager = (function () {
    function ParserManager() {
        this.files = [];
        this.entriesRecord = {};
        this.locales = {};
    }
    ParserManager.prototype.setGrunt = function (grunt) {
        this.grunt = grunt;
    };
    ParserManager.prototype.setOptions = function (options) {
        this.opt = options;
        this.initParser();
        this.initLocales();
    };
    ParserManager.prototype.initLocales = function () {
        for (var i = 0; i < this.opt.output.length; i++) {
            this.locales[this.opt.output[i]] = {};
        }
    };
    ParserManager.prototype.addEntryToLocales = function (entry) {
        for (var i = 0; i < this.opt.output.length; i++) {
            var key = entry.msgid;
            if (entry.msgctxt) {
                key += this.opt.contextSeparator + entry.msgctxt;
            }
            if (entry.msgid_plural) {
                this.locales[this.opt.output[i]][key] = entry;
            }
            else {
                this.locales[this.opt.output[i]][key] = entry.msgstr;
            }
        }
    };
    ParserManager.prototype.saveLocales = function () {
        for (var i = 0; i < this.opt.output.length; i++) {
            var lang = this.opt.output[i];
            var path = this.getOutputName(lang);
            this.grunt.file.write(path, JSON.stringify(this.locales[lang], null, '\t'));
        }
    };
    ParserManager.prototype.initParser = function () {
        if (this.opt.customParser !== null) {
            if (typeof this.opt.customParser === "object" &&
                typeof this.opt.customParser.getRegexpList === "function" &&
                typeof this.opt.customParser.parseMatch === "function") {
                this.parser = this.opt.customParser;
                console.log("using custom parser");
            }
            else {
                this.grunt.fail.fatal("'options.customParser' must be an object and implement the 'getRegexpList()' and 'parseMatch()' methods", 3);
            }
        }
        else {
            if (typeof this.opt.builtInParser === "string" && typeof ParserList[this.opt.builtInParser] === "function") {
                this.parser = ParserList[this.opt.builtInParser]();
            }
            else {
                this.grunt.fail.fatal("options.builtInParser: '" + this.opt.builtInParser
                    + "' is not a valid Built-In Parser, please use one of the following values instead. \n"
                    + "[" + utils.getMethods(ParserList).join(" , ") + "]");
            }
        }
    };
    ParserManager.prototype.addFile = function (path) {
        if (!this.grunt.file.exists(path))
            return false;
        this.files.push(path);
        this.parseFile(this.grunt.file.read(path), path);
    };
    ParserManager.prototype.parseFile = function (fContent, path) {
        var matches = 0;
        var refexpList = this.parser.getRegexpList();
        for (var j = 0; j < refexpList.length; j++) {
            matches += this.parseRegexp(refexpList[j], fContent, path);
        }
    };
    ParserManager.prototype.parseRegexp = function (regexp, fContent, path) {
        var match;
        var matches = 0;
        while ((match = regexp.exec(fContent)) !== null) {
            matches++;
            var entry = this.parser.parseMatch(match, regexp);
            var line = this.getLine(match);
            this.checkDuplicateEntry(entry.msgid, path, line);
            entry.line = "# " + path + ":" + line;
            this.addEntryToLocales(entry);
        }
        return matches;
    };
    ParserManager.prototype.checkDuplicateEntry = function (key, path, lineNum) {
        if (!this.opt.errorOnDuplicatedKeys)
            return;
        var file1 = this.entriesRecord[key];
        if (typeof file1 !== "undefined") {
            var file2 = "File: '" + path + "'  Line: " + lineNum;
            this.grunt.fail.warn("Duplicated Translation msgid '" + key + "'\n" + file1 + "\n" + file2);
        }
        else {
            this.entriesRecord[key] = "File: '" + path + "'  Line: " + lineNum;
        }
    };
    ParserManager.prototype.getLine = function (match) {
        var input = match.input.substring(0, match.index + 1);
        var count = (input.match(/\n/g) || []).length + 1;
        return count;
    };
    ParserManager.prototype.save = function () {
        this.readLocaleFiles();
        this.saveLocales();
        console.log("Parsed " + this.files.length + " files. Found " + Object.keys(this.entriesRecord).length + " translation entries.");
    };
    ParserManager.prototype.readLocaleFiles = function () {
        for (var i = 0; i < this.opt.output.length; i++) {
            var lang = this.opt.output[i];
            var path = this.getOutputName(lang);
            if (!this.grunt.file.exists(path))
                continue;
            ParserManager.joinLocales(this.locales[lang], this.grunt.file.readJSON(path));
        }
    };
    ParserManager.joinLocales = function (newTrans, oldTrans) {
        var keys = Object.keys(oldTrans);
        for (var i = 0; i < keys.length; i++) {
            newTrans[keys[i]] = oldTrans[keys[i]];
        }
    };
    ParserManager.prototype.getOutputName = function (lang) {
        return p.join(this.opt.basePath, this.opt.outputDir, lang);
    };
    return ParserManager;
})();
module.exports = ParserManager;
