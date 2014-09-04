/**
 * Created by Ma on 16/08/2014.
 */
import TranslateEntry = require("./../TranslationEntry");

/**
 * Implements this interface to create a parser to match and extract translatable string.
 */
interface TranslateEntryParser{

    /**
     * Returns a list of regular expression that delimits each TranslationEntry.
     * @return RegExp[] ie:[/\[\[.+\]\]/g, /\{\{(.+?)\}\}/g]
     */
    getRegexpList():RegExp[];


    /**
     * Gets the raw text of one TranslationEntry and return its key and text.
     * ie: gets "title : this is the title" and returns a new TranslationEntry{key:"title",text:"this is the title"}.
     * @param filename current file name.
     * @param lineNum current line number.
     * @param text the raw text of the translate entry.
     * @return TranslationEntry.
     */
    parseMatch(match:RegExpExecArray):TranslateEntry;


}

export = TranslateEntryParser;