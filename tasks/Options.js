var Options = (function () {
    function Options() {
        this.locales = ["en", "es"];
        this.outputDir = "./locales";
        this.builtInParser = "gettextPHP";
        this.customParser = null;
        this.sourcesDir = null;
    }
    return Options;
})();

module.exports = Options;
//# sourceMappingURL=Options.js.map
