<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_nivel,nivel FROM nivel ORDER BY id_nivel"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>