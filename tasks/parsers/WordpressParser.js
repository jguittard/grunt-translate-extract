/**
* Created by Ma on 02/09/2014.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PHPGettextParser = require("./PHPGettextParser");

var WordpressParser = (function (_super) {
    __extends(WordpressParser, _super);
    function WordpressParser() {
        _super.apply(this, arguments);
        this.wordpressRegexp = /(->\s*|\s+)__\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
        this.wordpressEchoRegexp = /(->\s*|\s+)_e\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
    }
    /**
    * Returns the regular expression that delimits each TranslationEntry.
    * Note that it returns a array with one or more regexps.
    * @return RegExp[]
    */
    WordpressParser.prototype.getRegexpList = function () {
        return [this.wordpressRegexp, this.wordpressEchoRegexp];
    };
    return WordpressParser;
})(PHPGettextParser);

module.exports = WordpressParser;
//# sourceMappingURL=WordpressParser.js.map
