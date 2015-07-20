<?php


 _("msgid");
echo $t->_("hi | this is the text");
echo _("what");
echo _("what2");
echo $t->_('del');
echo $t->_('single\'scaped');
echo _("double\"scaped");
echo $t->_("single\'unscaped");
echo _('double\"unescaped');

echo ignored_("this must be ignored");//not matched
dngettext ( $domain , "$msgi"+"d1" , 'string $msgid1' , $n); //not matched correctly
dngettext ( $domain , "$msgid1" , 'string $msgid3' , $n);  //matched
dngettext ( $domain ,
	"$msgid9" ,
	'string $msgid7' , $n);  //matched


$cell =_("dsdd");


// Set language to German
putenv('LC_ALL=de_DE');
setlocale(LC_ALL, 'de_DE');

// Specify location of translation tables
bindtextdomain("myPHPApp", "./locale");

// Choose domain
textdomain("myPHPApp");

// Translation is looking for in ./locale/de_DE/LC_MESSAGES/myPHPApp.mo now

// Print a test message
echo gettext("gfghg");

// Or use the alias _() for gettext()
echo _("Have a nice day");


echo gettext("Label1"); // this call will get the message from module1
echo dgettext("module2", "Labe2"); // this call will get the message from module2


echo ngettext("File", "Files", $number);