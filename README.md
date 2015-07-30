# grunt-translate-extract

`grunt-translate-extract` helps developers with the internationalization off their code. 
Searchs for translatable string in the source code and generate a json file for each language.


![code generation](https://raw.githubusercontent.com/M-jerez/grunt-translate-extract/master/docs/intro.png)


## Features
- **Wordpress:** support all [i10n](https://codex.wordpress.org/L10n) functions, including context and pluralization.
- **PHP gettext:** support pluralization but not context.
- **Angular Translate:** support only the translation filter [filters](http://angular-translate.github.io/docs/#/guide/04_using-translate-filter) ie: `<ANY>{{ TRANSLATION_ID | translate }}</ANY>`
- You can edit (translate) directly the generated files, modified values (translations) will be preserved after run the task multiple times.
- Parsers are regular expression based, that means the functionality is very limited. 
I know ideally it should be implemented with a grammar parser, maybe in a future.


## Getting Started
This plugin requires Grunt `~0.4.5`

```shell
npm install grunt-translate-extract --save-dev
```
Enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-translate-extract');
```



## Overview
In your project's Gruntfile, add a section named `translate_extract` to the data object passed into `grunt.initConfig()`.

```js
var path = require("path");

grunt.initConfig({
  translate_extract: {
    options: {
      output: [ 'en.json', 'es.json', 'fr.json', 'de.json'],
      outputDir: "./output",
      basePath: optional //Just in case the basePath is not the root of the project.
      builtInParser: "wordpress",
      customParser: null,
      errorOnDuplicatedKeys: true
    },
    files: {
      src: ["src/**/*.php"]
    }
  }
});
```

## Options

#### options.output
Type: `String Array`
Default value: `[ "en", "es" , "fr", "de"]`

Name of the generated files.  FileName = *basePath + outputDir + output[n]*;

#### options.outputDir
Type: `String`
Default value: `./output`

Directory where the locale files will be stored. `files.dest` is ignored by this task and can be omitted.


#### options.basePath
Type: `String`
Default value: `./output`

Optional parameter. Use just in case the basePath is not the root of the project.

#### options.errorOnDuplicatedKeys
Type: `bolean`
Default value: `true`

If `true` the system will throw and error if finds two translatable string with the same msgid, if `false`
the two string will be considered the same an treated as a single entry .

#### options.builtInParser
Type: `String`
Default value: `wordpress`

The parser used to match the translation strings.
List of built in parser
 . `gettextPHP` => matches php gettext functions like `_("text to translate")` or `$object->_("text to translate")`
 . `wordpress` => matches php wordpress functions like `__("text to translate")` or `_e("text to translate")`
 . `angularTranslate` => matches angular translate declarations using the translate filter like `{{ msgid | translate}}`

#### options.customParser
Type: `Object`
Default value: `null`

If there is no Built In Parser that match the language or template that you are using it is posible to define a custom
parser that matchs and extracts your translatable strings.
**DEPRECATION NOTICE:** *Custom Parsers may be removed in future versions.*...
In order to introduce support for plurals and context. The complexity of the parser has increased a lot to support 
plurals and content, so built custom parsers is not an easy task anymore, therefore it makes no sense to support 
custom parsers...
**AngularTranslate Parser Example:** *matchs <ANY>{{ TRANSLATION_ID | translate }}</ANY>*
```js
var utils = require("../Utils");
var AngularTranslateParser = (function () {
    function AngularTranslateParser() {
    }
    AngularTranslateParser.prototype.getRegexpList = function () {
        return [/\{\{\s*([a-zA-Z_]+[a-zA-Z0-9_]*)\s*\|\s*translate\s*\}\}/g];
    };
    AngularTranslateParser.prototype.parseMatch = function (match, regExp) {
        var text = utils.escapeLiteral(match[1]);
        if (text === false)
            text = match[1];
        return { msgid: text, msgstr: text, msgid_plural: null, msgctxt: null, line: null };
    };
    AngularTranslateParser._asd = "";
    return AngularTranslateParser;
})();
```



## Release History
0.0.3 Add support for plurals, context, improve documentation. **BREAKIN CHANGES INTRODUCED FROM PREVIOUS VERSION**
0.0.2 print number of files parsed and found translation entries. add a new `gettextPHP_KV` parser.
0.0.1 first beta released with support for php gettext , wordpress and angular-translate. no hard test yet.
