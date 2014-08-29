/**
 * Created by Ma on 26/08/2014.
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