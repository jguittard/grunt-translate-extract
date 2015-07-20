/**
 * Created by Ma on 16/08/2014.
 */
import Parser = require("../Parser");
import TranslateEntry = require("../TranslationEntry");
import utils = require("../Utils");


class AngularTranslateParser implements Parser{

    /**
     * Returns the regular expression that delimits each TranslationEntry.
     * Note that it returns a array with one or more regexps.
     * @return RegExp[] ie:[ /\[\[.+\]\]/g , /\{\{(.+?)\}\}/g]
     */
    getRegexpList():RegExp[]{
        return [  /\{\{\s*([a-zA-Z_]+[a-zA-Z0-9_]*)\s*\|\s*translate\s*\}\}/g ];
    }

    static _asd = "";
    /**
     * Gets the raw text of one TranslationEntry and return its msgid and msgstr.
     * ie: gets "title : this is the title" and returns a new TranslationEntry{msgid:"title",msgstr:"this is the title"}.
     * @param filename current file name.
     * @param lineNum current line number.
     * @param msgstr the raw text of the translate entry.
     * @return TranslateEntry.
     */
    parseMatch(match:RegExpExecArray,regExp:RegExp):TranslateEntry{
        var text = utils.escapeLiteral(match[1]);
        if(text === false)
            text = match[1];
        return {msgid:text,msgstr:text,msgid_plural:null,msgctxt:null,line:null};
    }
}

export = AngularTranslateParser;