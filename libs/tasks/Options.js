var path = require("path");
var Options = (function () {
    function Options(relPath) {
        if (relPath === undefined) { relPath = ""; }
        this.output = ['en.json', 'es.json', 'fr.json', 'de.json'];
        this.outputDir = "locales";
        this.basePath = null;
        this.builtInParser = "wordpress";
        this.customParser = null;
        this.errorOnDuplicatedKeys = false;
        this.contextSeparator = "\u0004";
        this.basePath = path.resolve(path.join(".", relPath));
    }
    return Options;
})();
module.exports = Options;
