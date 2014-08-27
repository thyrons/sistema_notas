Ext.define('MyDesktop.matriculas', {
    extend: 'Ext.ux.desktop.Module',    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.tip.QuickTipManager',
        'Ext.toolbar.Paging',
        'Ext.form.*'
    ],
    ////ventana Inscripciones////
    ventanaPeriodos1: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();   
        Ext.define('ServiceList', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_per', type: 'int'},
                {name: 'fecha_per', type: 'string'}
            ]
        });      
        var storePeriodo = Ext.create('Ext.data.Store', {
            model: 'ServiceList',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaPeriodo.php'
            },
            listeners:{
                load: function(store, records, success) {                    
                    Ext.getCmp('periodoAcademico1').setValue(store.getAt('0').get('id_per'));       
                }
            },        
        });   
        var items=[
        {                                               
            xtype: 'combo',
            fieldLabel: 'Período Académico',
            labelWidth: 120,
            id: 'periodoAcademico1',
            name: 'periodoAcademico1',
            autoSelect: true,
            allowBlank: false,
            editable: true,
            triggerAction: 'all',
            typeAhead: true,
            anchor: '100%',
            enableKeyEvents: true,
            forceSelection: true,
            queryMode: 'local',
            store: storePeriodo,
            displayField: 'fecha_per',
            valueField: 'id_per',
            msgTarget: 'side',    
        },];    
        var boton=[            
        {
            text: 'Continuar', 
            iconCls: 'go', 
            cls:'x-btn-blue',               
            formBind: true,
            handler: function() {                     
                formulario.getForm().submit({
                    method: 'POST',
                    waitTitle: 'Conectando',
                    waitMsg: 'Enviando datos...',
                    success: function() {                                                   
                        ventanaInscripciones();                          
                        Ext.getCmp('valorInscripcion').setValue(Ext.getCmp('periodoAcademico1').getValue());
                        Ext.getCmp('periodoInscripcion').setValue(Ext.getCmp('periodoAcademico1').getRawValue());
                    },
                    failure: function(form, action) {
                        if (action.failureType === 'server')
                        {
                            obj = Ext.decode(action.response.responseText);
                            Ext.Msg.confirm('Deseas continuar?', obj.errors.reason, 
                            function (btn){
                                if(btn==='yes'){
                                    ventanaInscripciones();
                                    Ext.getCmp('valorInscripcion').setValue('0');
                                    Ext.getCmp('periodoInscripcion').setValue(Ext.getCmp('periodoAcademico1').getRawValue());
                                }
                                else{
                                    formulario.getForm().reset();
                                }
                            });                     
                        }
                        else
                        {
                            Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                            formulario.getForm().reset();
                        }
                    }
                });     
            }                       
        },             
        {
            text: 'Cerrar',
            iconCls: 'cancel', 
            cls:'x-btn-blue',
            handler: function() {
                win.close();           
            }
        },];
        var formulario = new Ext.FormPanel({                       
            url: '../servidor/general/revisaEstado1.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });  
        var win = desktop.getWindow('periodos1' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'periodos1' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 400,
                resizable: false,
                maximizable: false,
                plain: true,
                border: false,
                items: [formulario],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2014 - Uniandes Ibarra'
                }],
            });
        }
        win.show();
        return win;         
    },
    ////ventana Periodos////
    ventanaPeriodos2: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();   
        Ext.define('ServiceList', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_per', type: 'int'},
                {name: 'fecha_per', type: 'string'}
            ]
        });      
        var storePeriodo = Ext.create('Ext.data.Store', {
            model: 'ServiceList',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaPeriodo.php'
            },
            listeners:{
                load: function(store, records, success) {                    
                    Ext.getCmp('periodoAcademico2').setValue(store.getAt('0').get('id_per'));       
                }
            },        
        });   
        var items=[
        {                                               
            xtype: 'combo',
            fieldLabel: 'Período Académico',
            labelWidth: 120,
            id: 'periodoAcademico2',
            name: 'periodoAcademico2',
            autoSelect: true,
            allowBlank: false,
            editable: true,
            triggerAction: 'all',
            typeAhead: true,
            anchor: '100%',
            enableKeyEvents: true,
            forceSelection: true,
            queryMode: 'local',
            store: storePeriodo,
            displayField: 'fecha_per',
            valueField: 'id_per',
            msgTarget: 'side',    
        },];    
        var boton=[            
        {
            text: 'Continuar', 
            iconCls: 'go', 
            cls:'x-btn-blue',               
            formBind: true,
            handler: function() {                     
                formulario.getForm().submit({
                    method: 'POST',
                    waitTitle: 'Conectando',
                    waitMsg: 'Enviando datos...',
                    success: function() {                                                   
                        ventanaMatriculas();                          
                        Ext.getCmp('valorMatricula').setValue(Ext.getCmp('periodoAcademico2').getValue());
                        Ext.getCmp('periodoMatricula').setValue(Ext.getCmp('periodoAcademico2').getRawValue());
                    },
                    failure: function(form, action) {
                        if (action.failureType === 'server')
                        {
                            obj = Ext.decode(action.response.responseText);
                            Ext.Msg.confirm('Deseas continuar?', obj.errors.reason, 
                            function (btn){
                                if(btn==='yes'){
                                    ventanaMatriculas();
                                    Ext.getCmp('valorMatricula').setValue('0');
                                    Ext.getCmp('periodoMatricula').setValue(Ext.getCmp('periodoAcademico2').getRawValue());
                                }
                                else{
                                    formulario.getForm().reset();
                                }
                            });                     
                        }
                        else
                        {
                            Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                            formulario.getForm().reset();
                        }
                    }
                });     
            }                       
        },             
        {
            text: 'Cerrar',
            iconCls: 'cancel', 
            cls:'x-btn-blue',
            handler: function() {
                win.close();           
            }
        },];
        var formulario = new Ext.FormPanel({                       
            url: '../servidor/general/revisaEstado2.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });  
        var win = desktop.getWindow('periodos2' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'periodos2' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 400,
                resizable: false,
                maximizable: false,
                plain: true,
                border: false,
                items: [formulario],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2014 - Uniandes Ibarra'
                }],
            });
        }
        win.show();
        return win;         
    },
}); 
//////////////
function ventanaInscripciones() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.define("PostEscuela", {
            extend: 'Ext.data.Model',
            proxy: {
                type: 'jsonp',
                url : '../servidor/escuela/buscarEscuela.php',
                reader: {
                    type: 'json',
                    root: 'topics',
                    totalProperty: 'totalCount'
                }
            },

            fields: [
                {name: 'id', mapping: 'post_id'},
                {name: 'id_escuela', mapping: 'id_escuela'},
                {name: 'nombre_escuela', mapping: 'nombre_escuela'},
                {name: 'carrera', mapping: 'carrera'},
            ]
        });

        dsEscuela = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'PostEscuela'
        });   
        var storeParalelos= {
            fields: ['codigo', 'descripcion'],
            data: [
                { codigo: "A", descripcion: "A" },
                { codigo: "B", descripcion: "B" },                
                { codigo: "C", descripcion: "C" },                
                { codigo: "D", descripcion: "D" },                
                { codigo: "E", descripcion: "E" },                
                { codigo: "F", descripcion: "F" },                
                { codigo: "G", descripcion: "G" },                
                { codigo: "H", descripcion: "H" },                
                { codigo: "I", descripcion: "I" },                
                { codigo: "J", descripcion: "J" },                
                { codigo: "K", descripcion: "K" },                
            ]
        };   
         var items=[
        {    
            xtype: 'textfield',                                           
            id:'valorInscripcion',                
            name:'valorInscripcion',                
            hidden: true,                  
        },
        {
            xtype: 'textfield',        
            name: 'operInscripciones',
            hidden: true,
            value: 'add'
        },
        {
            fieldLabel: 'Período Académico ',
            labelWidth: 130,                    
            xtype: 'textfield',
            name: 'periodoInscripcion',
            id: 'periodoInscripcion',                    
            allowBlank:false,    
            anchor:"100% 8%",                       
            msgTarget: 'side',   
            readOnly:true,       
        },
        {
            layout: 'column', 
            title:'Inscripciones',                                    
            items:[{
                columnWidth: .79,
                layout: 'form',                        
                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                items:[
                {
                    xtype: 'fieldset',
                    columnWidth: 0.7,
                    title: 'Datos del Estudiante',
                    collapsible: true,
                    //defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'column',
                    items: [{
                        columnWidth: .60,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:1px; border:none;',
                        items:[{
                            fieldLabel: 'Cédula:',
                            labelWidth: 50,                    
                            xtype: 'textfield',
                            name: 'cedulaInscripcion',
                            id: 'cedulaInscripcion',                    
                            allowBlank:false,    
                            anchor:"100% 8%",                       
                            msgTarget: 'side',  
                            enableKeyEvents:true,
                            listeners:{
                                specialkey: function(field, e){
                                    if(!field.value==""){
                                        if (e.getKey() == e.ENTER) {
                                           cargaEstudianteInscrito(Ext.getCmp('cedulaInscripcion').getValue());
                                        }
                                    }
                                    else{
                                        Ext.Msg.alert("Error","Llene el campo para poner continuar")
                                        Ext.getCmp("apellidosInscripcion").setValue("");
                                        Ext.getCmp("nombresInscripcion").setValue("");
                                        Ext.getCmp("idEstudianteInscripcion").setValue("");
                                        Ext.getCmp('checkExtranjero').setValue(0);   
                                        Ext.getCmp('box_content').getEl().dom.src="";
                                    }
                                }
                            },   
                        },{
                            xtype: 'textfield',                                           
                            id:'idEstudianteInscripcion',                
                            name:'idEstudianteInscripcion',                
                            hidden: true,         
                        }]
                    },{
                        columnWidth: .11,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                        items:[
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            tooltip: 'Crear nuevos alumnos',
                            width: 50,
                            handler: function () {
                                ventanaEstudiante();
                            }, 
                        },]
                    },{
                        columnWidth: .10,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                        items:[
                        {
                            xtype: 'button',
                            text: '...',
                            tooltip: 'Buscar alumnos inscritos',
                            width: 40,
                            handler: function () {
                                ventanaBuscarEstudianteIncripcion();
                            }, 
                        },]
                    },{
                        columnWidth: .19,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        items:[
                        {
                            xtype:'checkboxfield',
                            boxLabel: 'Extranjero',
                            name: 'extranjero',
                            inputValue: '1',
                            uncheckedValue: '0',    
                            id: 'checkExtranjero',
                            readOnly:true,
                        }]
                    },{
                        columnWidth: 1,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        items:[
                        {
                            fieldLabel: 'Apellidos:',
                            labelWidth: 50,                    
                            xtype: 'textfield',
                            name: 'apellidosInscripcion',
                            id: 'apellidosInscripcion',                    
                            allowBlank:true,    
                            anchor:"100% 8%",                       
                            msgTarget: 'side',
                            readOnly:true,        
                        },]    
                    },{ 
                        columnWidth: 1,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        items:[
                        {
                            fieldLabel: 'Nombres:',
                            labelWidth: 50,                    
                            xtype: 'textfield',
                            name: 'nombresInscripcion',
                            id: 'nombresInscripcion',                    
                            allowBlank:true,    
                            anchor:"100% 8%",                       
                            msgTarget: 'side',
                            readOnly:true,        
                        }]
                    }] 
                },{
                    columnWidth: .79,
                    layout: 'form',                        
                    bodyStyle: '/*background:#DFE8F6*/; padding-left:5px;margin-top:-5px; border:none;',
                    items:[
                    {
                        xtype: 'fieldset',
                        columnWidth: 1,
                        title: 'Datos de la Inscripcion',
                        collapsible: true,
                        //defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        layout: 'form',
                        items: [{
                            id: 'idEscuelaInscripcion',
                            name: 'idEscuelaInscripcion',
                            xtype: 'textfield',
                            hidden: true,     
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Escuela',
                            labelWidth: 50,
                            id: 'escuelaInscripcion',
                            name: 'escuelaInscripcion',
                            store: dsEscuela,
                            displayField: 'nombre_escuela',
                            valueField: 'id_escuela',
                            typeAhead: false,
                            hideLabel: false,
                            hideTrigger:true,
                            allowBlank:false, 
                            minLength:4,
                            minChars:2,
                            invalidText: 'Mínimo 4 caracteres para buscar',  
                            anchor: '100%',
                            listeners:{
                                select:function (){
                                    Ext.getCmp("idEscuelaInscripcion").setValue(Ext.getCmp("escuelaInscripcion").getValue());                       
                                }
                            },
                            listConfig: {
                                loadingText: 'Buscando...',
                                emptyText: 'No se encontraron resultados.',
                                // Custom rendering template for each item
                                getInnerTpl: function() {
                                   return '<a class="search-item">' +
                                    '<h4 style=padding:0px;margin:5px 0 5px 0;><span>{nombre_escuela}</span> - {carrera}</h4>' +
                                    '</a>';      
                                }
                            },
                            pageSize: 10,
                        },{
                            layout: 'column',
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                            items: [{
                                columnWidth: .50,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                                items:[{
                                    xtype: 'combo',
                                    fieldLabel: 'Paralelo',
                                    labelWidth: 50,                    
                                    id: 'paraleloInscripcion',
                                    name: 'paraleloInscripcion',
                                    autoSelect: false,
                                    allowBlank: false,
                                    editable: false,
                                    triggerAction: 'all',
                                    typeAhead: true,
                                    anchor: '100%',
                                    enableKeyEvents: true,                
                                    queryMode: 'local',
                                    store: storeParalelos,
                                    displayField: 'descripcion',
                                    valueField: 'codigo',
                                    msgTarget: 'side',
                                    value:'A',
                                },]
                            },{
                                columnWidth: .48,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                                items:[{
                                    xtype:'checkboxfield',
                                    boxLabel: 'Documentos Entregados',
                                    name: 'docEntregadosInscrpcion',
                                    inputValue: '1',
                                    uncheckedValue: '0',    
                                    id: 'checkDocEntregadosInscrpcion',  
                                },]   
                            },]
                        },]
                    }]
                },{
                    columnWidth: .79,
                    layout: 'form',                        
                    bodyStyle: '/*background:#DFE8F6*/; padding-left:5px;margin-top:-5px;margin-top:-5px; border:none;',
                    items:[
                    {
                        xtype: 'fieldset',
                        columnWidth: 1,
                        title: 'Pruebas de Ingreso',
                        collapsible: true,
                        //defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        layout: 'form',
                        items: [{
                            layout: 'column',
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                            items: [{
                                columnWidth: .50,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                                items:[{
                                    fieldLabel: 'Prueba de Aptitud:',
                                    labelWidth: 110,                    
                                    xtype: 'datefield',
                                    id:'fechaAptitud',
                                    name:'fechaAptitud',
                                    format: 'Y-m-d',
                                    altFormats: 'Y-m-d',
                                    editable: false,
                                    value: fechaActual(),
                                    allowBlank: true,
                                },{
                                    fieldLabel: 'P. de Conocimiento:',
                                    labelWidth: 110,                    
                                    xtype: 'datefield',
                                    id:'fechaConocimiento',
                                    name:'fechaConocimiento',
                                    format: 'Y-m-d',
                                    altFormats: 'Y-m-d',
                                    editable: false,
                                    value: fechaActual(),
                                    allowBlank: true,    
                                },]
                            },{
                                columnWidth: .40,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                                items:[{
                                    fieldLabel: 'Nota:',
                                    labelWidth: 50,                    
                                    xtype: 'textfield',
                                    name: 'notaAptitud',
                                    id: 'notaAptitud',                    
                                    allowBlank:true,    
                                    anchor:"100% 8%",                       
                                    msgTarget: 'side',
                                    readOnly:false, 
                                    vtype:'soloDecimales',   
                                    enableKeyEvents:true,
                                    listeners:{
                                        keyup:function (){
                                            if(parseFloat(Ext.getCmp("notaAptitud").getValue())>=6.5){
                                                Ext.getCmp('notaConocimiento').setReadOnly(false);
                                            }else{
                                                Ext.getCmp('notaConocimiento').setReadOnly(true);
                                                Ext.getCmp('notaConocimiento').setValue('');
                                            }
                                        }
                                    }   
                                },{
                                    fieldLabel: 'Nota:',
                                    labelWidth: 50,                    
                                    xtype: 'textfield',
                                    name: 'notaConocimiento',
                                    id: 'notaConocimiento',                    
                                    allowBlank:true,    
                                    anchor:"100% 8%",                       
                                    msgTarget: 'side',
                                    readOnly:true,       
                                    vtype:'soloDecimales',
                                },]   
                            },]   
                        }]
                    }]    
                },]
            },{
                columnWidth: .20,
                layout: 'form',                        
                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                items:[
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.90,
                        title: 'Foto',
                        collapsible: true,
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        //defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        layout: 'column',
                        items: [{
                            xtype:'box',
                            id: 'box_content',
                            autoHeight: true,
                            style:'width:100%;',
                            height:150,
                            width:118,
                            autoEl:{ 
                                tag: 'img',
                                src:'' 
                            }  
                        }]
                    }
                ]
            },]
        },];
        var boton=[ 
        {
            text: 'Guardar', 
            id:'btnGuardarInscripcion',               
            formBind: true,               
            iconCls: 'add', 
            cls:'x-btn-blue',
            handler: function() {
                formulario.getForm().submit({
                    method: 'POST',
                    waitTitle: 'Conectando',
                    waitMsg: 'Enviando datos...',
                    success: function() {                           
                        var valor=Ext.getCmp('valorInscripcion').getValue();
                        var periodo=Ext.getCmp('periodoInscripcion').getRawValue();
                        formulario.getForm().reset();
                        Ext.getCmp('valorInscripcion').setValue(valor);
                        Ext.getCmp('periodoInscripcion').setValue(periodo);
                        Ext.getCmp('box_content').getEl().dom.src="";
                        Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                    },
                    failure: function(form, action) {
                        if (action.failureType === 'server')
                        {
                            obj = Ext.decode(action.response.responseText);
                            Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                            var valor=Ext.getCmp('valorInscripcion').getValue();
                            var periodo=Ext.getCmp('periodoInscripcion').getRawValue();
                            formulario.getForm().reset();
                            Ext.getCmp('valorInscripcion').setValue(valor);
                            Ext.getCmp('periodoInscripcion').setValue(periodo);
                        }
                        else
                        {
                            Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                            formulario.getForm().reset();
                         }
                    }
                });
            }                       
        },{
            text: 'Cerrar',
            iconCls: 'cancel', 
            cls:'x-btn-blue',
            handler: function() {
                win.close();           
            }
        },{
            text: 'Buscar',
            iconCls: 'search', 
            cls:'x-btn-blue',
            handler: function() {
                ventanaBuscarEstudianteIncripcion();
            }
        }];
        var formulario = new Ext.FormPanel({
            url: '../servidor/inscripcion/inscripcion.php',
            labelWidth: 80,
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,            
            buttons: boton,            
            title:'Período Acádemico',             
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 750,
            height: 470,
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
}
//////////////

function ventanaBuscarEstudianteIncripcion() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Estudiantes Inscritos', 
            html: '<table id="ventanaBuscarEstudianteIncripcion" style="font-size:12px;"></table><div id="pgVentanaBuscarEstudianteIncripcion"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 620,
            height: 270,
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
    function enviarVentanaBuscarEstudianteIncripcion(id) {
        var tabla = jQuery('#ventanaBuscarEstudianteIncripcion').jqGrid('getRowData', id);  
        Ext.getCmp('idEstudianteInscripcion').setValue(tabla.id_estudiante);
        Ext.getCmp('cedulaInscripcion').setValue(tabla.ci_estudiante);
        Ext.getCmp('apellidosInscripcion').setValue(tabla.apellidos_estudiante);
        Ext.getCmp('nombresInscripcion').setValue(tabla.nombres_estudiante);
        Ext.getCmp('box_content').getEl().dom.src="../fotos/"+tabla.foto;    
        if(tabla.extranjero==0){
            Ext.getCmp('checkExtranjero').setValue(0);    
        }
        else{
            Ext.getCmp('checkExtranjero').setValue(1);
        }  
        cargaEstudianteInscrito(tabla.ci_estudiante);
        Ext.WindowManager.getActive().close();
    }
    jQuery(function() {
        var width = 600;
        jQuery("#ventanaBuscarEstudianteIncripcion").jqGrid({
            url: '../servidor/estudiante/buscar_estudiantes_inscritos_xml.php',
            datatype: "xml",            
            width: width,
            colNames: ['id_estudiante','CI.','Apellidos Completos','Nombres Completos','Dirección','foto','Teléfono','Celular','extranjero'],
            colModel: [
                {
                    name:'id_estudiante',index:'id_estudiante',editable:true,align:'center', search:true,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'ci_estudiante',index:'ci_estudiante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'apellidos_estudiante',index:'apellidos_estudiante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombres_estudiante',index:'nombres_estudiante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'direccion_estudiante',index:'direccion_estudiante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'foto',index:'foto',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'telefono_estudiante',index:'telefono_estudiante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'celular_estudiante',index:'celular_estudiante',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'extranjero',index:'extranjero',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                                                             
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgVentanaBuscarEstudianteIncripcion',
            sortname: 'id_estudiante',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            //altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarVentanaBuscarEstudianteIncripcion(rowid);      
            }
        });      
        jQuery("#ventanaBuscarEstudianteIncripcion").jqGrid('hideCol', "id_estudiante");        
        jQuery("#ventanaBuscarEstudianteIncripcion").jqGrid('hideCol', "foto");        
        jQuery("#ventanaBuscarEstudianteIncripcion").jqGrid('hideCol', "extranjero");        
        jQuery("#ventanaBuscarEstudianteIncripcion").jqGrid('navGrid', '#pgVentanaBuscarEstudianteIncripcion',           
        {
            add: false,
            edit: false,
            del: false
        },      
        {},
        {}, // del options
        {
            zIndex: 550012
        } // search options
        );
    });
}
///////////inscripciones///
function ventanaMatriculas(){
    Ext.onReady(function() {
        Ext.QuickTips.init();
        Ext.define("PostEscuela1", {
            extend: 'Ext.data.Model',
            proxy: {
                type: 'jsonp',
                url : '../servidor/escuela/buscarEscuela.php',
                reader: {
                    type: 'json',
                    root: 'topics',
                    totalProperty: 'totalCount'
                }
            },

            fields: [
                {name: 'id', mapping: 'post_id'},
                {name: 'id_escuela', mapping: 'id_escuela'},
                {name: 'nombre_escuela', mapping: 'nombre_escuela'},
                {name: 'carrera', mapping: 'carrera'},
            ]
        });

        dsEscuela1 = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'PostEscuela1'
        });  

        Ext.define("PostEstudiante", {
            extend: 'Ext.data.Model',
            proxy: {
                type: 'jsonp',
                url : '../servidor/matricula/buscarEstudiante.php',
                reader: {
                    type: 'json',
                    root: 'topics',
                    totalProperty: 'totalCount'
                }
            },

            fields: [
                {name: 'id', mapping: 'post_id'},
                {name: 'id_estudiante', mapping: 'id_estudiante'},
                {name: 'ci_estudiante', mapping: 'ci_estudiante'},
                {name: 'apellidos_estudiante', mapping: 'apellidos_estudiante'},
                {name: 'nombres_estudiante', mapping: 'nombres_estudiante'},
                {name: 'rutaEstudiante', mapping: 'rutaEstudiante'},
                {name: 'extranjeroEs', mapping: 'extranjeroEs'},
            ]
        });

        dsEstudiante = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'PostEstudiante'
        });   
        var storeParalelosMatricula= {
            fields: ['codigo', 'descripcion'],
            data: [
                { codigo: "A", descripcion: "A" },
                { codigo: "B", descripcion: "B" },                
                { codigo: "C", descripcion: "C" },                
                { codigo: "D", descripcion: "D" },                
                { codigo: "E", descripcion: "E" },                
                { codigo: "F", descripcion: "F" },                
                { codigo: "G", descripcion: "G" },                
                { codigo: "H", descripcion: "H" },                
                { codigo: "I", descripcion: "I" },                
                { codigo: "J", descripcion: "J" },                
                { codigo: "K", descripcion: "K" },                
            ]
        };   
        var storeNivelesMatricula= {
            fields: ['codigo', 'descripcion'],
            data: [
                { codigo: "1", descripcion: "1" },
                { codigo: "2", descripcion: "2" },                
                { codigo: "3", descripcion: "3" },                
                { codigo: "4", descripcion: "4" },                
                { codigo: "5", descripcion: "5" },                
                { codigo: "6", descripcion: "6" },                
                { codigo: "7", descripcion: "7" },                
                { codigo: "8", descripcion: "8" },                
                { codigo: "9", descripcion: "9" },                
                { codigo: "10", descripcion: "10" },                
            ]
        };
        Ext.define('ServiceList', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_modalidad', type: 'int'},
                {name: 'nombre_modadlidad', type: 'string'}
            ]
        });        
        var storeMatriculaModalidad = Ext.create('Ext.data.Store', {
            model: 'ServiceList',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaModalidad.php'
            },
                     
        });   
        var items=[
        {    
            xtype: 'textfield',                                           
            id:'valorMatricula',                
            name:'valorMatricula',                
            hidden: true,                  
        },
        {
            xtype: 'textfield',        
            name: 'operMatriculas',
            hidden: true,
            value: 'add'
        },
        {
            fieldLabel: 'Período Académico ',
            labelWidth: 130,                    
            xtype: 'textfield',
            name: 'periodoMatricula',
            id: 'periodoMatricula',                    
            allowBlank:false,    
            anchor:"100% 8%",                       
            msgTarget: 'side',   
            readOnly:true,       
        },
        {
            layout: 'column', 
            title:'Matrículas',                                    
            items:[{
                columnWidth: .79,
                layout: 'form',                        
                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                items:[
                {
                    xtype: 'fieldset',
                    columnWidth: 0.7,
                    title: 'Datos del Estudiante',
                    collapsible: true,
                    //defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'column',
                    items: [{
                        columnWidth: .60,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:1px; border:none;',
                        items:[{
                            xtype: 'combo',
                            fieldLabel: 'CI.',
                            labelWidth: 70,
                            id: 'estudianteMatricula',
                            name: 'estudianteMatricula',
                            store: dsEstudiante,
                            displayField: 'ci_estudiante',
                            valueField: 'id_estudiante',
                            typeAhead: false,
                            hideLabel: false,
                            hideTrigger:true,
                            allowBlank:true, 
                            minLength:2,
                            minChars:1,
                            invalidText: 'Mínimo 2 caracteres para buscar',  
                            anchor: '100%',
                            listeners:{
                                select:function (){
                                    Ext.getCmp("idEstudianteMatricula").setValue(Ext.getCmp("estudianteMatricula").getValue());                       
                                    Ext.getCmp("apellidosMatricula").setValue(Ext.getCmp("estudianteMatricula").displayTplData[0].apellidos_estudiante);
                                    Ext.getCmp("nombresMatricula").setValue(Ext.getCmp("estudianteMatricula").displayTplData[0].nombres_estudiante);
                                    Ext.getCmp('box_estudiante').getEl().dom.src="../fotos/" + Ext.getCmp("estudianteMatricula").displayTplData[0].rutaEstudiante;
                                    console.log(Ext.getCmp("estudianteMatricula").displayTplData)
                                    if(Ext.getCmp("estudianteMatricula").displayTplData[0].extranjeroEs== 0){
                                        Ext.getCmp('checkExtranjeroMatricula').setValue(0);    
                                    }
                                    else{
                                        Ext.getCmp('checkExtranjeroMatricula').setValue(1);
                                    }
                                }
                            },
                            listConfig: {
                                loadingText: 'Buscando...',
                                emptyText: 'No se encontraron resultados.',
                                // Custom rendering template for each item
                                getInnerTpl: function() {
                                   return '<a class="search-item">' +
                                    '<h4 style=padding:0px;margin:5px 0 5px 0;><span>{ci_estudiante}</span>  {nombres_estudiante} - {apellidos_estudiante}</h4>' +
                                    '</a>';      
                                }
                            },
                            pageSize: 10,
                        },{
                            xtype: 'textfield',                                           
                            id:'idEstudianteMatricula',                
                            name:'idEstudianteMatricula',                
                            hidden: true,         
                        }]
                    },{
                        columnWidth: .15,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:10px; border:none;',
                        items:[
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            width: 50,
                            handler: function () {
                                ventanaBuscarEstudianteMatricula();
                            }, 
                        }]
                    },{
                        columnWidth: .25,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        items:[
                        {
                            xtype:'checkboxfield',
                            boxLabel: 'Extranjero',
                            name: 'extranjeroMatricula',
                            inputValue: '1',
                            id: 'checkExtranjeroMatricula',
                            readOnly:true,
                        }]
                    },{
                        columnWidth: 1,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        items:[
                        {
                            fieldLabel: 'Apellidos:',
                            labelWidth: 70,                    
                            xtype: 'textfield',
                            name: 'apellidosMatricula',
                            id: 'apellidosMatricula',                    
                            allowBlank:true,    
                            anchor:"100% 8%",                       
                            msgTarget: 'side',
                            readOnly:true,        
                        },]    
                    },{ 
                        columnWidth: 1,
                        layout: 'form',                
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        items:[
                        {
                            fieldLabel: 'Nombres:',
                            labelWidth: 70,                    
                            xtype: 'textfield',
                            name: 'nombresMatricula',
                            id: 'nombresMatricula',                    
                            allowBlank:true,    
                            anchor:"100% 8%",                       
                            msgTarget: 'side',
                            readOnly:true,        
                        }]
                    }] 
                },{
                    columnWidth: .79,
                    layout: 'form',                        
                    bodyStyle: '/*background:#DFE8F6*/; padding-left:5px;margin-top:-5px; border:none;',
                    items:[
                    {
                        xtype: 'fieldset',
                        columnWidth: 1,
                        title: 'Datos de la de Matrícula',
                        collapsible: true,
                        //defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        layout: 'form',
                        items: [{
                            id: 'idEscuelaMatricula',
                            name: 'idEscuelaMatricula',
                            xtype: 'textfield',
                            hidden: true,     
                        },{
                            xtype: 'combo',
                            fieldLabel: 'Escuela',
                            labelWidth: 70,
                            id: 'escuelaMatricula',
                            name: 'escuelaMatricula',
                            store: dsEscuela1,
                            displayField: 'nombre_escuela',
                            valueField: 'id_escuela',
                            typeAhead: false,
                            hideLabel: false,
                            hideTrigger:true,
                            allowBlank:true, 
                            minLength:2,
                            minChars:2,
                            invalidText: 'Mínimo 2 caracteres para buscar',  
                            anchor: '100%',
                            listeners:{
                                select:function (){
                                    Ext.getCmp("idEscuelaMatricula").setValue(Ext.getCmp("escuelaMatricula").getValue());                       
                                }
                            },
                            listConfig: {
                                loadingText: 'Buscando...',
                                emptyText: 'No se encontraron resultados.',
                                // Custom rendering template for each item
                                getInnerTpl: function() {
                                   return '<a class="search-item">' +
                                    '<h4 style=padding:0px;margin:5px 0 5px 0;><span>{nombre_escuela}</span> - {carrera}</h4>' +
                                    '</a>';      
                                }
                            },
                            pageSize: 10,
                        },{
                            layout: 'column',
                            bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                            items: [{
                                columnWidth: .50,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                                items:[{
                                    xtype: 'combo',
                                    fieldLabel: 'Paralelo',
                                    labelWidth: 70,                    
                                    id: 'paraleloMatricula',
                                    name: 'paraleloMatricula',
                                    autoSelect: false,
                                    allowBlank: false,
                                    editable: false,
                                    triggerAction: 'all',
                                    typeAhead: true,
                                    anchor: '100%',
                                    enableKeyEvents: true,                
                                    queryMode: 'local',
                                    store: storeParalelosMatricula,
                                    displayField: 'descripcion',
                                    valueField: 'codigo',
                                    msgTarget: 'side',
                                    value:'A',
                                },{
                                    xtype: 'combo',
                                    fieldLabel: 'Modalidad',
                                    labelWidth: 70,                    
                                    id: 'matriculaModalidad',
                                    name: 'matriculaModalidad',
                                    autoSelect: false,
                                    allowBlank: false,
                                    editable: false,
                                    triggerAction: 'all',
                                    typeAhead: true,
                                    anchor: '100%',
                                    enableKeyEvents: true,                
                                    queryMode: 'local',
                                    store: storeMatriculaModalidad,
                                    displayField: 'nombre_modadlidad',
                                    valueField: 'id_modalidad',
                                    msgTarget: 'side',
                                },]
                            },{
                                columnWidth: .48,
                                layout: 'form',                
                                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                                items:[{
                                    xtype: 'combo',
                                    fieldLabel: 'Nivel',
                                    labelWidth: 70,                    
                                    id: 'nivelMatricula',
                                    name: 'nivelMatricula',
                                    autoSelect: false,
                                    allowBlank: false,
                                    editable: false,
                                    triggerAction: 'all',
                                    typeAhead: true,
                                    anchor: '100%',
                                    enableKeyEvents: true,                
                                    queryMode: 'local',
                                    store: storeNivelesMatricula,
                                    displayField: 'descripcion',
                                    valueField: 'codigo',
                                    msgTarget: 'side',
                                    value:'1',
                                },{
                                    layout: 'column',
                                    bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                                    items: [{
                                        columnWidth: .45,
                                        layout: 'form',                
                                        bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                                        items:[{
                                            xtype:'checkboxfield',
                                            boxLabel: 'Extra Ordinaria',
                                            name: 'extraOrdinaria',
                                            inputValue: '1',
                                            uncheckedValue: '0',    
                                            id: 'checkExtraordinaria',
                                            readOnly:true,        
                                        }]   
                                    },{
                                        columnWidth: .55,
                                        layout: 'form',                
                                        bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                                        items:[{
                                            xtype:'checkboxfield',
                                            boxLabel: 'Extra Extra Ordinaria',
                                            name: 'extraExtraOrdinaria',
                                            inputValue: '1',
                                            uncheckedValue: '0',    
                                            id: 'checkExtraExtraordinaria',
                                            readOnly:true,        
                                        }]    
                                    }]
                                }]   
                            },]
                        },]
                    }]
                },{
                    columnWidth: .79,
                    layout: 'form',                        
                    bodyStyle: '/*background:#DFE8F6*/; padding-left:5px;margin-top:-5px;margin-top:-5px; border:none;',
                    items:[
                    {
                        xtype: 'fieldset',
                        columnWidth: 1,
                        title: 'Datos de Ingreso (Casos Excepcionales)',
                        collapsible: true,
                        //defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        layout: 'form',
                        items: [{
                              
                        }]  
                    }]    
                },]
            },{
                columnWidth: .20,
                layout: 'form',                        
                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
                items:[
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.90,
                        title: 'Foto',
                        collapsible: true,
                        bodyStyle: '/*background:#DFE8F6*/; padding-left:2px; border:none;',
                        //defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        layout: 'column',
                        items: [{
                            xtype:'box',
                            id: 'box_estudiante',
                            autoHeight: true,
                            style:'width:100%;',
                            height:150,
                            width:118,
                            autoEl:{ 
                                tag: 'img',
                                src:'' 
                            }  
                        }]
                    }
                ]
            },{

            }]
        },];
        var boton=[ 
        {

        },{
            text: 'Cerrar',
            iconCls: 'cancel', 
            cls:'x-btn-blue',
            handler: function() {
                win.close();           
            }
        },{
            text: 'Buscar',
            iconCls: 'search', 
            cls:'x-btn-blue',
            handler: function() {
                win.close();           
            }
        }];
        var formulario = new Ext.FormPanel({
            url: '../servidor/matricula/matricula.php',
            labelWidth: 80,
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,            
            buttons: boton,            
            title:'Período Acádemico',             
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 750,
            height: 470,
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
}

 
   

