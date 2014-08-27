<?php
  include '../conexion.php';	  
  $cont=0;
  $error=0;
  $contador=0;
  conectarse();	  
  $consulta=pg_query("select * from periodo order by id_periodo asc");
  while($row=pg_fetch_row($consulta)){
    $contador=$row[0];
  }
  $contador=$contador+1;  
  if($_POST['operIngresoPeriodos']=='add'){            
    pg_query("update periodo set estado='0'");
    pg_query("insert into periodo values ('$contador','$_POST[periodoMatriculaInicio]','$_POST[periodoMatriculaFin]','$_POST[periodoInscripcionInicio]','$_POST[periodoInscripcionFin]','$_POST[periodoInicio]','$_POST[periodoFin]','1')");
    $error=0;

    if($error==0){
        echo "{success: true}";
    }        
  }
  if($_POST['operIngresoPeriodos']=='edit'){        
    pg_query("update periodo set matriculas_inicio='$_POST[periodoMatriculaInicio]',matriculas_fin='$_POST[periodoMatriculaFin]',inscripcion_inicio='$_POST[periodoInscripcionInicio]',inscripcion_fin='$_POST[periodoInscripcionFin]',periodo_inicio='$_POST[periodoInicio]',periodo_fin='$_POST[periodoFin]' where id_periodo='$_POST[idIngresoPeriodos]'");        
      $error=0;    
    if($error==0){
        echo "{success: true}";
    }        
  }
	pg_close();		
?>