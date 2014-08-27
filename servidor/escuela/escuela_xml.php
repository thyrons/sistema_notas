<?php
include '../conexion.php';
conectarse();
$page = $_GET['page']; 
$limit = $_GET['rows']; 
$sidx = $_GET['sidx']; 
$sord = $_GET['sord']; 
$search=$_GET['_search'];
if (!$sidx)
    $sidx = 1;
$result = pg_query("SELECT COUNT(*) AS count from carrera,escuela where carrera.id_carrera=escuela.id_carrera"); 
$row = pg_fetch_row($result);
$count = $row[0];
if ($count > 0 && $limit > 0) {
    $total_pages = ceil($count / $limit);
} else {
    $total_pages = 0;
}
if ($page > $total_pages)
    $page = $total_pages;
$start = $limit * $page - $limit;
if ($start < 0)
    $start = 0; 
    if($search=='false'){
        $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera ORDER BY $sidx $sord offset $start limit $limit";     
    }
    else{
        $str = ucwords(strtolower($_GET['searchString']));
        if($_GET['searchOper']=='eq'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] = '$str' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='ne'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] != '$str' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='bw'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] like '$str%' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='bn'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] not like '$str%' ORDER BY $sidx $sord offset $start limit $limit";      
        }
         if($_GET['searchOper']=='ew'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='en'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] not like '%$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='cn'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='nc'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='in'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField]  like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        if($_GET['searchOper']=='ni'){
            $SQL = "SELECT escuela.id_escuela,nombre_escuela,carrera.id_carrera,carrera.carrera,escuela.estado from carrera,escuela where carrera.id_carrera=escuela.id_carrera and $_GET[searchField] not like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";      
        }
        //echo $SQL;
    }
    
    $result = pg_query($SQL);           
    header("Content-type: text/xml;charset=utf-8");
    $s = "<?xml version='1.0' encoding='utf-8'?>";  
    $s .= "<rows>";
    $s .= "<page>" . $page . "</page>";
    $s .= "<total>" . $total_pages . "</total>";
    $s .= "<records>" . $count . "</records>";
    while ($row = pg_fetch_row($result)) {      
        $s .= "<row id='" . $row[0] . "'>"; 
        $s .= "<cell>" . $row[0]. "</cell>";                        
        $s .= "<cell>" . $row[1] . "</cell>";  
        $s .= "<cell>" . $row[2] . "</cell>";       
        $s .= "<cell>" . $row[3] . "</cell>";  
         if($row[4]==1){
            $s .= "<cell>" . "Activo" . "</cell>";       
        }
        else{
            $s .= "<cell>" . "Pasivo" . "</cell>";       
        }                        
        $s .= "</row>";
    }
    $s .= "</rows>";
    echo $s;
?>