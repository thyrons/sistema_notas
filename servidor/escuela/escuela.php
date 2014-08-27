<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from escuela order by id_escuela asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if($_POST['accion']=='add'){    
    $str = ucwords(strtolower($_POST['nomEscuela']));
    $consulta=pg_query("select * from escuela where nombre_escuela='$str' and id_carrera='$_POST[idCarrera]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into escuela values ('$contador','$str','$_POST[idCarrera]','1')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Esta escuela ya existe ingrese otra.' }}";
    }    
  }
  if($_POST['accion']=='edit'){
    
    $str = ucwords(strtolower($_POST['nomEscuela']));
    $consulta=pg_query("select * from escuela where nombre_escuela='$str' and id_carrera='$_POST[idCarrera]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      echo "{success: false, errors: { reason: 'Esta escuela ya existe ingrese otra.' }}";
    }    
    else{
      pg_query("update escuela set nombre_escuela='$str',id_carrera='$_POST[idCarrera]' where id_escuela='$_POST[idEscuela]'");
      echo "{success: true}";
    }        
  }


	pg_close();		
?>