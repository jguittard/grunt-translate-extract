/**
 * Created by Ma on 25/08/2014.
 */
import Parser = require("./Parser");
import path = require("path");

/**
 * Options passed to the grunt task.
 */
class Options{

    /**
     * An array containing  the output or "localization" file names.
     * eg: ["en","es","de","fr"].
     * Default value = ["en", "es"];
     * @type {string[]}
     */
    output:string[] = [ 'en.json', 'es.json' , 'fr.json', 'de.json'];

    /**
     * Directory where the translation files will be generated.
     * Default value = "./output";
     * @type {string}
     */
    outputDir  = "locales";


    /**
     * The root directory of the project.
     * @type {null}
     */
    basePath = null;


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
     * string anf return a msgid and the msgstr to translate; eg: return {msgid:"title",msgstr:"this is the title to translate"};
     * If this object is implemented any value in options.builtInParses will be ignored.
     * Default value = null;
     * @type {null}
     */
    customParser:Parser = null;

    /**
     * If true the system will throw an error when finds two translate entries with the same msgid, if false
     * the string will be considered the same string and work normally.
     * Default value = false;
     * @type {boolean}
     */
    errorOnDuplicatedKeys:boolean = false;


    /**
     * When context is defined the msqid = msgid+contextSeparator+msgcntxt;
     * @type {string}
     */
    contextSeparator:string = "\u0004";


    /**
     * Creates a default options object.
     * @param relPath
     */
    constructor(relPath:string = ""){
        this.basePath = path.resolve(path.join(".",relPath));
    }
}

export = Options;