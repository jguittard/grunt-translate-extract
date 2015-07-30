/**
 * Created by Ma on 26/08/2014.
 */
function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof (obj[id]) == "function") {
                result.push(id);
            }
        }
        catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}
exports.getMethods = getMethods;
function escapeLiteral(unescapedLiteral) {
    var trim = unescapedLiteral.trim();
    var l = trim.length;
    var firstQuote = trim.charAt(0);
    var lastQuote = trim.charAt(l - 1);
    var text = trim.substring(1, l - 1);
    if (firstQuote === "'" && lastQuote === "'") {
        return text.replace("\\'", "'");
    }
    else if (firstQuote === "\"" && lastQuote === "\"") {
        return text.replace('\\"', '"');
    }
    else {
        return false;
    }
}
exports.escapeLiteral = escapeLiteral;
