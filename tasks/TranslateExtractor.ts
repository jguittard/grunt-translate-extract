/**
 * Created by Ma on 17/08/2014.
 */

/// <reference path="./def/gruntjs/gruntjs.d.ts"/>
import Parser = require("./parsers/Parser");
import ParserList = require("./ParserList"); //returns an object instance not a class
import Options = require("./Options");
import utils = require("./Utils");

/*
class Options{
    locales:string[] = ["en", "es"];
    outputDir  = "./locales";
    builtInParser:string = "gettextPHP";
    customParser:Parser = null;
    sourcesDir:string = null;
}
*/

class TranslateExtractor{

    opt:Options;

    grunt:IGrunt;

    parser:Parser;


    localeFiles:any = {
        "localeName":{
            "file1":{
                "key1" : "translate this text",
                "key2" : "hello world"
            },
            "file2":{
                "key1" : "translate this text",
                "key2" : "hello world"
            }
        }
    };

    setGrunt(grunt: IGrunt){
        this.grunt = grunt;
    }

    setOptions(options:Options){
        this.opt = options;
        this.initParser();
    }


    /**
     * Checks that the parser object passed in the options
     * is actually a Parser, that means that implements the
     * getRegexps() and parseTranslateEntry() functions.
     */
    private initParser(){

      if( this.opt.customParser !== null){
          if(
              typeof this.opt.customParser === "object" &&
              typeof this.opt.customParser.getRegexpList === "function" &&
              typeof this.opt.customParser.parseTranslateEntry === "function"){
              this.parser = this.opt.customParser;
              console.log("using custom parser")
          }else{
              this.grunt.fail.fatal("'options.customParser' must be an object and implement the 'getRegexpList()' and 'parseTranslateEntry()' methods" , 3);
          }
      }else{
          if(typeof this.opt.builtInParser === "string" && typeof ParserList[this.opt.builtInParser] === "function"){
              this.parser = ParserList[this.opt.builtInParser]()
          }else{
              this.grunt.fail.fatal("options.builtInParser: '"+ this.opt.builtInParser
                  +"' is not a valid Built-In Parser, please use one of the following values instead. \n"
                  +"["+utils.getMethods(ParserList).join(" , ")+"]");
          }
      }
    }


    private readLocaleFiles(){

    }


    addFile(path:string){

    }

    parseFiles(){

    }


    save(){

    }


    private parseFile(){

    }

    private parseLine(){

    }




}

export = TranslateExtractor;
