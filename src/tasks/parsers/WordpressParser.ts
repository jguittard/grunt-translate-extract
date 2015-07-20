/**
 * Created by Ma on 02/09/2014.
 */

import PHPGettextParser = require("./PHPGettextParser");


class WordpressParser extends PHPGettextParser{


    regexp = /(?:_e|__|_x|_ex)\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/gm;
    plural = /_n\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/gm;
    context = /_x\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/gm;


    /**
     * Returns the regular expression that delimits each TranslationEntry.
     * Note that it returns a array with one or more regexps.
     * @return RegExp[]
     */
    getRegexpList():RegExp[]{
        return [this.regexp];
    }
}

export = WordpressParser;