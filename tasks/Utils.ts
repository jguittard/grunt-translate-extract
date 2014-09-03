/**
 * Created by Ma on 26/08/2014.
 */


/**
 * Returns and array with all the methods of the passed object as strings.
 * @param obj
 * @returns {Array}
 */
export function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof(obj[id]) == "function") {
                result.push(id);
            }
        } catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}

/**
 * Scape a string literal so it can be used in json.
 * That means scapped single quotes \' will be unescaped if the literal is enclosed in single quotes,
 * and scaped double quotes will be unescaped is the literal is enclosed in double quotes.
 * eg: 'mary\'s house' =returns=> mary's house
 * eg: "mary\'s house" =returns=> mary\'s house
 * eg: 'mary\"s house' =returns=> mary\"s house
 * eg: "mary\"s house" =returns=> mary"s house
 * @param unescapedLiteral
 * @returns {*}
 */
export function escapeLiteral(unescapedLiteral:string):any{
    var trim = unescapedLiteral.trim();
    var l = trim.length;
    var firstQuote = trim.charAt(0);
    var lastQuote = trim.charAt(l-1);
    var text = trim.substring(1,l-1);
    if(firstQuote==="'" && lastQuote==="'"){
        return text.replace("\\'","'");
    }else if(firstQuote==="\"" && lastQuote==="\""){
        return text.replace('\\"','"');
    }else{
        return false;
    }
}