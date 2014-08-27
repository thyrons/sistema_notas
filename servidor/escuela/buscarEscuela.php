<?php
  include '../conexion.php';    
  conectarse();
  $data="";
  $callback = $_REQUEST['callback'];
  $sql=pg_query("select id_escuela, nombre_escuela,carrera from escuela,carrera where escuela.id_carrera=carrera.id_carrera and nombre_escuela like '%$_GET[query]%';");
  while ($row = pg_fetch_row($sql)) {
    $data[] = array(
        'id' => $row[0],
        'id_escuela' => $row[0],
        'nombre_escuela' => $row[1],
        'carrera' => $row[2],
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