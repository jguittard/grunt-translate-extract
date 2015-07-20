var utils = require("../Utils");
var AngularTranslateParser = (function () {
    function AngularTranslateParser() {
    }
    AngularTranslateParser.prototype.getRegexpList = function () {
        return [/\{\{\s*([a-zA-Z_]+[a-zA-Z0-9_]*)\s*\|\s*translate\s*\}\}/g];
    };
    AngularTranslateParser.prototype.parseMatch = function (match, regExp) {
        var text = utils.escapeLiteral(match[1]);
        if (text === false)
            text = match[1];
        return { msgid: text, msgstr: text, msgid_plural: null, msgctxt: null, line: null };
    };
    AngularTranslateParser._asd = "";
    return AngularTranslateParser;
})();
module.exports = AngularTranslateParser;
