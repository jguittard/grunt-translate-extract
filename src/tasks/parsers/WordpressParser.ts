/**
 * Created by Ma on 02/09/2014.
 */

import Parser = require("../Parser");
import TranslationEntry = require("../TranslationEntry");
import utils = require("./../Utils");


class WordpressParser implements Parser{


    //wp function = __( $single, $domain );
    private single:RegExp = /\W(?:__|_e|esc_attr__|esc_attr_e|esc_html__|esc_html_e)\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[a-zA-Z0-9 _]+)\s*\)/gm;

    //wp function = _n( $single, $plural, $number, $domain ). only first two parameters matched
    private plural:RegExp = /\W_n\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;


    //wp function = _x(  $text, $context, $domain ),only first two parameters matched
    private context:RegExp = /\W(?:_x|_ex|esc_attr_x|esc_html_x)\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*\)/gm;

    //wp function = _nx( $single, $plural, $number, $context, $domain ). domain not matched
    private pluralContext:RegExp = /\W_nx\s*\(\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,\s*(?:[0-9]+|\$[a-zA-Z0-9 _]+),\s*("(?:\\.|[^"])*"|'(?:\\.|[^'])*')\s*,/gm;


    getRegexpList():RegExp[] {
        return [this.single,this.plural,this.context,this.pluralContext];
    }

    parseMatch(match:RegExpExecArray, regExp:RegExp):TranslationEntry {
        var key=null,text=null,plural=null,context=null;
        if(this.single.source === regExp.source){
            key = utils.escapeLiteral(match[1]);
        }else if(this.plural.source === regExp.source){
            key = utils.escapeLiteral(match[1]);
            plural = utils.escapeLiteral(match[2]);
        }else if(this.context.source === regExp.source){
            key = utils.escapeLiteral(match[1]);
            context = utils.escapeLiteral(match[2]);
        }else if(this.pluralContext.source === regExp.source){
            plural = utils.escapeLiteral(match[2]);
            key = utils.escapeLiteral(match[1]);
            context = utils.escapeLiteral(match[3]);
        }
        if(key === null)
            throw "Unexpected regular expression match / "+match[0]+" /";
        return {msgid:key,msgstr:text,msgid_plural:plural,msgctxt:context,line:null};
    }
}


export = WordpressParser;