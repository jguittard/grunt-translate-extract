/**
* Created by Ma on 16/08/2014.
*/
var PHPGettextParser = (function () {
    function PHPGettextParser() {
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
        this.referenceRegexp = /(->\s*|\s+)functionName\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
        this.gettextRegexp = /(->\s*|\s+)_\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
    }
    /**
    * Returns the regular expression that delimits each TranslationEntry.
    * Note that it returns a array with one or more regexps.
    * @return RegExp[]
    */
    PHPGettextParser.prototype.getRegexpList = function () {
        return [this.gettextRegexp];
    };

    /**
    * Gets the raw text of one TranslationEntry and return its key and text.
    * ie: gets "title : this is the title" and returns a new TranslationEntry{key:"title",text:"this is the title"}.
    * @param filename current file name.
    * @param lineNum current line number.
    * @param text the raw text of the translate entry.
    * @return TranslateEntry.
    */
    PHPGettextParser.prototype.parseTranslateEntry = function (filename, lineNum, text) {
        return { key: "test", text: "this is sparta" };
    };
    return PHPGettextParser;
})();

module.exports = PHPGettextParser;
//# sourceMappingURL=PHPGettextParser.js.map
