<!-- welcome -->
<!-- String: hi => 'Hello' -->
<p><?php echo $t->_("hi"), " ", $name; ?></p>
<p><?php echo _("what"), " ", $name; ?></p>
<p><?php echo $t->_('del'), " ", $name; ?></p>
<p><?php echo $t->_('single\'scaped'), " ", $name; ?></p>
<p><?php echo _("double\"scaped"), " ", $name; ?></p>
<p><?php echo $t->_("single\'unscaped"), " ", $name; ?></p>
<p><?php echo _('double\"unescaped'), " ", $name; ?></p>

{{ this is a text | translate}}
{{ this is other text | translate}}
{{ this is a text }}