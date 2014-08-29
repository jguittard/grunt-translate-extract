/**
 * Created by Ma on 16/08/2014.
 */

import Parser = require("./Parser");
import TranslateEntry = require("./../TranslationEntry");


class PHPGettextParser implements Parser{

    /**
     * Matches any of the following functions calls and first parameter of the function.
     * ie:
     * functionName("index"
     * functionName("escaped\"doubleQuotes"
     * functionName('index'
     * functionName('escaped\'singleQuotes'
     *
     * Does not match correctly any concatenation or operation.
     * ie:
     * functionName("index"+"continue"
     *
     * This only works with functions where the first parameter is the index or key of the
     * TranslationEntry, the rest of parameter are ignored.
     *
     * @type {RegExp}
     */
    referenceRegexp = /(->\s*|\s+)functionName\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;


    gettextRegexp = /(->\s*|\s+)_\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;

    /**
     * Returns the regular expression that delimits each TranslationEntry.
     * Note that it returns a array with one or more regexps.
     * @return RegExp[]
     */
    getRegexpList():RegExp[]{
        return [this.gettextRegexp];
    }


    /**
     * Gets the raw text of one TranslationEntry and return its key and text.
     * ie: gets "title : this is the title" and returns a new TranslationEntry{key:"title",text:"this is the title"}.
     * @param filename current file name.
     * @param lineNum current line number.
     * @param text the raw text of the translate entry.
     * @return TranslateEntry.
     */
    parseTranslateEntry(filename:string, lineNum:number, text:string):TranslateEntry{
        return {key:"test",text:"this is sparta"};
    }
}

export = PHPGettextParser;