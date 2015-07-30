var PHPGettextParser = require("./parsers/PHPGettextParser");
var WordpressParser = require("./parsers/WordpressParser");
var AngularTranslateParser = require("./parsers/AngularTranslateParser");
var ParserList = {
    gettextPHP: function () {
        return new PHPGettextParser();
    },
    wordpress: function () {
        return new WordpressParser();
    },
    angularTranslate: function () {
        return new AngularTranslateParser();
    }
};
module.exports = ParserList;
