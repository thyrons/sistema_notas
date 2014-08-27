<?php
  include '../conexion.php';	    
  conectarse();	  
  $cont=1;
  $sql=pg_query("select id_usuario from usuario where ci_usuario='$_POST[codigo]'");
  while($row=pg_fetch_row($sql)){
  	$cont=0;
  }
  echo $cont;
  pg_close();		
?>