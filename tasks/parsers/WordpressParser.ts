/**
 * Created by Ma on 02/09/2014.
 */

import PHPGettextParser = require("./PHPGettextParser");


class WordpressParser extends PHPGettextParser{


    wordpressRegexp = /(->\s*|\s+)__\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;
    wordpressEchoRegexp = /(->\s*|\s+)_e\(\s*("(\\.|[^"])*"|'(\\.|[^'])*')/gm;

    /**
     * Returns the regular expression that delimits each TranslationEntry.
     * Note that it returns a array with one or more regexps.
     * @return RegExp[]
     */
    getRegexpList():RegExp[]{
        return [this.wordpressRegexp,this.wordpressEchoRegexp ];
    }


}

export = WordpressParser;