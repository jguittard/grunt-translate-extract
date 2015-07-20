/**
 * Created by Ma on 16/08/2014.
 */
var utils = require("./../Utils");
var PHPGettextParser = (function () {
    function PHPGettextParser() {
        this.gettext = /\W(?:_|gettext)\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*\)/gm;
        this.ngettext = /\Wngettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;
        this.dgettext = /\Wdgettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*\)/gm;
        this.dngettext = /\Wdngettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;
        this.dcgettext = /\Wdcgettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;
        this.dcngettext = /\Wdcngettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;
    }
    PHPGettextParser.prototype.getRegexpList = function () {
        return [this.gettext, this.ngettext, this.dgettext, this.dngettext, this.dcgettext, this.dcngettext];
    };
    PHPGettextParser.prototype.parseMatch = function (match, regExp) {
        var x = (this.gettext.source === regExp.source);
        var key = null, text = null, plural = null, context = null;
        if (this.gettext.source === regExp.source) {
            key = utils.escapeLiteral(match[1]);
        }
        else if (this.ngettext.source === regExp.source) {
            key = utils.escapeLiteral(match[1]);
            plural = utils.escapeLiteral(match[2]);
        }
        else if (this.dgettext.source === regExp.source) {
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }
        else if (this.dngettext.source === regExp.source) {
            plural = utils.escapeLiteral(match[3]);
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }
        else if (this.dcgettext.source === regExp.source) {
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }
        else if (this.dcngettext.source === regExp.source) {
            plural = utils.escapeLiteral(match[3]);
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }
        if (key === null)
            throw "Unexpected regular expression match / " + match[0] + " /";
        return { msgid: key, msgstr: text, msgid_plural: plural, msgctxt: context, line: null };
    };
    return PHPGettextParser;
})();
module.exports = PHPGettextParser;
