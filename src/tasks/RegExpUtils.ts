/**
 * Created by Ma jerez on 12/07/2015.
 */

class RegExpUtils{

    /**
     * Regexp matching a php variable. ie: $domain
     */
    static phpVar = "\$[a-zA-Z0-9 _]+";
    /**
     * phpVar short hand.
     * @type {string}
     */
    static pv = RegExpUtils.phpVar;


    /**
     * Regexp matching a double quotes string literal. ie: "hello"
     */
    static doubleQuoteLiteral = '"(\\.|[^"])*"';
    /**
     * doubleQuoteLiteral short hand.
     * @type {string}
     */
    static dql = RegExpUtils.doubleQuoteLiteral;

    /**
     * Regexp matching a single quotes string literal. ie:'hello'
     * @type {string}
     */
    static singleQuoteLiteral = "'(\\.|[^'])*'";
    /**
     * singleQuoteLiteral short hand.
     * @type {string}
     */
    static sql = RegExpUtils.singleQuoteLiteral;


    /**
     * Regexp group for any string literal, single or double quotes.
     * @type {string}
     */
    static stringLiteral = "("+RegExpUtils.dql+"|"+RegExpUtils.sql+")";
    /**
     * stringLiteral shot hand.
     * @type {string}
     */
    static sl = RegExpUtils.stringLiteral;


    /**
     * Regexp group of single or double quotes literal or php var;
     * @type {string}
     */
    static stringLiteralORphpVar = "("+RegExpUtils.dql+"|"+RegExpUtils.sql+"|"+RegExpUtils.phpVar+")";
    /**
     * stringLiteralORphpVar short hand;
     * @type {string}
     */
    static slphp = RegExpUtils.stringLiteralORphpVar;


    static ws = "\\s*"
}

export = RegExpUtils;