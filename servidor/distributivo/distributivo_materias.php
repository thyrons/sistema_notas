<?php
 	include '../conexion.php';	  
  	conectarse();	
	try{
	  	date_default_timezone_set('UTC');
	  	$fecha=date("Y-m-d");
	  	$nivel=$_POST['nivel'];
	    $modalidad=$_POST['modalidad'];
	    $seccion=$_POST['seccion']; 
	    $escuela=$_POST['escuela'];
	    $materia=$_POST['materia'];
	    $temp=0;
	    if($nivel{0}==","){
    		$nivel=substr($nivel, 1);
    	}  
    	if($modalidad{0}==","){
    		$modalidad=substr($modalidad, 1);
    	}  
    	if($seccion{0}==","){
    		$seccion=substr($seccion, 1);
    	}  
    	if($escuela{0}==","){
    		$escuela=substr($escuela, 1);
    	}  
    	if($materia{0}==","){
    		$materia=substr($materia, 1);
    	}  
	    $nivel = explode(",", $nivel);    
	    $modalidad = explode(",", $modalidad);   
	    $seccion = explode(",", $seccion);
	    $escuela = explode(",", $escuela);
	    $materia = explode(",", $materia);
	    if($_POST['estadoDistributivo']==0) {
	    	////////buscar si el docente ya tiene un distributivo previo activado
		    $sql=pg_query("select id_distributivo from distributivo where id_periodo='".$_POST['valor-inputEl']."' and id_docente='$_POST[idBuscarDocente]'");
			if(pg_num_rows($sql)){
				 throw new Exception('Error este docente ya tiene ingresado un distributivo.');
			}	  
			else{
				////guardar el distributivo
			    $contador=0;
			    $contador1=0;
			    $sql=pg_query("select id_distributivo from distributivo order by id_distributivo asc");
			    while($row=pg_fetch_row($sql)){
			    	$contador=$row[0];
			    }
			    $contador=$contador+1;
			    $sql=pg_query("select id_distributivo_materia from distributivo_materias order by id_distributivo asc");
			    while($row=pg_fetch_row($sql)){
			    	$contador1=$row[0];
			    }
			    $contador1=$contador1+1;
			    pg_query("insert into distributivo values ('$contador','".$_POST['valor-inputEl']."','$_POST[idBuscarDocente]','0')");
			    //////////////guardar materias con el distributio y su docente
			    $cont = count($nivel);
			    for($i=0;$i<$cont;$i++){
			    	$sql=pg_query("insert into distributivo_materias values ('$contador1','$nivel[$i]','$modalidad[$i]','$seccion[$i]','$escuela[$i]','$materia[$i]','$contador','0')");	
			    	$contador1++;
			    }	
			    echo "{success: true}";
			}
	    }else{
	    	$sql=pg_query("delete from distributivo_materias where id_distributivo='$_POST[id_distributivo]'");	
	    	$sql=pg_query("select id_distributivo_materia from distributivo_materias order by id_distributivo asc");
		    $contador1=0;
		    while($row=pg_fetch_row($sql)){
		    	$contador1=$row[0];
			}
			$contador1=$contador1+1;
			$cont = count($nivel);
			$sql=pg_query("select id_distributivo from distributivo where id_periodo='".$_POST['valor-inputEl']."' and id_docente='$_POST[idBuscarDocente]'");
			while($row=pg_fetch_row($sql)){
				$temp=$row[0];
			}
			for($i=0;$i<$cont;$i++){
		    	$sql=pg_query("insert into distributivo_materias values ('$contador1','$nivel[$i]','$modalidad[$i]','$seccion[$i]','$escuela[$i]','$materia[$i]','$temp','0')");	
		    	$contador1++;
		    }	
			echo "{success: true}";

	    }
	}
  	catch(Exception $e){
       	echo '{success: false, errors: { reason: "Ocurrio un error al momento de guardar: '.$e->getMessage().'"  }}';
 	}
  	
  	pg_close();		
?>