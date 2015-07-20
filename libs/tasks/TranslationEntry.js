var TranslationEntry = (function () {
    function TranslationEntry(key, text, plural, context) {
        this.msgid = key;
        this.msgstr = text;
        this.msgid_plural = plural;
        this.msgctxt = context;
    }
    return TranslationEntry;
})();
module.exports = TranslationEntry;
