var PHPGettextParser = require("./parsers/PHPGettextParser");
var AngularTranslateParser = require("./parsers/AngularTranslateParser");

var ParserList = {
    gettextPHP: function () {
        return new PHPGettextParser();
    },
    angularTranslate: function () {
        return new AngularTranslateParser();
    }
};

module.exports = ParserList;
//# sourceMappingURL=ParserList.js.map
