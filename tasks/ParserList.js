var PHPGettextParser = require("./parsers/PHPGettextParser");
var WordpressParser = require("./parsers/WordpressParser");
var AngularTranslateParser = require("./parsers/AngularTranslateParser");

/**
* Contains a list of all the built In parsers.
* Each function of this object is the value used in the options.builtInParser,
* if it match the name of the function than the function will be called and
* therefore return the selected parser.
* @type {{gettextPHP: (function(): Parser), angularTranslate: (function(): Parser)}}
*/
var ParserList = {
    gettextPHP: function () {
        return new PHPGettextParser();
    },
    gettextPHP_KV: function () {
        var p = new PHPGettextParser();
        p.aneableKeyValue();
        return p;
    },
    wordpress: function () {
        return new WordpressParser();
    },
    angularTranslate: function () {
        return new AngularTranslateParser();
    }
};

module.exports = ParserList;
//# sourceMappingURL=ParserList.js.map
