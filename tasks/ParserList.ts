/**
 * Created by Ma on 23/08/2014.
 */
import Parser = require("./parsers/Parser");
import PHPGettextParser = require("./parsers/PHPGettextParser");
import WordpressParser = require("./parsers/WordpressParser");
import AngularTranslateParser = require("./parsers/AngularTranslateParser");


/**
 * Contains a list of all the built In parsers.
 * Each function of this object is the value used in the options.builtInParser,
 * if it match the name of the function than the function will be called and
 * therefore return the selected parser.
 * @type {{gettextPHP: (function(): Parser), angularTranslate: (function(): Parser)}}
 */
var ParserList = {
    gettextPHP:function():Parser{
        return new PHPGettextParser();
    },
    gettextPHP_KV:function():Parser{
        var p = new PHPGettextParser();
        p.aneableKeyValue();
        return p;
    },
    wordpress:function():Parser{
        return new WordpressParser();
    },
    angularTranslate:function():Parser{
        return new AngularTranslateParser();
    }
};

export = ParserList;