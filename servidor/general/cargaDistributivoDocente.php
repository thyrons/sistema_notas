<?php
  	include '../conexion.php';    
	conectarse();  
	$lista =  array();
	$sql=pg_query("select id_distributivo,id_periodo,id_docente,usuario.nombres_usuario from distributivo,usuario where id_periodo='$_POST[codigo]' and id_docente='$_POST[id]' and distributivo.id_docente=usuario.id_usuario");
    while($row=pg_fetch_row($sql)){
    	$sql1=pg_query("select materias.id_materia,materias.nombre_materia,materias.nro_creditos,nivel.id_nivel,nivel.nivel,escuela.id_escuela,escuela.nombre_escuela,seccion.id_seccion,seccion.nombre_seccion,modalidad.id_modalidad,modalidad.nombre_modalidad from distributivo_materias,nivel,seccion,modalidad,escuela,materias where distributivo_materias.id_nivel=nivel.id_nivel and distributivo_materias.id_seccion=seccion.id_seccion and distributivo_materias.id_escuela=escuela.id_escuela and distributivo_materias.id_modalidad=modalidad.id_modalidad and materias.id_materia=distributivo_materias.id_materia and id_distributivo='$row[0]'");
    	while($row1=pg_fetch_row($sql1))
    	{
    		$lista[]=$row1[0];
    		$lista[]=$row1[1];
    		$lista[]=$row1[2];
    		$lista[]=$row1[3];
    		$lista[]=$row1[4];
    		$lista[]=$row1[5];
    		$lista[]=$row1[6];
    		$lista[]=$row1[7];
    		$lista[]=$row1[8];
    		$lista[]=$row1[9];
    		$lista[]=$row1[10];
    		$lista[]=$row[2];
    		$lista[]=$row[3];
    	}
    }
    echo json_encode(array('success' => true, 'data' => $lista));
	pg_close();   
?>