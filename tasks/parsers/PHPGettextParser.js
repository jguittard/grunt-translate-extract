/**
* Created by Ma on 16/08/2014.
*/
var utils = require("./../Utils");

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
        this.gettextRegexp = /(->\s*|\s+)_\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
        this.keyValue = false;
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
    * Enable to split the matched string in key | value;
    * This is a hack to enable work with functions like phpgetext _("key | default text to translate")
    * So it is easy to make changes to the text without change the key.
    */
    PHPGettextParser.prototype.aneableKeyValue = function () {
        this.keyValue = true;
    };

    /**
    * Gets the raw text of one TranslationEntry and return its key and text.
    * ie: gets "title : this is the title" and returns a new TranslationEntry{key:"title",text:"this is the title"}.
    * @param filename current file name.
    * @param lineNum current line number.
    * @param text the raw text of the translate entry.
    * @return TranslateEntry.
    */
    PHPGettextParser.prototype.parseMatch = function (match) {
        var text = utils.escapeLiteral(match[2]);
        if (text === false)
            throw "Unexpected regular expression match / " + match[0] + " /";
        if (!this.keyValue)
            return { "key": text, "text": text };

        var pos = text.indexOf("|");
        if (pos > 0)
            return { "key": text.substr(0, pos), "text": text.substr(pos + 1) };
        else
            return { "key": text, "text": text };
    };
    return PHPGettextParser;
})();

module.exports = PHPGettextParser;
//# sourceMappingURL=PHPGettextParser.js.map
