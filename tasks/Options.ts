/**
 * Created by Ma on 25/08/2014.
 */
import Parser = require("./parsers/Parser");


class Options{
    locales:string[] = ["en", "es"];
    outputDir  = "./locales";
    builtInParser:string = "gettextPHP";
    customParser:Parser = null;
    sourcesDir:string = null;
}

export = Options;