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
  if($_POST['operIngresoUsuario']=='add'){    
    $str = ucwords($_POST['nomCompletosUsuario']);    
    $consulta=pg_query("select usuario from usuario where usuario='$_POST[nomUsuario]'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    if($error==0){
      pg_query("insert into usuario values('$contador','$str','$_POST[cedUsuario]','$_POST[emailUsuario]','$_POST[tipoUser]','$_POST[dirUsuario]','1','$_POST[nomCompletosUsuario]','$fecha')");
      pg_query("insert into claves values ('$contador1','$contador1','$_POST[cedUsuario]')");
      $error=0;      
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este nombre de usuario ya existe ingrese otro.' }}";
    }    
  }
  if($_POST['operIngresoUsuario']=='edit'){    
    $str = ucwords($_POST['nomCompletosUsuario']);        
    $consulta=pg_query("select * from usuario where usuario='$_POST[nomUsuario]' and id_usuario not in ('$_POST[idIngresoUsuario]');");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }        
    if($error==0){      
      pg_query("update usuario set nombres_usuario='$str',email_usuario='$_POST[emailUsuario]',direccion_usuario='$_POST[dirUsuario]',usuario='$_POST[nomUsuario]',acceso='$fecha',tipo_usuario='$_POST[tipoUser]' where id_usuario='$_POST[idIngresoUsuario]'");        
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