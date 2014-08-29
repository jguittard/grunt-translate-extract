/**
 * Created by Ma on 23/08/2014.
 */
import Parser = require("./parsers/Parser");
import PHPGettextParser = require("./parsers/PHPGettextParser");
import AngularTranslateParser = require("./parsers/AngularTranslateParser");

var ParserList = {
    gettextPHP:function():Parser{
        return new PHPGettextParser();
    },
    angularTranslate:function():Parser{
        return new AngularTranslateParser();
    }
};

export = ParserList;