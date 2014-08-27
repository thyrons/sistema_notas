<?php
	include '../conexion.php';	    
  	conectarse();	  
  	$cont=0;
  	$sql=pg_query("select * from periodo where id_periodo='$_POST[periodoAcademico]' and estado='1'");
  	if(pg_num_rows($sql)>0){
		echo "{success: true}";
  	}
  	else{
  		echo "{success: false, errors: { reason: 'Este período académico ya finalizado y no podrá guardar nuevos registros' }}";
  	}
  	pg_close();		
?>