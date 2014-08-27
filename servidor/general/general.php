<?php
session_start();
//include '../conexion.php';
 //   conectarse();    

function nombreCompleto() {
                
   $nombreCompleto=$_SESSION["nombres_usuario"];
	return $nombreCompleto;
}





?>
