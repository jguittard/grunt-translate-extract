/**
 * Created by Ma on 16/08/2014.
 */
/**
 * Represents a string in the sources files that should be translated.
 * Each entry is composed by the 'msgid' which is unique in the whole file, and the msgstr
 * that is an optional parameter. this is optional msgstr only works as a guide for the translators,
 * and can be replaced in the translation files by any original text.
 */
class TranslationEntry{

    /**
     * Unique msgid for the translate entry in the source file.
     * There can't be two entries with the same msgid in one file.
     */
    public  msgid:string;

    /**
     * The msgstr to translate.
     */
    public msgstr:string;


    /**
     * Plural for of the msgstr to translate
     */
    public msgid_plural:string;


    /**
     * Context used for words disambiguation
     */
    public msgctxt:string;


    /**
     * Line number of the Entry in the source code
     */
    public line:string;




    constructor(key:string,text:string,plural:string,context:string){
        this.msgid = key;
        this.msgstr = text;
        this.msgid_plural = plural;
        this.msgctxt = context;
    }
}

export = TranslationEntry;