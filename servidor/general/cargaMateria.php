<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("SELECT id_materia,nombre_materia FROM materias ORDER BY id_materia"); 
  $data = array();
  while($row = pg_fetch_array($sql, null, PGSQL_ASSOC)){
    $data [] = $row;
  } 
  echo json_encode($data);
  pg_close();		
?>