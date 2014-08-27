<?php
  include '../conexion.php';    
  conectarse();
  $data="";
  $callback = $_REQUEST['callback'];
  $sql=pg_query("select * from usuario where nombres_usuario like '%$_GET[query]%' or ci_usuario like '%$_GET[query]%'");
  while ($row = pg_fetch_row($sql)) {
    $data[] = array(
        'id' => $row[0],
        'id_usuario' => $row[0],
        'nombres_usuario' => $row[1],
        'ci_usuario' => $row[2],
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