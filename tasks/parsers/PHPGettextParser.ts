/**
 * Created by Ma on 16/08/2014.
 */

import Parser = require("./Parser");
import TranslateEntry = require("./../TranslationEntry");
import utils = require("./../Utils");


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

    wordpressRegexp = /(->\s*|\s+)__\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
    wordpressEchoRegexp = /(->\s*|\s+)_e\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;

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
    parseMatch(match:RegExpExecArray):TranslateEntry{
        var text = utils.escapeLiteral(match[2]);
        if(text === false)
            throw "Unexpected regular expression match / "+match[0]+" /";
        return {key:text,text:text};
    }
}

export = PHPGettextParser;