/**
 * Created by Ma on 25/08/2014.
 */
import Parser = require("./parsers/Parser");


/**
 * Options passed to the grunt task.
 */
class Options{

    /**
     * An array containing  the locales used by the system.
     * eg: ["en","es","de","fr"].
     * Default value = ["en", "es"];
     * @type {string[]}
     */
    locales:string[] = ["en", "es"];

    /**
     * Directory where the translation files will be generated.
     * Default value = "./locales";
     * @type {string}
     */
    outputDir  = "./locales";

    /**
     * The extension used for the generated translation files,
     * this option is not documented, and should not be override.
     * even if the extension is changed the content of the generated file
     * is a json object.
     * @type {string}
     */
    outputExtension:string=".json";

    /**
     * Sets one of The built in parsers, each parser is designed to match the strings to translate in a different
     * programing language. eg: php gettext calls, angular translator, etc.
     * Default value = "gettextPHP";
     * @type {string}
     */
    builtInParser:string = "gettextPHP";

    /**
     * If there is no default build in parsing matching your requirements you write your custom parser.
     * A custom parser is and object implementing the methods 'getRegexpList()' that returns a list of regular
     * expressions to match the string in the source code, and the method  'parseMatch()' that parse the matched
     * string anf return a key and the text to translate; eg: return {key:"title",text:"this is the title to translate"};
     * If this object is implemented any value in options.builtInParses will be ignored.
     * Default value = null;
     * @type {null}
     */
    customParser:Parser = null;

    /**
     * If true the system will throw an error when finds two translate entries with the same key, if false
     * the string will be considered the same string and work normally.
     * Default value = true;
     * @type {boolean}
     */
    errorOnDuplicatedKeys:boolean = true;
}

export = Options;