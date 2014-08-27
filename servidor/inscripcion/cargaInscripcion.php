<?php
  	include '../conexion.php';    
	conectarse();  
	$lista =  array();
	$sql=pg_query("select estudiante.id_estudiante,id_periodo,escuela.id_escuela,escuela.nombre_escuela,paralelo_inscripcion,documentos_completos,prueba_aptitud,fecha_aptitud, prueba_conocimiento,fecha_conocimiento,estado_inscripcion from inscripcion,estudiante,escuela where inscripcion.id_escuela=escuela.id_escuela and inscripcion.id_estudiante=estudiante.id_estudiante and id_periodo='$_POST[periodo]' and estudiante.id_estudiante='$_POST[id]'");
    while($row=pg_fetch_row($sql))
    {
        $lista[]=$row[0];
        $lista[]=$row[1];
        $lista[]=$row[2];           
        $lista[]=$row[3];          
        $lista[]=$row[4];
        $lista[]=$row[5];
        $lista[]=$row[6];           
        $lista[]=$row[7];
        $lista[]=$row[8];
        $lista[]=$row[9];
        $lista[]=$row[10];
    }
    echo json_encode(array('success' => true, 'data' => $lista));   
   
	pg_close();   
?>