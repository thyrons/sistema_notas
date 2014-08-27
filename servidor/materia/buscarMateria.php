<?php
  include '../conexion.php';    
  conectarse();
  $data="";
  $callback = $_REQUEST['callback'];
  $sql=pg_query("select id_materia, nombre_materia,nro_creditos from materias where nombre_materia like '%$_GET[query]%';");
  while ($row = pg_fetch_row($sql)) {
    $data[] = array(
        'id' => $row[0],
        'id_materia' => $row[0],
        'nombre_materia' => $row[1],        
        'nombre_materia' => $row[1], 
        'nro_creditos' => $row[2], 
    );
}
if ($callback) {
  header('Content-Type: text/javascript');
  echo $callback . '(' . json_encode($data) . ');';
  } else {
    header('Content-Type: application/x-json');
    echo json_encode($data);
}
            
            
  pg_close();   
?>