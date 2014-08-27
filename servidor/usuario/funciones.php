<?php

include '../general/general.php';
$funcion = "";
if (isset($_REQUEST['funcion'])) {
    $funcion = $_REQUEST['funcion'];
}
switch ($funcion) {   
    case 1:
        echo nombreCompleto();
        break;
    
    }
?>
