<?php

echo $t->_("hi"), " ", $name;
echo _("what"), " ", $name;
echo $t->_('del'), " ", $name;
echo $t->_('single\'scaped'), " ", $name;
echo _("double\"scaped"), " ", $name;
echo $t->_("single\'unscaped"), " ", $name;
echo _('double\"unescaped'), " ", $name;

echo ignored_("this must be ignored")