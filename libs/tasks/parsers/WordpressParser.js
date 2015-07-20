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
        this.regexp = /(?:_e|__|_x|_ex)\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/gm;
        this.plural = /_n\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/gm;
        this.context = /_x\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/gm;
    }
    WordpressParser.prototype.getRegexpList = function () {
        return [this.regexp];
    };
    return WordpressParser;
})(PHPGettextParser);
module.exports = WordpressParser;
