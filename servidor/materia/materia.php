<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  $contador1=0;
  conectarse();	  
  $consulta=pg_query("select * from materias order by id_materia asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;
  $consulta=pg_query("select * from materia_sec");
  while($row=pg_fetch_row($consulta)){
    $contador1=$row[0];
  }
  $contador1=$contador1+1;
  if($_POST['accion']=='add'){    
    $str = ucwords(strtolower($_POST['nomMateria']));
    $cod = strtoupper($_POST['codMateria']);
    $consulta=pg_query("select * from materias where nombre_materia='$str'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }
    $consulta=pg_query("select * from materias where cod_materia='$cod'");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=2;
    }   
    if($error==0){
      pg_query("insert into materias values ('$contador','$cod','$str','$_POST[nroCreditos]','$_POST[estadoSecuencia]','1','$_POST[idNivel]')");
      $error=0;
      if($_POST['estadoSecuencia']==1){
        pg_query("insert into materia_sec values('$contador1','$contador','$_POST[idMate]','1')");
      }
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Esta materia ya existe ingrese otra.' }}";
    }
    if($error==2){
        echo "{success: false, errors: { reason: 'Este código de materia ya existe ingrese otra.' }}";
    }    
  }
  if($_POST['accion']=='edit'){    
    $str = ucwords(strtolower($_POST['nomMateria']));
    $cod = strtoupper($_POST['codMateria']);

    $consulta=pg_query("select * from materias where cod_materia='$_POST[codMateria]' and id_materia not in ('$_POST[idMateria]');");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=1;
    }    
    $consulta=pg_query("select * from  materias where nombre_materia='$_POST[nomMateria]' and id_materia not in ('$_POST[idMateria]')");
    $cont=pg_num_rows($consulta);
    if($cont>0){
      $error=2;
    }
    if($error==0){
      $consulta=pg_query("select * from materia_sec where id_materia='$_POST[idMateria]'");
      while($row=pg_fetch_row($consulta)){
        pg_query("delete from materia_sec where id_materia_sec='$row[0]'");
      }
      pg_query("update materias set cod_materia='$_POST[codMateria]', nombre_materia='$_POST[nomMateria]',nro_creditos='$_POST[nroCreditos]', secuencia='$_POST[estadoSecuencia]',id_nivel='$_POST[idNivel]' where id_materia='$_POST[idMateria]'");  
      if($_POST['estadoSecuencia']==1){
        pg_query("insert into materia_sec values('$contador1','$_POST[idMateria]','$_POST[idMate]','1')");  
      }

      $error=0;
    }
    if($error==0){
        echo "{success: true}";
    }
    if($error==1){
        echo "{success: false, errors: { reason: 'Este código ya existe ingrese otro.' }}";
    }
    if($error==2){
        echo "{success: false, errors: { reason: 'Este nombre de materia ya existe ingrese otro.' }}";
    }   
  }


	pg_close();		
?>