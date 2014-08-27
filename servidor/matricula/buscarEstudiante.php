<?php
  include '../conexion.php';    
  conectarse();
  $data="";
  $callback = $_REQUEST['callback'];
  //echo "select id_estudiante, apellidos_estudiante,nombres_estudiante from estudiante where (nombres_estudiante like '%$_GET[query]%' or apellidos_estudiante like '%$_GET[query]%' or ci_estudiante like '%$_GET[query]%') ";
  $sql=pg_query("select id_estudiante, ci_estudiante,apellidos_estudiante,nombres_estudiante, foto, extranjero from estudiante where (nombres_estudiante like '%$_GET[query]%' or apellidos_estudiante like '%$_GET[query]%' or ci_estudiante like '%$_GET[query]%') and estado='1'");
  while ($row = pg_fetch_row($sql)) {
    $data[] = array(
        'id' => $row[0],
        'id_estudiante' => $row[0],
        'ci_estudiante' => $row[1],
        'apellidos_estudiante' => $row[2],
        'nombres_estudiante' => $row[3],
        'foto' => $row[4],
        'extranjeroEs' => $row[5],
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