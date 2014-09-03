var AngularTranslateParser = (function () {
    function AngularTranslateParser() {
    }
    /**
    * Returns the regular expression that delimits each TranslationEntry.
    * Note that it returns a array with one or more regexps.
    * @return RegExp[] ie:[ /\[\[.+\]\]/g , /\{\{(.+?)\}\}/g]
    */
    AngularTranslateParser.prototype.getRegexpList = function () {
        return [/\{\{(.+?)\}\}/g];
    };

    /**
    * Gets the raw text of one TranslationEntry and return its key and text.
    * ie: gets "title : this is the title" and returns a new TranslationEntry{key:"title",text:"this is the title"}.
    * @param filename current file name.
    * @param lineNum current line number.
    * @param text the raw text of the translate entry.
    * @return TranslateEntry.
    */
    AngularTranslateParser.prototype.parseMatch = function (match) {
        return { key: "test", text: "this is sparta" };
    };
    return AngularTranslateParser;
})();
module.exports = AngularTranslateParser;
//# sourceMappingURL=AngularTranslateParser.js.map
