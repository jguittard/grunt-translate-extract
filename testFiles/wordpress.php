<?php
$translated = __( 'Hello World!', 'mytextdomain' );
_e( 'Some text to translate and display.', 'textdomain' );
$text = sprintf( _n( '%s star', '%s stars', $rating, 'your_textdomain' ), $rating );
$translated = _x( 'Read', 'past participle: books I have read' );

_ex( 'Read', 'past participle: books I have read' );
_nx( "one file", "%d files" , $number, "a file in a computer system", $domain )