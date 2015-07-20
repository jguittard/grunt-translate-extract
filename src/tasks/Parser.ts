/**
 * Created by Ma on 16/08/2014.
 */
import TranslationEntry = require("TranslationEntry");

/**
 * Implements this interface to create a parser to match and extract translatable string.
 */
interface Parser{

    /**
     * Returns a list of regular expression that delimits each TranslationEntry.
     * @return RegExp[] ie:[/\[\[.+\]\]/g, /\{\{(.+?)\}\}/g]
     */
    getRegexpList():RegExp[];


    /**
     * Gets a regexp match an return a new TranslationEntry with at least
     * the msgid initialized, msgctxt and plurals are initialized if the regexp
     * contains msgid_plural or msgctxt, line and msgstr will be filled by the ParserManager
     * on a later stage.
     * @param match the match result.
     * @param regExp the matched regular expression.
     */
    parseMatch(match:RegExpExecArray,regExp:RegExp):TranslationEntry;

}
export = Parser;