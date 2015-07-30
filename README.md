# grunt-translate-extract

`grunt-translate-extract` helps developers with the internationalization off their code. 
Searchs for translatable string in the source code and generate a json file for each language.





## Getting Started
This plugin requires Grunt `~0.4.5`

```shell
npm install grunt-translate-extract --save-dev
```
Enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-translate-extract');
```

## The "translate_extract" task



### Overview
In your project's Gruntfile, add a section named `translate_extract` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  translate_extract: {
    options: {
      output: [ "en", "es" , "fr", "de"],
      outputDir: "./output",
      builtInParser: "gettextPHP",
      customParser: null,
      errorOnDuplicatedKeys: true
    },
    files: {
      src: ["src/**/*.php"]
    }
  }
});
```

### Options

#### options.output
Type: `String Array`
Default value: `[ "en", "es" , "fr", "de"]`

An Array of the languages or 'output' to use .

#### options.outputDir
Type: `String`
Default value: `./output`

Directory where the locale files will be stored. `files.dest` is ignored by this task and can be omitted.

#### options.errorOnDuplicatedKeys
Type: `bolean`
Default value: `true`

If `true` the system will throw and error if finds two translatable string with the same msgid, if `false`
the two string will be considered the same an treated as a single entry .

#### options.builtInParser
Type: `String`
Default value: `gettextPHP`

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
`options.customParser` must be an object and implement the methods `getRegexpList()` and `parseMatch()` methods, see the
interface declaration written in typescript.

```ts
/**
 * Implements this interface to create a parser to match and extract translatable string.
 */
interface Parser{

    /**
     * Returns a list of regular expression that delimits each TranslationEntry.
     * @return RegExp[] ie:[/\[\[.+\]\]/g, /\{\{(.+?)\}\}/g]
     */
    getRegexpList():RegExp[];


    /**
     * Gets the raw text of one TranslationEntry and return its msgid and msgstr.
     * ie: gets "title : this is the title" and returns a new TranslationEntry{msgid:"title",msgstr:"this is the title"}.
     * @param filename current file name.
     * @param lineNum current line number.
     * @param msgstr the raw msgstr of the translate entry.
     * @return TranslationEntry.
     */
    parseMatch(match:RegExpExecArray):TranslateEntry;


}
```


### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  translate_extract: {
    options: {
      output: [ "en", "es" , "fr", "de"],
      outputDir: "./output",
      builtInParser: "gettextPHP",
      customParser: null,
      errorOnDuplicatedKeys: true
    },
    files: {
      src: ["src/**/*.php"]
    }
  }
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  translate_extract: {
    options: {
      output: [ "en", "es"],
      outputDir: "./output",
      builtInParser: "angularTranslate",
      errorOnDuplicatedKeys: false
    },
    files: {
      src: ["src/**/*.js"]
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.1 print number of files parsed and found translation entries. add a new `gettextPHP_KV` parser.
0.0.1 first beta released with support for php gettext , wordpress and angular-translate. no hard test yet.
