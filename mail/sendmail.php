<?php
	$message = "<strong>AYUDA Y SOPORTE: </strong><br><br>";
	//$message = "<img src='images/page2_img.jpg'>";
	$message .= "<strong>Nombre: </strong>".$_POST["nombre"]."<br>";
	$message .= "<strong>Email: </strong>".$_POST["correo"]."<br>";
	$message .= "<br><strong>Mensaje:</strong><br>".$_POST["mensaje"]."<br>";

	$to = "contacto@centroinice.com";

	$subject = $_POST["asunto"];

	// Para enviar un correo HTML, debe establecerse la cabecera Content-type
	$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
	$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$retval = mail( $to, $subject, $message , $cabeceras );

	if( $retval == true ) {
		echo "Message sent succesfully....".$mensaje.'holis';
	} else {
		dd( "Message could not be sent...." );
	}
?>