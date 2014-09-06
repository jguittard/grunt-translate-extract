# grunt-translate-extract

> extracts translatable strings from source files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-translate-extract --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

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
      locales: [ "en", "es", "en_US" , ... ],
      outputDir: "./locales",
      builtInParser: "gettextPHP",
      customParser: null,
      errorOnDuplicatedKeys: true
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.locales
Type: `String Array`
Default value: `[ "en", "es" , "fr", "de"]`

An Array of the languages or 'locales' to use .

#### options.outputDir
Type: `String`
Default value: `./locales`

Directory where the locale files will be stored. `files.dest` is ignored by this task and can be omitted.

#### options.errorOnDuplicatedKeys
Type: `bolean`
Default value: `true`

If `true` the system will throw and error if finds two translatable string with the same key, if `false`
the two string will be considered the same an treated as a single entry .

#### options.builtInParser
Type: `String`
Default value: `gettextPHP`

The parser used to match the translation strings.
List of built in parser
 1. `gettextPHP` => matches php gettext functions like `_("text to translate")` or `$object->_("text to translate")`
 2. `wordpress` => matches php wordpress functions like `__("text to translate")` or `_e("text to translate")`
 3. `angularTranslate` => matches angular translate declarations using the translate filter like `{{ key | translate}}`

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
interface TranslateEntryParser{

    /**
     * Returns a list of regular expression that delimits each TranslationEntry.
     * @return RegExp[] ie:[/\[\[.+\]\]/g, /\{\{(.+?)\}\}/g]
     */
    getRegexpList():RegExp[];


    /**
     * Gets the raw text of one TranslationEntry and return its key and text.
     * ie: gets "title : this is the title" and returns a new TranslationEntry{key:"title",text:"this is the title"}.
     * @param filename current file name.
     * @param lineNum current line number.
     * @param text the raw text of the translate entry.
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
      locales: [ "en", "es" , "fr", "de"],
      outputDir: "./locales",
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
      locales: [ "en", "es"],
      outputDir: "./locales",
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
