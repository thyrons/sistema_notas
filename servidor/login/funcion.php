<?php
include 'funciones.php';
$funcion = "";
if (isset($_REQUEST['funcion'])) {
    $funcion = $_REQUEST['funcion'];
}
switch ($funcion) {
    case 1:
        echo usuario();
        break;    
}
?>
