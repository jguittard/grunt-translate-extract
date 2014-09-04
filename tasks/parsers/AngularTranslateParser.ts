/**
 * Created by Ma on 16/08/2014.
 */
import TranslateEntryParser = require("./Parser");
import TranslateEntry = require("./../TranslationEntry");
import utils = require("./../Utils");


class AngularTranslateParser implements TranslateEntryParser{

    /**
     * Returns the regular expression that delimits each TranslationEntry.
     * Note that it returns a array with one or more regexps.
     * @return RegExp[] ie:[ /\[\[.+\]\]/g , /\{\{(.+?)\}\}/g]
     */
    getRegexpList():RegExp[]{
        return [  /\{\{\s*(.+?)\s*\|\s*translate\s*\}\}/g ];
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
        var text = utils.escapeLiteral(match[1]);
        if(text === false)
            text = match[1];
        return {key:text,text:text};
    }
}
export = AngularTranslateParser;