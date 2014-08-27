<?php
  	include '../conexion.php';    
	conectarse();  
	$lista =  array();
	$sql=pg_query("select id_estudiante,apellidos_estudiante,nombres_estudiante,extranjero,foto,estado from estudiante where ci_estudiante='$_POST[id]' ");
    while($row=pg_fetch_row($sql))
    {
        $lista[]=$row[0];
        $lista[]=$row[1];
        $lista[]=$row[2];           
        $lista[]=$row[3];          
        $lista[]=$row[4];           
        $lista[]=$row[5];           
    }
    echo json_encode(array('success' => true, 'data' => $lista));   
   
	pg_close();   
?>