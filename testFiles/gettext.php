<?php


 _("msgid");//matched
echo $t->_("hi | this is the text");//matched
echo _("what");//matched
echo _("what2");//matched
echo $t->_('del');//matched
echo $t->_('single\'scaped');//matched
echo _("double\"scaped");//matched
echo $t->_("single\'unscaped");//matched
echo _('double\"unescaped');//matched

echo ignored_("this must be ignored");//not matched
echo dngettext ( $domain , "$msgi"+"d1" , 'string $msgid1' , $n); //not matched correctly
echo dngettext ( $domain , "$msgid1" , 'string $msgid3' , $n);  //matched
echo dngettext ( $domain ,
	"$msgid9" ,
	'string $msgid7' , $n);  //matched
echo dgettext("module2", "Labe2"); // this call will get the message from module2
echo dcngettext ( $domain , "there is one file" , "there are %d files", $n , $category )
echo ngettext("File", "Files", $number);