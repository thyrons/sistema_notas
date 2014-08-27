<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_modalidad,nombre_modalidad FROM modalidad ORDER BY id_modalidad"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>