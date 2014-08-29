/**
 * Created by Ma on 16/08/2014.
 */


/**
 * Represents a string in the sources files that should be translated.
 * Each entry is composed by the 'key' which is unique in the whole file, and the text
 * that is an optional parameter. this is optional text only works as a guide for the translators,
 * and can be replaced in the translation files by any original text.
 */
class TranslationEntry{
    /**
     * Unique key for the translate entry in the source file.
     * There can't be two entries with the same key in one file.
     */
    public key:string;

    /**
     * The text to translate.
     */
    public text:string;

    constructor(key:string,text:string){
        this.key = key;
        this.text = text;
    }
}

export = TranslationEntry;