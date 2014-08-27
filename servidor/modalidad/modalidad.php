<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from modalidad order by id_modalidad asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomModalidad']));
    $consulta=pg_query("select * from modalidad where nombre_modalidad='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into modalidad values ('$contador','$str','1')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este nombre ya existe ingrese otro.' }}";
    }    
  }
  if(isset($_POST['oper'])=='edit'){
    $str = ucwords(strtolower($_POST['nombre_modalidad']));
    $consulta=pg_query("select * from modalidad where nombre_modalidad='$str' and id_modalidad not in('$_POST[id_modalidad]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update modalidad set nombre_modalidad='$str' where id_modalidad='$_POST[id_modalidad]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>