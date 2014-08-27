<?php
function conectarse() {
    if (!($conexion = pg_connect("host=localhost dbname=control_notas port=5432 user=postgres password=root"))) {			
        exit();
    } else {       
    }
    return $conexion;
}
conectarse();
?>
