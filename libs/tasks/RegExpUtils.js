/**
 * Created by Ma jerez on 12/07/2015.
 */
var RegExpUtils = (function () {
    function RegExpUtils() {
    }
    RegExpUtils.phpVar = "\$[a-zA-Z0-9 _]+";
    RegExpUtils.pv = RegExpUtils.phpVar;
    RegExpUtils.doubleQuoteLiteral = '"(\\.|[^"])*"';
    RegExpUtils.dql = RegExpUtils.doubleQuoteLiteral;
    RegExpUtils.singleQuoteLiteral = "'(\\.|[^'])*'";
    RegExpUtils.sql = RegExpUtils.singleQuoteLiteral;
    RegExpUtils.stringLiteral = "(" + RegExpUtils.dql + "|" + RegExpUtils.sql + ")";
    RegExpUtils.sl = RegExpUtils.stringLiteral;
    RegExpUtils.stringLiteralORphpVar = "(" + RegExpUtils.dql + "|" + RegExpUtils.sql + "|" + RegExpUtils.phpVar + ")";
    RegExpUtils.slphp = RegExpUtils.stringLiteralORphpVar;
    RegExpUtils.ws = "\\s*";
    return RegExpUtils;
})();
module.exports = RegExpUtils;
