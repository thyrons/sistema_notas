<?php
//session_start();
 //if(empty($_SESSION['id'])) {      
  //      header('Location: ../index.html');
   // }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Sistema de Notas Uniandes "Ibarra"</title>
    <link href="../img/logosUniandes/logo.jpg" type="image/x-icon" rel="shortcut icon" />
    <link rel="stylesheet" type="text/css" href="../css/desktop.css" />
    <!--<link rel="stylesheet" type="text/css" href="../css/estilos.css" />-->
    <link rel="stylesheet" type="text/css" href="../librerias/jQgrid/css/ui.jqgrid.css" />
    <link rel="stylesheet" type="text/css" href="../librerias/jQuery/css/cupertino/jquery-ui-1.9.2.custom.css" />
    <!--<link rel="stylesheet" type="text/css" href="../librerias/jQuery/css/blitzer/jquery-ui-1.10.4.custom.css" />-->

    <!-- GC -->

    <!-- <x-compile> -->
    <!-- <x-bootstrap> -->
    <script type="text/javascript" src="../librerias/extjs/shared/include-ext.js"></script>
    <script type="text/javascript" src="../librerias/extjs/shared/options-toolbar.js"></script>
    <script type="text/javascript" src="../librerias/extjs/ext-lang-es.js"></script>
    <script type="text/javascript" src="../librerias/jsNotas/funciones/funcion.js"></script>
    <script type="text/javascript" src="../librerias/jQuery/js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../librerias/jQgrid/js/jquery.jqGrid.src.js"></script>
    <script type="text/javascript" src="../librerias/jQgrid/js/i18n/grid.locale-es.js"></script>
    <script type="text/javascript" src="../librerias/jQuery/js/jquery-ui-1.10.3.custom.js"></script>    
    <!-- </x-bootstrap> -->
    <script type="text/javascript">
        Ext.Loader.setPath({
            'Ext.ux.desktop': '../librerias/jsNotas/escritorio/js/',
             MyDesktop: '../librerias/jsNotas/escritorio/',
             uxLib: '../librerias/extjs/ux',
             extValidacion: '../librerias/jsNotas/funciones/',
        });

        Ext.require('MyDesktop.App');

        var myDesktopApp;
        Ext.onReady(function () {
            myDesktopApp = new MyDesktop.App();
        });
    </script>
    <!-- </x-compile> -->
</head>

<body>

   
</body>
</html>
