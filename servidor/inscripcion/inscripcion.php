<?php
  include '../conexion.php';	  
  conectarse();	  
  $contador=0;
  $sql=pg_query("select MAX (id_inscripcion) from inscripcion");
  while($row=pg_fetch_row($sql)){
    $contador=$row[0];
  }
  $contador++;
  $sql=pg_query("select id_inscripcion from inscripcion where id_periodo='$_POST[valorInscripcion]' and id_estudiante='$_POST[idEstudianteInscripcion]'");
  if(pg_num_rows($sql)){
    if($_POST['notaAptitud'] >= '6.5' && $_POST['notaConocimiento']>='6.5'){
      $temp=1;
    }
    else{
      $temp=0;
    }
    while($row=pg_fetch_row($sql)){
      $id=$row[0];
    }
    //echo "update inscripcion set id_inscripcion='$id',id_periodo='$_POST[valorInscripcion]',id_estudiante='$_POST[idEstudianteInscripcion]',id_escuela='$_POST[idEscuelaInscripcion]',documentos_completos='$_POST[docEntregadosInscrpcion]',prueba_aptitud='$_POST[notaAptitud]',fecha_aptitud='$_POST[fechaAptitud]',prueba_conocimiento='$_POST[notaConocimiento]',fecha_conocimiento='$_POST[fechaConocimiento]',estado_inscripcion='$temp',paralelo_inscripcion='$_POST[paraleloInscripcion]' where id_inscripcion='$id'";
    pg_query("update inscripcion set id_inscripcion='$id',id_periodo='$_POST[valorInscripcion]',id_estudiante='$_POST[idEstudianteInscripcion]',id_escuela='$_POST[idEscuelaInscripcion]',documentos_completos='$_POST[docEntregadosInscrpcion]',prueba_aptitud='$_POST[notaAptitud]',fecha_aptitud='$_POST[fechaAptitud]',prueba_conocimiento='$_POST[notaConocimiento]',fecha_conocimiento='$_POST[fechaConocimiento]',estado_inscripcion='$temp',paralelo_inscripcion='$_POST[paraleloInscripcion]' where id_inscripcion='$id'");
     
    pg_query("update estudiante set estado='$temp' where id_estudiante='$_POST[idEstudianteInscripcion]'");  
  }
  else{
    if($_POST['notaAptitud'] >= '6.5' && $_POST['notaConocimiento']>='6.5'){
      $temp=0;
    }
    else{
      $temp=1;
    }
    pg_query("insert into inscripcion values('$contador','$_POST[valorInscripcion]','$_POST[idEstudianteInscripcion]','$_POST[idEscuelaInscripcion]','$_POST[docEntregadosInscrpcion]','$_POST[notaAptitud]','$_POST[fechaAptitud]','$_POST[notaConocimiento]','$_POST[fechaConocimiento]','$temp','$_POST[paraleloInscripcion]')");
    pg_query("update estudiante set estado='$temp' where id_estudiante='$_POST[idEstudianteInscripcion]'");  
  }
   echo "{success: true}";
	pg_close();		
?>