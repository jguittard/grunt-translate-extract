/**
 * Created by Ma on 16/08/2014.
 */

import Parser = require("../Parser");
import TranslateEntry = require("./../TranslationEntry");
import utils = require("./../Utils");


class PHPGettextParser implements Parser{



    //php function = string gettext ( string $message )
    gettext:RegExp = /\W(?:_|gettext)\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*\)/gm;

    //php function = string ngettext ( string $msgid1 , string $msgid2 , int $n )
    ngettext:RegExp = /\Wngettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;

    //php function = string dgettext ( string $domain , string $message )
    dgettext:RegExp = /\Wdgettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*\)/gm;

    //php function = string dngettext ( string $domain , string $msgid1 , string $msgid2 , int $n )
    dngettext:RegExp = /\Wdngettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;


    //php function = string dcgettext ( string $domain , string $message , int $category )
    dcgettext:RegExp = /\Wdcgettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;

    //php function = string dcngettext ( string $domain , string $msgid1 , string $msgid2 , int $n , int $category )
    dcngettext:RegExp = /\Wdcngettext\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;


    /**
     * Returns the regular expression that delimits each TranslationEntry.
     * Note that it returns a array with one or more regexps.
     * @return RegExp[]
     */
    getRegexpList():RegExp[]{
        return [this.gettext,this.ngettext,this.dgettext,this.dngettext,this.dcgettext,this.dcngettext];
    }


    /**
     * Gets the raw text of one TranslationEntry and return its msgid and msgstr.
     * ie: gets "title : this is the title" and returns a new TranslationEntry{msgid:"title",msgstr:"this is the title"}.
     * @param filename current file name.
     * @param lineNum current line number.
     * @param msgstr the raw text of the translate entry.
     * @return TranslateEntry.
     */
    parseMatch(match:RegExpExecArray,regExp:RegExp):TranslateEntry{
        var key=null,text=null,plural=null,context=null;
        if(this.gettext.source === regExp.source){
            key = utils.escapeLiteral(match[1]);
        }else if(this.ngettext.source === regExp.source){
            key = utils.escapeLiteral(match[1]);
            plural = utils.escapeLiteral(match[2]);
        }else if(this.dgettext.source === regExp.source){
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }else if(this.dngettext.source === regExp.source){
            plural = utils.escapeLiteral(match[3]);
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }else if(this.dcgettext.source === regExp.source){
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }else if(this.dcngettext.source === regExp.source){
            plural = utils.escapeLiteral(match[3]);
            key = utils.escapeLiteral(match[2]);
            context = utils.escapeLiteral(match[1]);
        }
        if(key === null)
            throw "Unexpected regular expression match / "+match[0]+" /";
        return {msgid:key,msgstr:text,msgid_plural:plural,msgctxt:context,line:null};
    }
}

export = PHPGettextParser;