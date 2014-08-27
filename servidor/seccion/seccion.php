<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from seccion order by id_seccion asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomSeccion']));
    $consulta=pg_query("select * from seccion where nombre_seccion='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into seccion values ('$contador','$str','1')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Esta sección ya existe ingrese otra.' }}";
    }    
  }
  if(isset($_POST['oper'])=='edit'){
    $str = ucwords(strtolower($_POST['nombre_seccion']));
    $consulta=pg_query("select * from seccion where nombre_seccion='$str' and id_seccion not in('$_POST[id_seccion]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update seccion set nombre_seccion='$str' where id_seccion='$_POST[id_seccion]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>