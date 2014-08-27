<?php
  include '../conexion.php';      
  $cont=0;
  $error=0;
  $t=0;
  conectarse();
  if($_POST['extranjero']=='true'){
    $t=1;
  }
  else{
    $t=0;
  }
  $sql=pg_query("select id_estudiante from estudiante where ci_estudiante='$_POST[cedula]' and extranjero='$t' ");
  if(pg_num_rows($sql)>0){
    $cont=1;
  }else{
    $cont=0;
  }
  echo $cont;
  pg_close();       
?>