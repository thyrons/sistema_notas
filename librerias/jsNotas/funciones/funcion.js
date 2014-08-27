function EventChange(e){    
    var files = itemFile.files;
    console.log(files);
    var reader = new FileReader(); 
    reader.onload = function (e) {
        Ext.getCmp('box_content').getEl().dom.src = e.target.result;

    }
    reader.readAsDataURL(files[0]);
}
function nombreCompleto() {
    var nombreCompleto = '';
    jQuery.ajax({
        async: false,
        type: "POST",
        url: "../servidor/usuario/funciones.php",
        data: "tryLog=true&funcion=1",
        cache: false,
        success: function(ex) {
            nombreCompleto = ex;
            //jQuery('#txtTipoUsuario').attr("placeholder", ex);
        }
    });
    return nombreCompleto;
}
function cedula(valor){
    var ci = valor;
    var resp=0;
    var pares = 0;
    var impares = 0;
    var cont = 0;
    var total = 0;
    var residuo = 0;
    if(valor!='2222222222'){
        if(valor.substr(0,2)>0 && valor.substr(0,2)<=26){
            for (var i = 0; i < 9; i++) {
                if (i % 2 == 0) {
                    if (parseInt(ci.charAt(i)) * 2 > 9) {
                        cont = (parseInt(ci.charAt(i)) * 2) - 9;
                    }
                    else {
                        cont = (parseInt(ci.charAt(i)) * 2);
                    }
                    impares = impares + cont;
                }
                else {
                    pares = pares + parseInt(ci.charAt(i));
                }
            }
            total = pares + impares;
            if (total % 10 == 0) {
            }
            else {
                residuo = total % 10;
                residuo = 10 - residuo;
                if (parseInt(ci.charAt(9)) == residuo) {
                    resp=0;
                }
                else {
                    resp=1;
                }
            }
        }
        else{
            resp=2;
        }
    }
    else{
        resp=2;
    }
    return resp;
}
function fechaActual(){
    var fecha=new Date();
    return fecha;
}
function horaActual(){ 
  
    var cad="";
    var hora=new Date();
    var hours=hora.getHours();
    var minutes=hora.getMinutes();
    var seconds=hora.getSeconds();
    var dn="AM";
    if (hours>11){
        dn="PM";
        hours=hours-12;
    }    
    if (hours==0)
        hours=12;
    if (minutes<=9)
        minutes="0"+minutes;
    if (seconds<=9)
        seconds="0"+seconds;
    cad= hours+':'+minutes+':'+seconds+' '+dn;
    jQuery("input[name=horaC]").val(cad);    
    setTimeout("horaActual(" + hours + "," + minutes + "," + seconds + "," + "'" + dn + "'" + ",'hora')", 1000);
    
}
function calcular_edad(dia_nacim,mes_nacim,anio_nacim)
{
    fecha_hoy = new Date();
    ahora_anio = fecha_hoy.getYear();
    ahora_mes = fecha_hoy.getMonth();
    ahora_dia = fecha_hoy.getDate();
    edad = (ahora_anio + 1900) - anio_nacim;
    if ( ahora_mes < (mes_nacim - 1))
    {
      edad--;
    }
    if (((mes_nacim - 1) == ahora_mes) && (ahora_dia < dia_nacim))
    { 
      edad--;
    }
    if (edad > 1900)
    {
    edad -= 1900;
    }
  return edad;
}
function completarCeros(valor){    
    var temp="";
    for(var i=valor.length;i<9;i++){
        temp=temp+"0";
    }
    return temp;
    
}
function repetidos(nivel,materia,seccion,modalidad,escuela,tabla){
    var repe=0;
    var cont=0; 
    $('#'+tabla+' tbody tr').each(function (index) {  
        $(this).children("td").each(function (index) {
            switch (index) {                                            
                case 0:
                    if($(this).text()==materia){                     
                        cont++;
                    }                   
                break; 
                case 3:
                    if($(this).text()==nivel){                     
                        cont++;
                    }                   
                break;
                case 5:
                    if($(this).text()==escuela){                     
                        cont++;
                    }                   
                break;      
                case 7:
                    if($(this).text()==seccion){                     
                        cont++;
                    }                   
                break;
                case 9:
                    if($(this).text()==modalidad){                     
                        cont++;
                    }                   
                break;  
            }                                          
        });
        if(cont==5){
            repe=1
            cont=0;
        }
        else{
            cont=0;
            repe=0;
        }      
    }); 
    return repe;
}
function num_registros(tabla){
    var repe=0;
    cont=0; 
    $('#'+tabla+' tbody tr').each(function (index) {                                                                 
        $(this).children("td").each(function (index) {                               
            switch (index) {                                            
                case 1:                
                    repe++;                  
                break;                                                                                                                          
            }                                          
        });
    cont++;                
    }); 
    return repe;
}
function fn_dar_eliminar(e){
    $(".elimina").click(function(){
         var parent = $(this).parents().get(0);
        $(parent).remove();  
    });
}
function datos_tabla(tabla, caso){
    var vector = new Array();          
    var cont=0; 
    $('#'+tabla+' tbody tr').each(function (index) {    
        $(this).children("td").each(function (index) {                               
            switch (index) {                                            
                case caso:
                    vector[cont] = $(this).text();                                       
                break;                                                                                                                              
            }                                          
        });
        cont++;                
    });
    return vector;
}
function limpiar_datos(){

    Ext.getCmp("idDocente").setValue("");
    Ext.getCmp("idEscuela").setValue("");
    Ext.getCmp("idNivel").setValue("");
    Ext.getCmp("idMateria").setValue("");
    Ext.getCmp("nroCreditos").setValue("");
    $("#tablaDistributivoDocente tbody tr").remove();
    Ext.getCmp('bntGuardarDistributivo').setText("Guardar");
    Ext.getCmp('estadoDistributivo').setValue('0');
    Ext.getCmp('idDocente').setReadOnly(false); 
}
function limpiar_datos1(){
    Ext.getCmp("idDocente").setValue("");
    Ext.getCmp("idEscuela").setValue("");
    Ext.getCmp("idNivel").setValue("");
    Ext.getCmp("idMateria").setValue("");
    Ext.getCmp("nroCreditos").setValue("");
    $("#tablaDistributivoDocente tbody tr").remove();
}

function cargaEstudianteInscrito(id){
    Ext.Ajax.request({
        url: '../servidor/estudiante/cargaEstudiante.php',
        params: {
            id: id,
        },
        success: function(response){                                                                                        
            resp = JSON.parse(response.responseText);
            if(resp.data.length>0){
                if(resp.data[5]==2){
                    Ext.Msg.alert('Intenta de nuevo!','Este estudiante ya se encuentra matriculado.. Intente con otro',function (btn){
                        Ext.getCmp('cedulaInscripcion').focus(false, 200);                            
                    });    
                    Ext.getCmp('cedulaInscripcion').setValue("");   
                    

                }else{
                    Ext.getCmp('idEstudianteInscripcion').setValue(resp.data[0]);
                    Ext.getCmp('apellidosInscripcion').setValue(resp.data[1]);
                    Ext.getCmp('nombresInscripcion').setValue(resp.data[2]);
                    Ext.getCmp('box_content').getEl().dom.src="../fotos/"+resp.data[4];
                    if(resp.data[3]==0){
                        Ext.getCmp('checkExtranjero').setValue(0);    
                    }
                    else{
                        Ext.getCmp('checkExtranjero').setValue(1);
                    }
                    /////
                    Ext.Ajax.request({
                        url: '../servidor/inscripcion/cargaInscripcion.php',
                        params: {
                            id: Ext.getCmp('idEstudianteInscripcion').getValue(),                                                                                        
                            periodo:Ext.getCmp('valorInscripcion').getValue(),                                                                
                        },
                        success: function(response){ 
                            resp1 = JSON.parse(response.responseText);
                            if(resp1.data.length>0){   
                                Ext.getCmp('idEstudianteInscripcion').setValue(resp1.data[0]);
                                Ext.getCmp('idEscuelaInscripcion').setValue(resp1.data[2]);
                                Ext.getCmp('escuelaInscripcion').setValue(resp1.data[3]);
                                Ext.getCmp('paraleloInscripcion').setValue(resp1.data[4]);
                                if(resp1.data[5]==0){
                                    Ext.getCmp('checkDocEntregadosInscrpcion').setValue(0);    
                                }
                                else{
                                    Ext.getCmp('checkDocEntregadosInscrpcion').setValue(1);
                                }
                                if(resp1.data[7]!='null'){
                                    Ext.getCmp('fechaAptitud').setValue(resp1.data[7]);
                                }
                                if(resp1.data[6]!=null && !resp1.data[6]==""){
                                    Ext.getCmp('notaAptitud').setValue(resp1.data[6]);                                                                                               
                                }else{
                                    Ext.getCmp('notaAptitud').setValue(""); 
                                }
                                if(!parseFloat(resp1.data[6])>=6.5){
                                    Ext.getCmp('notaConocimiento').setReadOnly(true);
                                }else{
                                    Ext.getCmp('notaConocimiento').setReadOnly(false);
                                }
                                if(resp1.data[8]!=null && resp1.data[8]!=''){
                                    Ext.getCmp('notaConocimiento').setValue(resp1.data[8]);                                                                                               
                                }else{
                                    Ext.getCmp('notaConocimiento').setValue("");                                                                                               
                                }
                                if(resp1.data[9]!=null){
                                    Ext.getCmp('fechaConocimiento').setValue(resp1.data[9]);
                                }
                            }
                        }
                    });   
                }
            }
            else{
                Ext.getCmp("apellidosInscripcion").setValue("");
                Ext.getCmp("nombresInscripcion").setValue("");
                Ext.getCmp("idEstudianteInscripcion").setValue("");
                Ext.getCmp('checkExtranjero').setValue(0);   
                Ext.getCmp('cedulaInscripcion').setValue("");   
                Ext.getCmp('box_content').getEl().dom.src="";
                Ext.Msg.confirm('Advertencia', 'Este número de cédula no existe</br>    Desea crearlo?', 
                function (btn){
                    if(btn==='yes'){
                         ventanaEstudiante();   
                    }
                });
            }
        },
    });  
}
///////
function ventanaEstudiante() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var store= {
            fields: ['codigo', 'descripcion'],
            data: [
                { codigo: "Masculino", descripcion: "Masculino" },
                { codigo: "Femenino", descripcion: "Femenino" },                
            ]
        };     
        var items=[
        {    
            xtype: 'textfield',
            id:'idEstudianteCrear',                
            name:'idEstudianteCrear',                
            hidden: true,                
        },{
            layout: 'column',
            items: [{
                columnWidth: .70,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                items:[{ 
                    fieldLabel: 'CI.:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    id: 'ciEstudianteCrear',                    
                    name: 'ciEstudianteCrear',
                    allowBlank:false,    
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                    enforceMaxLength: true,
                    maxLength:10,
                    minLength:10,
                    enableKeyEvents:true,
                    vtype: 'soloNumero',
                    listeners:{
                        'keyup':function(f,e){
                            if(Ext.getCmp('checkExtranjeroCrear').getValue()==false){
                                if(Ext.getCmp('ciEstudianteCrear').getValue().length==10){
                                    var resp=cedula(Ext.getCmp('ciEstudianteCrear').getValue());
                                    if(resp==0){
                                        Ext.Ajax.request({
                                            url: '../servidor/estudiante/buscarEstudiante.php',
                                            params: {
                                                extranjero: Ext.getCmp('checkExtranjeroCrear').getValue(),
                                                cedula:Ext.getCmp('ciEstudianteCrear').getValue(),
                                            },
                                            success: function(response){                                            
                                                var text = response.responseText;
                                                if(text==1){
                                                    Ext.Msg.alert('Intenta de nuevo!','Error esta cédula ya existe',function (btn){
                                                        Ext.getCmp('ciEstudianteCrear').setValue("");
                                                        Ext.getCmp('ciEstudianteCrear').focus(false,200);
                                                    });
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        if(resp==1){
                                            Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida',function (btn){
                                                Ext.getCmp('ciEstudianteCrear').setValue("");
                                                Ext.getCmp('ciEstudianteCrear').focus(false,200);
                                            }); 
                                        }
                                        else{
                                            if(resp==2){
                                                Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida no pertenece a Ecuador',function (btn){
                                                    Ext.getCmp('ciEstudianteCrear').setValue("");
                                                    Ext.getCmp('ciEstudianteCrear').focus(false,200);
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        blur:function(){
                            if(Ext.getCmp('checkExtranjeroCrear').getValue()==true){
                                Ext.Ajax.request({
                                    url: '../servidor/estudiante/buscarEstudiante.php',
                                    params: {
                                        extranjero: Ext.getCmp('checkExtranjeroCrear').getValue(),
                                        cedula:Ext.getCmp('ciEstudianteCrear').getValue(),
                                    },
                                    success: function(response){                                            
                                        var text = response.responseText;
                                        if(text==1){
                                            Ext.Msg.alert('Intenta de nuevo!','Error esta cédula ya existe',function (btn){
                                                Ext.getCmp('ciEstudianteCrear').setValue("");
                                                Ext.getCmp('ciEstudianteCrear').focus(false,200);
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                },{ 
                    fieldLabel: 'Nombres:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    name: 'nombresEstudianteCrear',
                    id: 'nombresEstudianteCrear',                    
                    allowBlank:false,    
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                    vtype: 'soloLetra'
                          
                },{ 
                    fieldLabel: 'Apellidos:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    name: 'apellidosEstudianteCrear',
                    id: 'apellidosEstudianteCrear',                    
                    allowBlank:false,    
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                    vtype: 'soloLetra',
                        
                },{ 
                    fieldLabel: 'Dirección:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    name: 'direccionEstudianteCrear',
                    id: 'direccionEstudianteCrear',                    
                    allowBlank:true,    
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                          
                },{
                    fieldLabel: 'Fecha Nacimiento:',
                    labelWidth: 110,                    
                    xtype: 'datefield',
                    id:'nacimientoEstudianteCrear',
                    name:'nacimientoEstudianteCrear',
                    format: 'Y-m-d',
                    altFormats: 'Y-m-d',
                    editable: false,
                    maxValue: fechaActual(),
                    allowBlank: true,
                    listeners:{
                        select:function(me){
                            var edad=calcular_edad(me.value.getDate(),me.value.getMonth(),me.value.getFullYear());
                            Ext.getCmp("edadEstudianteCrear").setValue(edad);
                        }
                    }
                },{
                    fieldLabel: 'Edad:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    name: 'edadEstudianteCrear',
                    id: 'edadEstudianteCrear',                    
                    allowBlank:true,  
                    readOnly:true,  
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                },{
                    xtype: 'combo',
                    fieldLabel: 'Sexo',
                    labelWidth: 110,                    
                    id: 'sexoEstudianteCrear',
                    name: 'sexoEstudianteCrear',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,                
                    queryMode: 'local',
                    store: store,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',
                },{ 
                    fieldLabel: 'Teléfono:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    name: 'telelfonoEstudianteCrear',
                    id: 'telelfonoEstudianteCrear',                    
                    allowBlank:true,    
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                    vtype: 'soloNumero'
                          
                },{ 
                    fieldLabel: 'Celular:',
                    labelWidth: 110,                    
                    xtype: 'textfield',
                    name: 'celularEstudianteCrear',
                    id: 'celularEstudianteCrear',                    
                    allowBlank:true,    
                    anchor:"100% 8%",                       
                    msgTarget: 'side',
                    vtype: 'soloNumero'
                          
                },
                ]
            },{
                columnWidth: .30,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;',
                items:[{ 
                    xtype:'checkboxfield',
                    boxLabel: 'Extranjero',
                    name: 'extranjeroCrear',
                    inputValue: '1',
                    id: 'checkExtranjeroCrear',
                    uncheckedValue: '0',
                    enableKeyEvents:true,
                    listeners:{
                        change:function(field){
                            Ext.getCmp('ciEstudianteCrear').setValue("");
                            if(Ext.getCmp('checkExtranjeroCrear').getValue()==false){
                                var textfield=Ext.getCmp('ciEstudianteCrear');
                                textfield.minLength = 10;
                                textfield.inputEl.dom.minLength =10;
                                textfield.maxLength = 10;
                                textfield.inputEl.dom.maxLength =10;
                            }
                            else{
                                var textfield=Ext.getCmp('ciEstudianteCrear');
                                textfield.minLength = 1;
                                textfield.inputEl.dom.minLength =1;
                                textfield.maxLength = 30;
                                textfield.inputEl.dom.maxLength =30;
                            }
                        }
                    },
                },
                {
                    xtype: 'filefield',
                    name: 'foto_estudiante',
                    labelWidth: 50,
                    hideLabel:true,
                    msgTarget: 'side',
                    allowBlank: true,
                    anchor: '100%',
                    accept:'image/*',
                    buttonOnly: true,
                    buttonConfig: {
                        text: 'Seleccione una imagen',
                    },
                    listeners:{
                        afterrender:function(cmp){
                            cmp.fileInputEl.set({
                                accept:'image/*' // or w/e type
                            });
                            }
                        }
                    }
                ]    
            }]
        }];
        var boton=[ 
        {
            text: 'Guardar',
            iconCls: 'add', 
            cls:'x-btn-blue',                
            formBind: true,
            handler: function() {             
                formulario.getForm().submit({
                    method: 'POST',
                    waitTitle: 'Conectando',
                    waitMsg: 'Enviando datos...',
                    success: function(fp,o) {                           
                        Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        Ext.getCmp('idEstudianteInscripcion').setValue(o.result.data[0]);
                        Ext.getCmp('apellidosInscripcion').setValue(o.result.data[1]);
                        Ext.getCmp('nombresInscripcion').setValue(o.result.data[2]);
                        Ext.getCmp('box_content').getEl().dom.src="../fotos/"+o.result.data[3];
                        if(o.result.data[4]==0){
                            Ext.getCmp('checkExtranjero').setValue(0);    
                        }
                        else{
                            Ext.getCmp('checkExtranjero').setValue(1);
                        }
                        Ext.getCmp('cedulaInscripcion').setValue(Ext.getCmp("ciEstudianteCrear").getValue());
                        formulario.getForm().reset();
                        win.close();
                    },
                    failure: function(form, action) {
                        if (action.failureType === 'server')
                        {
                            Ext.Msg.alert('Intenta de nuevo!', 'Error al momento de guardar');
                            formulario.getForm().reset();
                        }
                        else
                        {
                            Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + 'Error no responde el servidor');                                                           
                            formulario.getForm().reset();
                        }
                    }
                });     
            }
        },{
            text:'Cerrar',
            iconCls: 'cancel',                
            cls:'x-btn-blue',
            handler: function() {
                win.close();
            }
        },];
        var formulario = new Ext.FormPanel({
            url: '../servidor/estudiante/crearEstudiante.php',
            labelWidth: 100,
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,            
            buttons: boton,            
            title:'Ingreso de estudiantes',             
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 500,
            height: 330,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            draggable:false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });
     
//////////////
}