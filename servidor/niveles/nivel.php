<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from nivel order by id_nivel asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  if(isset($_POST['accion'])=='add'){
    $str = ucwords(strtolower($_POST['nomNivel']));
    $consulta=pg_query("select * from nivel where nivel='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }   
    if($error==0){
      pg_query("insert into nivel values ('$contador','$str','1')");
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este nivel ya existe ingrese otro.' }}";
    }    
  }
  if(isset($_POST['oper'])=='edit'){
    $str = ucwords(strtolower($_POST['nivel']));
    $consulta=pg_query("select * from nivel where nivel='$str' and id_nivel not in('$_POST[id_nivel]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("update nivel set nivel='$str' where id_nivel='$_POST[id_nivel]'");
      $error=0;
    }    
    echo $error;
  }


	pg_close();		
?>