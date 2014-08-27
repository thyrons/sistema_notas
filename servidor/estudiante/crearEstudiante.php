<?php
	include '../conexion.php';    
  	conectarse();
  	$lista =  array();
	$allowedExts = array(
	    "gif",
	    "jpeg",
	    "jpg",
	    "png"
	);
	$temp        = explode(".", $_FILES["foto_estudiante"]["name"]);
	$extension   = end($temp);
	///
	$contador=0;
	$sql=pg_query("select MAX (id_estudiante) from estudiante;");
	while($row=pg_fetch_row($sql)){
		$contador=$row[0];
	}
	$contador++;
	$foto=$contador.'.'.$extension;
	//echo "insert into estudiante values ('$contador','$_POST[apellidosEstudianteCrear]','$_POST[nombresEstudianteCrear]','$_POST[direccionEstudianteCrear]','$_POST[nacimientoEstudianteCrear]','$_POST[edadEstudianteCrear]','$_POST[sexoEstudianteCrear]','0','$_POST[extranjeroCrear]','$_POST[ciEstudianteCrear]','$foto','$_POST[telelfonoEstudianteCrear]','$_POST[celularEstudianteCrear]')";
	pg_query("insert into estudiante values ('$contador','$_POST[apellidosEstudianteCrear]','$_POST[nombresEstudianteCrear]','$_POST[direccionEstudianteCrear]','$_POST[nacimientoEstudianteCrear]','$_POST[edadEstudianteCrear]','$_POST[sexoEstudianteCrear]','0','$_POST[extranjeroCrear]','$_POST[ciEstudianteCrear]','$foto','$_POST[telelfonoEstudianteCrear]','$_POST[celularEstudianteCrear]')");
	move_uploaded_file($_FILES["foto_estudiante"]["tmp_name"], "../../fotos/" . $foto);
	$lista[]=$contador;
	$lista[]=$_POST['apellidosEstudianteCrear'];
	$lista[]=$_POST['nombresEstudianteCrear'];
	$lista[]=$foto;
	$lista[]=$_POST['extranjeroCrear'];

	echo json_encode(array('success' => true, 'data' => $lista));
	pg_close();   
?>