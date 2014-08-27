<?php
  include '../conexion.php';    
  $cont=0;
  $error=0;
  $contador=0;  
  $contador1=0;  
  conectarse();  
  date_default_timezone_set('UTC');
  $fecha=date("Y-m-d");
  $consulta=pg_query("select * from usuario order by id_usuario asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  $consulta=pg_query("select * from claves order by id_clave asc");
  while($row=pg_fetch_row($consulta)){
    $contador1=$row[0];
  }
  $contador1=$contador1+1;
  if($_POST['operIngresoDocente']=='add'){    
    $str = ucwords($_POST['nomDocentes']);    
    $consulta=pg_query("select usuario from usuario where usuario='$_POST[nomUsuarioDocente]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("insert into usuario values('$contador','$str','$_POST[cedDocente]','$_POST[emailDocente]','$_POST[tipoUserDocente]','$_POST[dirDocente]','1','$_POST[nomUsuarioDocente]','$fecha')");
      pg_query("insert into claves values ('$contador1','$contador1','$_POST[cedDocente]')");
      $error=0;      
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este nombre de usuario ya existe ingrese otro.' }}";
    }    
  }
  if($_POST['operIngresoDocente']=='edit'){    
    $str = ucwords($_POST['nomDocentes']);        
    $consulta=pg_query("select * from usuario where usuario='$_POST[nomUsuarioDocente]' and id_usuario not in ('$_POST[idIngresoDocente]');");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    
    if($error==0){      
      pg_query("update usuario set nombres_usuario='$str',email_usuario='$_POST[emailDocente]',direccion_usuario='$_POST[dirDocente]',usuario='$_POST[nomUsuarioDocente]',acceso='$fecha' where id_usuario='$_POST[idIngresoDocente]'");        
      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este usuario ya existe ingrese otro.' }}";
    }    
  }


  pg_close();   
?>