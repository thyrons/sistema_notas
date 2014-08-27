<?php
  include '../conexion.php';	    
  conectarse();	  
  $sql = pg_query("select id_periodo, periodo_inicio,periodo_fin from periodo order by id_periodo desc"); 
  $data = array();
  while ($row = pg_fetch_row($sql)) {
    $data[] = array(
        'id_per' => $row[0],
        'fecha_per' => ' Desde '.$row[1].' Hasta '.$row[2],       
    	);
	}
  echo json_encode($data);
  pg_close();		
?>