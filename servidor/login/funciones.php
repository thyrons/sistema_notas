<?php
  include '../conexion.php';	
  $data=0;
  conectarse();
	session_start();
  date_default_timezone_set('UTC');	
  $fecha=date("Y-m-d");
	function usuario(){
    return $_SESSION["usuario"];
  }
 
	pg_close();		

?>