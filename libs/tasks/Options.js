var path = require("path");
var Options = (function () {
    function Options(relPath) {
        if (relPath === void 0) { relPath = ""; }
        this.output = ['en.json', 'es.json', 'fr.json', 'de.json'];
        this.outputDir = "locales";
        this.basePath = null;
        this.builtInParser = "gettextPHP";
        this.customParser = null;
        this.errorOnDuplicatedKeys = false;
        this.basePath = path.resolve(path.join(".", relPath));
    }
    return Options;
})();
module.exports = Options;
