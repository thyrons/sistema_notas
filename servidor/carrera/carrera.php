<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from carrera order by id_materia asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomCarrera']));
    $consulta=pg_query("select * from carrera where carrera='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into carrera values ('$contador','$str','1')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Esta carrera ya existe ingrese otra.' }}";
    }    
  }
  if(isset($_POST['oper'])=='edit'){
    $str = ucwords(strtolower($_POST['carrera']));
    $consulta=pg_query("select * from carrera where carrera='$str' and id_carrera not in('$_POST[id_carrera]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update carrera set carrera='$str' where id_carrera='$_POST[id_carrera]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>