/**
 * Created by Ma on 02/09/2014.
 */
var utils = require("./../Utils");
var WordpressParser = (function () {
    function WordpressParser() {
        this.single = /\W(?:__|_e|esc_attr__|esc_attr_e|esc_html__|esc_html_e)\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*\)/gm;
        this.plural = /\W_n\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;
        this.context = /\W(?:_x|_ex|esc_attr_x|esc_html_x)\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*\)/gm;
        this.pluralContext = /\W_nx\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*(?:[0-9]+|\$[a-zA-Z0-9 _]+),\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;
    }
    WordpressParser.prototype.getRegexpList = function () {
        return [this.single, this.plural, this.context, this.pluralContext];
    };
    WordpressParser.prototype.parseMatch = function (match, regExp) {
        var key = null, text = null, plural = null, context = null;
        if (this.single.source === regExp.source) {
            key = utils.escapeLiteral(match[1]);
        }
        else if (this.plural.source === regExp.source) {
            key = utils.escapeLiteral(match[1]);
            plural = utils.escapeLiteral(match[2]);
        }
        else if (this.context.source === regExp.source) {
            key = utils.escapeLiteral(match[1]);
            context = utils.escapeLiteral(match[2]);
        }
        else if (this.pluralContext.source === regExp.source) {
            plural = utils.escapeLiteral(match[2]);
            key = utils.escapeLiteral(match[1]);
            context = utils.escapeLiteral(match[3]);
        }
        if (key === null)
            throw "Unexpected regular expression match / " + match[0] + " /";
        return { msgid: key, msgstr: text, msgid_plural: plural, msgctxt: context, line: null };
    };
    return WordpressParser;
})();
module.exports = WordpressParser;
