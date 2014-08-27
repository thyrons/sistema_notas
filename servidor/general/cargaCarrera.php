<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_carrera,carrera FROM carrera ORDER BY id_carrera"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>