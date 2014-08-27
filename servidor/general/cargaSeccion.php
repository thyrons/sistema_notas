<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_seccion,nombre_seccion FROM seccion ORDER BY id_seccion"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>