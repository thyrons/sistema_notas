Ext.define('MyDesktop.ingreso', {
    extend: 'Ext.ux.desktop.Module',    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.tip.QuickTipManager',
        'Ext.toolbar.Paging',
        'Ext.form.*'
    ],
    ////ventana niveles////
    ventanaNiveles: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idNivel',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Nivel',                                                 
                labelPad:2,           
                labelWidth: 50,                  
                minLength:1,                
                name:'nomNivel', 
                allowBlank:false,    
                anchor:"100% 30%",                   
                vtype: 'soloNumero',
                msgTarget: 'side'                
            }];           
            var boton=[            
            {
                text: 'Guardar',                
                formBind: true,               
                iconCls: 'add', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().submit({
                        method: 'POST',
                        waitTitle: 'Conectando',
                        waitMsg: 'Enviando datos...',
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomNivel']").focus();
                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text:'Cerrar',
                iconCls: 'cancel',                
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search',               
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarNivel();                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                       
            url: '../servidor/niveles/nivel.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });     
        var win = desktop.getWindow('niveles' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'niveles' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 350,
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
    /////ventana Modalidad////
    ventanaModalidad: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idModalidad',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Modalidad',                                                 
                labelPad:2,           
                labelWidth: 100,                  
                minLength:3,                
                name:'nomModalidad', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomModalidad']").focus();
                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarModalidad();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/modalidad/modalidad.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('modalidad' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'modalidad' + src.windowId,
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
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    },
      /////ventana Seccion////
    ventanaSeccion: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idSeccion',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Sección',                                                 
                labelPad:2,           
                labelWidth: 100,                  
                minLength:3,                
                name:'nomSeccion', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomSeccion']").focus();
                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarSeccion();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/seccion/seccion.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('seccion' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'seccion' + src.windowId,
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
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    },
    /////ventana Carrera////
    ventanaCarreras: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idCarrera',
                hidden: true,                
            },
            {                                               
                fieldLabel:'Carrera',                                                 
                labelPad:2,           
                labelWidth: 100,                  
                minLength:3,                
                name:'nomCarrera', 
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'                
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomCarrera']").focus();
                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarCarrera();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/carrera/carrera.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('carrera' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'carrera' + src.windowId,
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
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    }, 
     /////ventana Escuela////
    ventanaEscuela: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();   
        Ext.define('ServiceList', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_carrera', type: 'int'},
                {name: 'carrera', type: 'string'}
            ]
        });
         var store = Ext.create('Ext.data.Store', {
            model: 'ServiceList',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaCarrera.php'
            }
        });     
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idEscuela',
                hidden: true,                
            },
            {                                               
                fieldLabel: 'Escuela',
                labelWidth: 100,                    
                xtype: 'textfield',
                name: 'nomEscuela',                    
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'        
            },{
                xtype: 'combo',
                fieldLabel: 'Carrera',
                labelWidth: 98,
                id: 'idCarrera',
                name: 'idCarrera',
                autoSelect: false,
                allowBlank: false,
                editable: true,
                triggerAction: 'all',
                typeAhead: true,
                anchor: '100%',
                enableKeyEvents: true,
                queryMode: 'local',
                store: store,
                displayField: 'carrera',
                valueField: 'id_carrera',
                msgTarget: 'side'
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                formulario.getForm().reset();
                                $("input[name='nomEscuela']").focus();
                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarEscuela();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/escuela/escuela.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('escuela' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'escuela' + src.windowId,
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
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    }, 
     /////ventana Materias////
    ventanaMaterias: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();   
        Ext.define('ServiceList', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_nivel', type: 'int'},
                {name: 'nivel', type: 'string'}
            ]
        });      
        Ext.define('ServiceList1', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id_materia', type: 'int'},
                {name: 'nombre_materia', type: 'string'}
            ]
        });        
        var store = Ext.create('Ext.data.Store', {
            model: 'ServiceList',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaNivel.php'
            }
        });
        var store3 = Ext.create('Ext.data.Store', {
            model: 'ServiceList1',
            autoLoad: true,
            proxy: {
                limitParam: undefined,
                startParam: undefined,
                paramName: undefined,
                pageParam: undefined,
                noCache: false,
                type: 'ajax',
                url: '../servidor/general/cargaMateria.php'
            }
        });
         var store2= {
            fields: ['codigo', 'descripcion'],
            data: [
                { codigo: "1", descripcion: "Si" },
                { codigo: "0", descripcion: "No" },                
            ]
        };     
        var items=[
            {
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idMateria',
                hidden: true,                
            },
            {                                               
                fieldLabel: 'Código Materia',
                labelWidth: 100,                    
                xtype: 'textfield',
                name: 'codMateria',                    
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'        
            },{                                               
                fieldLabel: 'Materia',
                labelWidth: 100,                    
                xtype: 'textfield',
                name: 'nomMateria',                    
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloLetra',
                msgTarget: 'side'        
            },
            {                                               
                fieldLabel: 'Nro Créditos',
                labelWidth: 100,                    
                xtype: 'textfield',
                name: 'nroCreditos',                    
                allowBlank:false,    
                anchor:"100% 30%",   
                vtype: 'soloNumero',
                msgTarget: 'side'        
            },{
                xtype: 'combo',
                fieldLabel: 'Nivel',
                labelWidth: 98,
                id: 'idNivel',
                name: 'idNivel',
                autoSelect: false,
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                typeAhead: true,
                anchor: '100%',
                enableKeyEvents: true,
                queryMode: 'local',
                store: store,
                displayField: 'nivel',
                valueField: 'id_nivel',
                msgTarget: 'side'
            },{
                xtype: 'combo',
                fieldLabel: 'Secuencia',
                id: 'estadoSecuencia',
                name: 'estadoSecuencia',
                autoSelect: false,
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                typeAhead: true,
                anchor: '100%',
                enableKeyEvents: true,                
                queryMode: 'local',
                store: store2,
                displayField: 'descripcion',
                valueField: 'codigo',
                msgTarget: 'side',
                value:'0',
                listeners: {
                    change: function (field, newValue, oldValue) {
                        //console.log(field);
                        var campo=Ext.getCmp('idMate');      
                        if(newValue==='1'){                                                                                    
                            campo.show();
                            campo.focus(false, 200);                            
                        }
                        else{
                            campo.hide();                            
                        }                                                   
                    },
                    scope: this
                },
            },{
                xtype: 'combo',
                fieldLabel: 'Materia',
                labelWidth: 98,
                id: 'idMate',
                name: 'idMate',
                hidden:true,
                autoSelect: false,
                allowBlank: true,
                editable: true,
                triggerAction: 'all',
                typeAhead: true,
                anchor: '100%',
                enableKeyEvents: true,
                queryMode: 'local',
                store: store3,
                displayField: 'nombre_materia',
                valueField: 'id_materia',
                msgTarget: 'side'
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                //formulario.getForm().reset();
                                $("input[name='nomMateria']").val("");
                                $("input[name='codMateria']").val("");                              
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarMateria();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/materia/materia.php',
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('materia' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'materia' + src.windowId,
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
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    }, 
     /////ventana Docentes////
    ventanaDocentes: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();                
        var items = [{ 
            layout: 'column',                         
            //title:'Datos principales',
            items:[{
                columnWidth: .45,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    xtype: 'textfield',
                    name: 'operIngresoDocente',
                    hidden: true,
                    value: 'add'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'idIngresoDocente',
                    name: 'idIngresoDocente',
                    hidden: true
                },{
                   fieldLabel: 'Cédula',
                    labelWidth: 60,                    
                    xtype: 'textfield',
                    name: 'cedDocente',                    
                    id: 'cedDocente',                    
                    allowBlank:false,    
                    anchor:"100% 30%",   
                    vtype: 'soloNumero',
                    msgTarget: 'side',
                    maxLength: 10,      
                    minLength:10,
                    enableKeyEvents:true,
                    enforceMaxLength:true,
                    listeners:{
                        'keyup':function(f,e){
                            if(Ext.getCmp('cedDocente').getValue().length==10){                                    
                                var resp=cedula(Ext.getCmp('cedDocente').getValue());
                                if(resp==0){
                                    Ext.Ajax.request({
                                        url: '../servidor/general/cedula.php',
                                        params: {
                                            codigo: Ext.getCmp('cedDocente').getValue(),                                                                                        
                                        },
                                        success: function(response){                                            
                                            var text = response.responseText;
                                            if(text==0){
                                                Ext.Msg.alert('Intenta de nuevo!','Error esta cédula ya existe');
                                                jQuery("input[name='cedDocente']").val("");
                                                Ext.getCmp('cedDocente').focus(false, 200);
                                            }
                                        }
                                    });
                                }
                                else{
                                    if(resp==1){
                                        Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida');
                                        jQuery("input[name='cedDocente']").val("");
                                        Ext.getCmp('cedDocente').focus(false, 200);
                                    }
                                    else{
                                        if(resp==2){
                                            Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida no pertenece a Ecuador');
                                            jQuery("input[name='cedDocente']").val("");
                                            Ext.getCmp('cedDocente').focus(false, 200);
                                        }
                                    }
                                }
                            }                                    
                        }                    
                    },
                },
                {
                    fieldLabel: 'Email',
                    labelWidth: 60,                    
                    xtype: 'textfield',
                    name: 'emailDocente',                    
                    allowBlank:false,    
                    anchor:"100% 30%",                       
                    msgTarget: 'side',  
                    vtype:'email',      
                },{
                    fieldLabel: 'Nombre Usuario',
                    labelWidth: 100,                    
                    xtype: 'textfield',
                    name: 'nomUsuarioDocente',                    
                    allowBlank:false,    
                    anchor:"100% 30%",                       
                    msgTarget: 'side',                      
                },]
            },{
                columnWidth: .55,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                   fieldLabel: 'Nombres Completos',
                    labelWidth: 130,                    
                    xtype: 'textfield',
                    name: 'nomDocentes',                    
                    allowBlank:false,    
                    anchor:"100% 30%",   
                    vtype: 'soloLetra',
                    msgTarget: 'side'        
                },{
                    fieldLabel: 'Dirección',
                    labelWidth: 130,                    
                    xtype: 'textfield',
                    name: 'dirDocente',                    
                    allowBlank:false,    
                    anchor:"100% 30%",                       
                    msgTarget: 'side'        
                },{
                    fieldLabel: 'Tipo Usuario',
                    labelWidth: 130,                    
                    xtype: 'textfield',
                    name: 'tipoUserDocente',                    
                    allowBlank:true,    
                    readOnly:true,
                    value:'Docente',
                    anchor:"100% 30%",   
                    vtype: 'soloLetra',
                    msgTarget: 'side'        
                },]
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                //formulario.getForm().reset();
                                $("input[name='nomUsuarioDocente']").val("");                                
                                $("input[name='nomUsuarioDocente']").focus();                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                    var campo=Ext.getCmp('cedDocente');      
                    campo.setReadOnly(false);
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarDocente();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/usuario/usuario.php',
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('usuario' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'usuario' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 700,
                resizable: false,
                maximizable: false,
                plain: true,
                border: false,
                items: [formulario],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    }, 
      /////ventana Usuarios////
    ventanaUsuarios: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();  
        var store2= {
            fields: ['codigo', 'descripcion'],
            data: [
                { codigo: "Administrador", descripcion: "Administrador" },
                { codigo: "Docente", descripcion: "Docente" },                
                { codigo: "Secretaría", descripcion: "Secretaría" },                
            ]
        };                       
        var items = [{ 
            layout: 'column',                         
            //title:'Datos principales',
            items:[{
                columnWidth: .45,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    xtype: 'textfield',
                    name: 'operIngresoUsuario',
                    hidden: true,
                    value: 'add'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'idIngresoUsuario',
                    name: 'idIngresoUsuario',
                    hidden: true
                },{
                   fieldLabel: 'Cédula',
                    labelWidth: 60,                    
                    xtype: 'textfield',
                    name: 'cedUsuario',                    
                    id: 'cedUsuario',                    
                    allowBlank:false,    
                    anchor:"100% 30%",   
                    vtype: 'soloNumero',
                    msgTarget: 'side',
                    maxLength: 10,      
                    minLength:10,
                    enableKeyEvents:true,
                    enforceMaxLength:true,
                    listeners:{
                        'keyup':function(f,e){
                            if(Ext.getCmp('cedUsuario').getValue().length==10){                                    
                                var resp=cedula(Ext.getCmp('cedUsuario').getValue());
                                if(resp==0){
                                    Ext.Ajax.request({
                                        url: '../servidor/general/cedula.php',
                                        params: {
                                            codigo: Ext.getCmp('cedUsuario').getValue(),                                                                                        
                                        },
                                        success: function(response){                                            
                                            var text = response.responseText;
                                            if(text==0){
                                                Ext.Msg.alert('Intenta de nuevo!','Error esta cédula ya existe');
                                                jQuery("input[name='cedUsuario']").val("");
                                                Ext.getCmp('cedUsuario').focus(false, 200);
                                            }
                                        }
                                    });
                                }
                                else{
                                    if(resp==1){
                                        Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida');
                                        jQuery("input[name='cedUsuario']").val("");
                                        Ext.getCmp('cedUsuario').focus(false, 200);
                                    }
                                    else{
                                        if(resp==2){
                                            Ext.Msg.alert('Intenta de nuevo!','Error esta cédula es inválida no pertenece a Ecuador');
                                            jQuery("input[name='cedUsuario']").val("");
                                            Ext.getCmp('cedUsuario').focus(false, 200);
                                        }
                                    }
                                }
                            }                                    
                        }                    
                    },
                },
                {
                    fieldLabel: 'Email',
                    labelWidth: 60,                    
                    xtype: 'textfield',
                    name: 'emailUsuario',                    
                    allowBlank:false,    
                    anchor:"100% 30%",                       
                    msgTarget: 'side',  
                    vtype:'email',      
                },{
                    fieldLabel: 'Nombre Usuario',
                    labelWidth: 100,                    
                    xtype: 'textfield',
                    name: 'nomUsuario',                    
                    allowBlank:false,    
                    anchor:"100% 30%",                       
                    msgTarget: 'side',                      
                },]
            },{
                columnWidth: .55,
                layout: 'form',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                   fieldLabel: 'Nombres Completos',
                    labelWidth: 130,                    
                    xtype: 'textfield',
                    name: 'nomCompletosUsuario',                    
                    allowBlank:false,    
                    anchor:"100% 30%",   
                    vtype: 'soloLetra',
                    msgTarget: 'side'        
                },{
                    fieldLabel: 'Dirección',
                    labelWidth: 130,                    
                    xtype: 'textfield',
                    name: 'dirUsuario',                    
                    allowBlank:false,    
                    anchor:"100% 30%",                       
                    msgTarget: 'side'        
                },{
                    xtype: 'combo',
                    fieldLabel: 'Tipo Usuario',
                    id: 'tipoUser',
                    name: 'tipoUser',
                    autoSelect: false,
                    allowBlank: false,
                    editable: false,
                    triggerAction: 'all',
                    typeAhead: true,
                    anchor: '100%',
                    enableKeyEvents: true,                
                    queryMode: 'local',
                    store: store2,
                    displayField: 'descripcion',
                    valueField: 'codigo',
                    msgTarget: 'side',                       
                },]
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
                        success: function() {                           
                            formulario.getForm().reset();
                            Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                        },
                        failure: function(form, action) {
                            if (action.failureType === 'server')
                            {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                //formulario.getForm().reset();
                                $("input[name='nomUsuario']").val("");                                
                                $("input[name='nomUsuario']").focus();                                
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    formulario.getForm().reset();
                    var campo=Ext.getCmp('cedUsuario');      
                    campo.setReadOnly(false);
                }
            },           
            {
                text: 'Cerrar',
                iconCls: 'cancel', 
                cls:'x-btn-blue',
                handler: function() {
                    win.close();
                }
            },
            {
                text: 'Buscar',
                iconCls: 'search', 
                cls:'x-btn-blue',
                handler: function() {
                    ventanaBuscarUsuario();
                    
                }
            },
        ];      
        var formulario = new Ext.FormPanel({                     
            url: '../servidor/usuario/usuarioT.php',
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('docente' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'docente' + src.windowId,
                title: src.text,
                iconCls: 'bogus',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                width: 700,
                resizable: false,
                maximizable: false,
                plain: true,
                border: false,
                items: [formulario],
                bbar: [{
                    xtype: 'tbtext',
                    text: ' ©    2014 - Uniandes "Ibarra"'
                }],
            });
        }
        win.show();
        return win;
    }, 
});
    /////////modificacion y busqueda de ventanas////////
    /////////////buscar nivel//    
    function ventanaBuscarNivel() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,           
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Nivel', 
            html: '<table id="tablaNivel" style="font-size:11px;"></table><div id="pgTablaNivel"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaNivel").jqGrid({
            url: '../servidor/niveles/nivel_xml.php',
            datatype: "xml",
            editurl: "../servidor/niveles/nivel.php",
            width: width,
            colNames: ['Código', 'Nivel','Estado'],
            colModel: [
                {
                    name:'id_nivel',index:'id_nivel',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nivel',index:'nivel',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {readonly:'readonly'},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaNivel',
            sortname: 'id_nivel',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: true,               
            ondblClickRow: function(rowid) {
                jQuery(this).jqGrid('editGridRow', rowid, {
                    recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
                    bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,
                    afterSubmit: function(response) {
                    //console.log(response),
                        if (response.responseText == "1") {
                            return [false, "Error este nivel ya existe ingrese otro"];
                            $("#nivel").val("");
                            $("#nivel").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaNivel").jqGrid('navGrid', '#pgTablaNivel',
        {
            add: false,
            edit: true,
            del: false
        },
        {         
            recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
            bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,                 
            afterSubmit: function(response) {
            //console.log(response),
                if (response.responseText == "1") {
                    return [false, "Error este nivel ya existe ingrese otro"];
                    $("#nivel").val("");
                    $("#nivel").focus();
                }           
                if (response.responseText == "0") {  
                    Ext.Msg.alert('Advertencia!', 'Datos Modificados');                          
                    return true;
                }
            }
        },
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}
/////////////buscar modalidad//    
    function ventanaBuscarModalidad() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,           
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Modalidades', 
            html: '<table id="tablaModalidad" style="font-size:11px;"></table><div id="pgTablaModalidad"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaModalidad").jqGrid({
            url: '../servidor/modalidad/modalidad_xml.php',
            datatype: "xml",
            editurl: "../servidor/modalidad/modalidad.php",
            width: width,
            colNames: ['Código', 'Modalidad','Estado'],
            colModel: [
                {
                    name:'id_modalidad',index:'id_modalidad',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nombre_modalidad',index:'nombre_modalidad',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {readonly:'readonly'},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaModalidad',
            sortname: 'id_modalidad',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: true,               
            ondblClickRow: function(rowid) {
                jQuery(this).jqGrid('editGridRow', rowid, {
                    recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
                    bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,
                    afterSubmit: function(response) {
                    //console.log(response),
                        if (response.responseText == "1") {
                            return [false, "Error esta modalidad ya existe ingrese otro"];
                            $("#nombre_modalidad").val("");
                            $("#nombre_modalidad").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaModalidad").jqGrid('navGrid', '#pgTablaModalidad',
        {
            add: false,
            edit: true,
            del: false
        },
        {         
            recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
            bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,                 
            afterSubmit: function(response) {
            //console.log(response),
                if (response.responseText == "1") {
                    return [false, "Error esta modalidad ya existe ingrese otro"];
                    $("#nombre_modalidad").val("");
                    $("#nombre_modalidad").focus();
                }           
                if (response.responseText == "0") {  
                    Ext.Msg.alert('Advertencia!', 'Datos Modificados');                          
                    return true;
                }
            }
        },
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}
/////////////buscar seccion//    
    function ventanaBuscarSeccion() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,           
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de secciones', 
            html: '<table id="tablaSeccion" style="font-size:11px;"></table><div id="pgTablaSeccion"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaSeccion").jqGrid({
            url: '../servidor/seccion/seccion_xml.php',
            datatype: "xml",
            editurl: "../servidor/seccion/seccion.php",
            width: width,
            colNames: ['Código', 'Sección','Estado'],
            colModel: [
                {
                    name:'id_seccion',index:'id_seccion',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'nombre_seccion',index:'nombre_seccion',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {readonly:'readonly'},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaSeccion',
            sortname: 'id_seccion',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: true,               
            ondblClickRow: function(rowid) {
                jQuery(this).jqGrid('editGridRow', rowid, {
                    recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
                    bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,
                    afterSubmit: function(response) {
                    //console.log(response),
                        if (response.responseText == "1") {
                            return [false, "Error esta sección ya existe ingrese otra"];
                            $("#nombre_seccion").val("");
                            $("#nombre_seccion").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaSeccion").jqGrid('navGrid', '#pgTablaSeccion',
        {
            add: false,
            edit: true,
            del: false
        },
        {         
            recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
            bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,                 
            afterSubmit: function(response) {
            //console.log(response),
                if (response.responseText == "1") {
                    return [false, "Error esta sección ya existe ingrese otra"];
                    $("#nombre_seccion").val("");
                    $("#nombre_seccion").focus();
                }           
                if (response.responseText == "0") {  
                    Ext.Msg.alert('Advertencia!', 'Datos Modificados');                          
                    return true;
                }
            }
        },
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}

/////////////buscar carrera//    
    function ventanaBuscarCarrera() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,           
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de carreras', 
            html: '<table id="tablaCarrera" style="font-size:11px;"></table><div id="pgTablaCarrera"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 650,
            height: 280,
            closable: true,
            resizable: false,
            plain: true,
            border: false,
            modal: true,
            items: [formulario]
        });
        win.show();
    });   
    jQuery(function() {
        var width = 630;
        jQuery("#tablaCarrera").jqGrid({
            url: '../servidor/carrera/carrera_xml.php',
            datatype: "xml",
            editurl: "../servidor/carrera/carrera.php",
            width: width,
            colNames: ['Código', 'Carrera','Estado'],
            colModel: [
                {
                    name:'id_carrera',index:'id_carrera',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },
                {
                    name:'carrera',index:'carrera',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {readonly:'readonly'},
                },                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaCarrera',
            sortname: 'id_carrera',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: true,               
            ondblClickRow: function(rowid) {
                jQuery(this).jqGrid('editGridRow', rowid, {
                    recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
                    bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,
                    afterSubmit: function(response) {
                    //console.log(response),
                        if (response.responseText == "1") {
                            return [false, "Error esta carrera ya existe ingrese otra"];
                            $("#nombre_seccion").val("");
                            $("#nombre_seccion").focus();
                        }                        
                        if (response.responseText == "0") {
                            Ext.Msg.alert('Advertencia!', 'Datos Modificados');             
                            return true;
                        }
                    }
                });
            }
        });                 
        jQuery("#tablaCarrera").jqGrid('navGrid', '#pgTablaCarrera',
        {
            add: false,
            edit: true,
            del: false
        },
        {         
            recreateForm: true, closeAfterEdit: true,  reloadAfterSubmit: true, closeOnEscape: true,
            bottominfo: "Los campos marcados con (*) son obligatorios", width: 400, checkOnSubmit: false,                 
            afterSubmit: function(response) {
            //console.log(response),
                if (response.responseText == "1") {
                    return [false, "Error esta carrera ya existe ingrese otra"];
                    $("#nombre_seccion").val("");
                    $("#nombre_seccion").focus();
                }           
                if (response.responseText == "0") {  
                    Ext.Msg.alert('Advertencia!', 'Datos Modificados');                          
                    return true;
                }
            }
        },
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}
/*****busqueda ventana escuela******/
function ventanaBuscarEscuela() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Escuelas', 
            html: '<table id="tablaEscuelas" style="font-size:12px;"></table><div id="pgTablaEscuelas"></div>'
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 510,
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
    function enviarDatosEscuela(id) {
        var tabla = jQuery('#tablaEscuelas').jqGrid('getRowData', id);  

        jQuery("input[name='nomEscuela']").val(tabla.nombre_escuela);
        jQuery("input[name='accion']").val('edit');
        jQuery("input[name='idEscuela']").val(tabla.id_escuela);
        
        Ext.getCmp('idCarrera').setValue(parseInt(tabla.id_carrera));        
        Ext.WindowManager.getActive().close();

    }
    jQuery(function() {
        var width = 480;
        jQuery("#tablaEscuelas").jqGrid({
            url: '../servidor/escuela/escuela_xml.php',
            datatype: "xml",
            //editurl: "../servidor/formas_pago/formas_pago.php",
            width: width,
            colNames: ['Id Escuela','Escuela','Id Carrera','Carrera','Estado'],
            colModel: [
                {
                    name:'id_escuela',index:'id_escuela',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'nombre_escuela',index:'nombre_escuela',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'id_carrera',index:'id_carrera',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nom_carrera',index:'nom_carrera',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },              
                                                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaEscuelas',
            sortname: 'id_escuela',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosEscuela(rowid);                   
            }
        });      
        jQuery("#tablaEscuelas").jqGrid('hideCol', "id_escuela");
        jQuery("#tablaEscuelas").jqGrid('hideCol', "id_carrera");
         jQuery("#tablaEscuelas").jqGrid('navGrid', '#pgTablaEscuelas',           
        {
            add: false,
            edit: false,
            del: false
        },       

        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}
/*****busqueda ventana materia******/
function ventanaBuscarMateria() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Materias', 
            html: '<table id="tablaMateria" style="font-size:12px;"></table><div id="pgTablaMateria"></div>'
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
    function enviarDatosMateria(id) {
        var tabla = jQuery('#tablaMateria').jqGrid('getRowData', id);         
        jQuery("input[name='accion']").val('edit');
        jQuery("input[name='idMateria']").val(tabla.id_materia);
        jQuery("input[name='codMateria']").val(tabla.cod_materia);
        jQuery("input[name='nomMateria']").val(tabla.nombre_materia);
        jQuery("input[name='nroCreditos']").val(tabla.nro_creditos);        
        Ext.getCmp('idNivel').setValue(parseInt(tabla.idNiv));        
        if(parseInt(tabla.sec)==1){
            Ext.getCmp('estadoSecuencia').setValue('Si');        
        }else{
            Ext.getCmp('estadoSecuencia').setValue('No');    
        }
        
        var campo=Ext.getCmp('idMate');      
        if(parseInt(tabla.sec)==1){            
            campo.show();
            campo.focus(false, 200);         
            campo.setValue(parseInt(tabla.idMatSec));
        }    
        else{
            campo.hide();
        }
        Ext.WindowManager.getActive().close();

    }
    jQuery(function() {
        var width = 600;
        jQuery("#tablaMateria").jqGrid({
            url: '../servidor/materia/materia_xml.php',
            datatype: "xml",
            //editurl: "../servidor/formas_pago/formas_pago.php",
            width: width,
            colNames: ['Id Materia','Cod. Materia','Materia','Nro. Créditos','idNivel','Nivel','Sec','Secuencia','idMatSec','Materia Secuencia'],
            colModel: [
                {
                    name:'id_materia',index:'id_materia',editable:true,align:'center', search:false,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'cod_materia',index:'cod_materia',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'nombre_materia',index:'nombre_materia',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nro_creditos',index:'nro_creditos',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'idNiv',index:'idNiv',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nivel',index:'nivel',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'sec',index:'sec',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },      
                {
                    name:'secuencia',index:'secuencia',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'idMatSec',index:'idMatSec',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'materia_sec',index:'materia_sec',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },       
                                                              
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaMateria',
            sortname: 'materias.id_materia',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosMateria(rowid);                   
            }
        });      
        jQuery("#tablaMateria").jqGrid('hideCol', "id_materia");
        jQuery("#tablaMateria").jqGrid('hideCol', "idNiv");
        jQuery("#tablaMateria").jqGrid('hideCol', "sec");
        jQuery("#tablaMateria").jqGrid('hideCol', "idMatSec");
         jQuery("#tablaMateria").jqGrid('navGrid', '#pgTablaMateria',           
        {
            add: false,
            edit: false,
            del: false
        },       

        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}
/*****busqueda ventana docentes******/
function ventanaBuscarDocente() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Usuarios', 
            html: '<table id="tablaDocente" style="font-size:12px;"></table><div id="pgTablaDocente"></div>'
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
    function enviarDatosDocente(id) {
        var tabla = jQuery('#tablaDocente').jqGrid('getRowData', id);         
        jQuery("input[name='operIngresoDocente']").val('edit');
        jQuery("input[name='idIngresoDocente']").val(tabla.id_usuario);
        jQuery("input[name='nomDocentes']").val(tabla.nombres_usuario);
        jQuery("input[name='cedDocente']").val(tabla.ci_usuario);
        jQuery("input[name='emailDocente']").val(tabla.email_usuario);        
        jQuery("input[name='nomUsuarioDocente']").val(tabla.usuario);        
        jQuery("input[name='dirDocente']").val(tabla.direccion_usuario);                
        var campo=Ext.getCmp('cedDocente');      
        campo.setReadOnly(true);
        Ext.WindowManager.getActive().close();
    }
    jQuery(function() {
        var width = 600;
        jQuery("#tablaDocente").jqGrid({
            url: '../servidor/usuario/usuario_xml.php',
            datatype: "xml",            
            width: width,
            colNames: ['Id Usuario','Nombres Usuario','C.I.','Email','Tipo Usuario','Dirección','Usuario','Último acceso','Estado'],
            colModel: [
                {
                    name:'id_usuario',index:'id_usuario',editable:true,align:'center', search:true,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'nombres_usuario',index:'nombres_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ci_usuario',index:'ci_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'email_usuario',index:'email_usuario',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'tipo_usuario',index:'tipo_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                
                {
                    name:'direccion_usuario',index:'direccion_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'usuario',index:'usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'acceso',index:'acceso',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                                
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaDocente',
            sortname: 'id_usuario',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosDocente(rowid);                   
            }
        });      
        jQuery("#tablaDocente").jqGrid('hideCol', "id_usuario");        
        jQuery("#tablaDocente").jqGrid('navGrid', '#pgTablaDocente',           
        {
            add: false,
            edit: false,
            del: false
        },      
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}
/*****busqueda ventana docentes******/
function ventanaBuscarUsuario() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Usuarios General', 
            html: '<table id="tablaUsuario" style="font-size:12px;"></table><div id="pgTablaUsuario"></div>'
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
    function enviarDatosUsuario(id) {
        var tabla = jQuery('#tablaUsuario').jqGrid('getRowData', id);         
        jQuery("input[name='operIngresoUsuario']").val('edit');
        jQuery("input[name='idIngresoUsuario']").val(tabla.id_usuario);
        jQuery("input[name='nomCompletosUsuario']").val(tabla.nombres_usuario);
        jQuery("input[name='cedUsuario']").val(tabla.ci_usuario);
        jQuery("input[name='emailUsuario']").val(tabla.email_usuario);        
        jQuery("input[name='nomUsuario']").val(tabla.usuario);        
        jQuery("input[name='dirUsuario']").val(tabla.direccion_usuario);                
        var campo=Ext.getCmp('cedUsuario');      
        campo.setReadOnly(true);        
        Ext.getCmp('tipoUser').setValue(String(tabla.tipo_usuario));        
        
        Ext.WindowManager.getActive().close();
    }
    jQuery(function() {
        var width = 600;
        jQuery("#tablaUsuario").jqGrid({
            url: '../servidor/usuario/usuario_xmlT.php',
            datatype: "xml",            
            width: width,
            colNames: ['Id Usuario','Nombres Usuario','C.I.','Email','Tipo Usuario','Dirección','Usuario','Último acceso','Estado'],
            colModel: [
                {
                    name:'id_usuario',index:'id_usuario',editable:true,align:'center', search:true,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'nombres_usuario',index:'nombres_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ci_usuario',index:'ci_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'email_usuario',index:'email_usuario',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                 
                {
                    name:'tipo_usuario',index:'tipo_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                
                {
                    name:'direccion_usuario',index:'direccion_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'usuario',index:'usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'acceso',index:'acceso',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:false,frozen:true,formoptions: {elmsuffix: " (*)"},
                },                                                
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaUsuario',
            sortname: 'id_usuario',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosUsuario(rowid);                   
            }
        });      
        jQuery("#tablaUsuario").jqGrid('hideCol', "id_usuario");        
        jQuery("#tablaUsuario").jqGrid('navGrid', '#pgTablaUsuario',           
        {
            add: false,
            edit: false,
            del: false
        },      
        {},
        {}, // del options
        {
            zIndex: 29012
        } // search options
        );
    });
}

 
    


