<?php
  include '../conexion.php';    
  conectarse();   
  if(is_numeric($_POST['codigo']) and $_POST['codigo']!=""){
    $sql=pg_query("select nro_creditos from materias where id_materia='$_POST[codigo]'");
    while($row=pg_fetch_row($sql)){
      echo json_encode(array('success' => true, 'data' => $row[0]));
    }
  }
  pg_close();   
?>