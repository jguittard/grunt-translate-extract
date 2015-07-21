/**
 * Created by Ma on 17/08/2014.
 */

/// <reference path="./def/gruntjs/gruntjs.d.ts"/>
/// <reference path="./def/node/node.d.ts"/>
/// <reference path="./def/translate-extract.d.ts"/>
import Parser = require("./Parser");
import ParserList = require("./ParserList"); //returns an object instance not a class
import Options = require("./Options");
import utils = require("./Utils");
import TranslationEntry = require("./TranslationEntry");
import p = require("path");
/*
 class Options{
 output:string[] = ["en", "es"];
 outputDir  = "./output";
 builtInParser:string = "gettextPHP";
 customParser:Parser = null;
 sourcesDir:string = null;
 }
 */


/**
 * Manages the process of parse the source files and write the tranlation files.
 * To do so it check the options of the task, parse the source files, read the stored
 * translation files, and join them with the new translation entries found by the Parser.
 */
class ParserManager {

    /**
     * The options or configuration of the task.
     */
    opt:Options;

    /**
     * Grunt object.
     */
    grunt:IGrunt;


    /**
     * The specific parser chosen or written by the user.
     */
    parser:Parser;


    /**
     * Contains all te file names.
     */
    files:string[]=[];

    /**
     * Stores a reference to each translation entry found by the parser.
     * @type {{msgid: string}}
     */
    entriesRecord={
//        "msgid":"filename"
    };


    /**
     * Object Used to generate the translation files, this object contains
     * all the localised string. the json translation files are encoded
     * decoded into this object.
     * @type {{localeName: {key1: string, key2: string}}}
     */
    locales:any = {
//        "eg: localeName": {
//            "key1": "translate this msgstr",
//            "key2": "hello world"
//        }
    };

    /**
     * Sets the grunt task runner object.
     * @param grunt
     */
    setGrunt(grunt:IGrunt) {
        this.grunt = grunt;
    }


    /**
     * Sets the task options and initializes the parsing process.
     * @param options
     */
    setOptions(options:Options) {
        this.opt = options;
        this.initParser();
        this.initLocales();
    }

    /**
     * Initializes the Locales object using the output passed in options.
     */
    private initLocales() {
        for (var i = 0; i < this.opt.output.length; i++) {
            this.locales[this.opt.output[i]] = {};
        }
    }

    /**
     * Adds an new TransaltionEntry to the output object.
     * The same entry is added for each one of the output
     * set in the options.
     * @param entry
     */
    private addEntryToLocales(entry:TranslationEntry){
        for (var i = 0; i < this.opt.output.length; i++) {
                var key:string = entry.msgid;
                if(entry.msgctxt){
                    key += this.opt.contextSeparator+entry.msgctxt
                }
                if(entry.msgid_plural){
                    this.locales[this.opt.output[i]][key]=entry;
                }else{
                    this.locales[this.opt.output[i]][key]=entry.msgstr;
                }

        }
    }

    /**
     * Saves the output object to filesystem.
     * This.output is subdivided into each locale and saved
     * to teh filesystem in json format.
     */
    private saveLocales(){
        for (var i = 0; i < this.opt.output.length; i++) {
            var lang = this.opt.output[i];
            var path = this.getOutputName(lang);
            this.grunt.file.write(path, JSON.stringify(this.locales[lang], null, '\t'));
        }
    }


    /**
     * Initializes the parser, if options.customParser is st the system wil use this parser,
     * if not the system will use one of the builtInParsers.
     */
    private initParser() {
        if (this.opt.customParser !== null) {
            if (
                typeof this.opt.customParser === "object" &&
                typeof this.opt.customParser.getRegexpList === "function" &&
                typeof this.opt.customParser.parseMatch === "function") {
                this.parser = this.opt.customParser;
                console.log("using custom parser")
            } else {
                this.grunt.fail.fatal("'options.customParser' must be an object and implement the 'getRegexpList()' and 'parseMatch()' methods", 3);
            }
        } else {
            if (typeof this.opt.builtInParser === "string" && typeof ParserList[this.opt.builtInParser] === "function") {
                this.parser = ParserList[this.opt.builtInParser]()
            } else {
                this.grunt.fail.fatal("options.builtInParser: '" + this.opt.builtInParser
                    + "' is not a valid Built-In Parser, please use one of the following values instead. \n"
                    + "[" + utils.getMethods(ParserList).join(" , ") + "]");
            }
        }
    }


    /**
     * Adds one source file to be scanned to find translation entries.
     * @param path
     * @returns {boolean}
     */
    addFile(path:string) {
        if (!this.grunt.file.exists(path))
            return false;
        // Read and return the file's source.
        this.files.push(path);
        this.parseFile(this.grunt.file.read(path),path);
    }

    /**
     * Splits the files in lines and parse each line.
     * @param fContent
     * @param path
     */
    private parseFile(fContent:string,path:string) {
        var matches:number = 0;
        var refexpList:RegExp[] = this.parser.getRegexpList();
        for (var j = 0; j < refexpList.length; j++) {
            matches += this.parseRegexp(refexpList[j],fContent,path);
        }
    }

    /**
     * Reads each line and match it against the list regular expresion returned by
     * the parser.getRegexpList() if one match is found it is passed to the
     * parser.parseMatch() in order to get the msgid and msgstr of the matched translation entry.
     * @param regexp
     * @param lContent
     * @param path
     * @param lineNum
     * @returns {number}
     */
    private parseRegexp(regexp:RegExp,fContent:string,path:string):number {
        var match:RegExpExecArray;
        var matches:number = 0;
        while ((match = regexp.exec(fContent)) !== null) {
            matches ++;
            var entry = this.parser.parseMatch(match,regexp);
            var line:number = this.getLine(match);
            this.checkDuplicateEntry(entry.msgid,path,line);
            entry.line = "# "+path+":"+line;
            this.addEntryToLocales(entry);
        }
        return matches;
    }

    /**
     * If options.errorOnDuplicatedKeys is set to true, throws an error if two
     * translate entries has the same msgid.
     * @param key
     * @param path
     * @param lineNum
     */
    private checkDuplicateEntry(key:string,path:string,lineNum:number){
        if(!this.opt.errorOnDuplicatedKeys)
            return;
        var file1 = this.entriesRecord[key];
        if(typeof file1 !== "undefined"){
            var file2 = "File: '"+ path + "'  Line: "+lineNum;
            this.grunt.fail.warn("Duplicated Translation msgid '"+key+"'\n" +file1+"\n"+file2);
        }else{
            this.entriesRecord[key] = "File: '"+ path + "'  Line: "+lineNum;
        }
    }


    /**
     * Returns the line of the matched regular expression.
     * @param match
     */
    private getLine(match:RegExpExecArray):number{
        var input = match.input.substring(0,match.index+1);//add one character extra to avoid one bug
        // where the \n char is not count when is just before the match.
        var count = (input.match(/\n/g) || []).length + 1; //add one to get the right line (0+1)
        return count;
    }


    /**
     * Saves the translation files to the filesystem.
     */
    public save(){
        this.readLocaleFiles();
        this.saveLocales();
        console.log("Parsed "+ this.files.length +" files. Found " + Object.keys(this.entriesRecord).length + " translation entries.")
    }


    /**
     * Reads the translation previous saved translation files.
     */
    private readLocaleFiles() {
        for (var i = 0; i < this.opt.output.length; i++) {
            var lang = this.opt.output[i];
            var path = this.getOutputName(lang);
            if(!this.grunt.file.exists(path))
                continue;
            ParserManager.joinLocales(this.locales[lang], this.grunt.file.readJSON(path));
        }
    }

    /**
     * Join the values in the translation files with the new translation entries found
     * in the sources files, any values in the translation files will override the
     * value obtained from the source files, this process avoids to loose any translated value.
     * @param newTrans
     * @param oldTrans
     */
    private static joinLocales(newTrans,oldTrans){
        var keys = Object.keys(oldTrans);
        for (var i = 0; i < keys.length; i++) {
            newTrans[keys[i]] = oldTrans[keys[i]];
        }
    }


    /**
     * return the path and filename of the translation file.
     * It is the outputDir + "localeName" + file extension.
     * file extension should be always ".json" but this value can be changed in the
     * options object.
     * @param lang
     * @returns {string}
     */
    private getOutputName(lang:string){
        return p.join(this.opt.basePath, this.opt.outputDir ,lang);
    }


}

export = ParserManager;
