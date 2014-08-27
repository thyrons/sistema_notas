Ext.define('MyDesktop.periodos', {
    extend: 'Ext.ux.desktop.Module',    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.tip.QuickTipManager',
        'Ext.toolbar.Paging',
        'Ext.form.*'
    ],
    ////ventana periodos////
    ventanaPeriodos: function(src) {
        var desktop = this.app.getDesktop();   
        var validaciones1 = Ext.create('extValidacion.validaciones');
        validaciones1.cargarValidaciones();        
        var items = [{ 
            layout: 'column',                                     
            items:[{
                columnWidth: .45,
                layout: 'form',                
                title:'Fecha Inicio',
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                    xtype: 'textfield',
                    name: 'operIngresoPeriodos',
                    id: 'operIngresoPeriodos',
                    hidden: true,
                    value: 'add'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'idIngresoPeriodos',
                    name: 'idIngresoPeriodos',
                    hidden: true
                },{
                	fieldLabel: 'Período',
                	name: 'periodoInicio',            
                	id: 'periodoInicio',            
	           	 	xtype: 'datefield',
                	format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false, 
                	width: 100,
                	value: new Date(),  
                },{
                	fieldLabel: 'Matrículas',
                	name: 'periodoMatriculaInicio',            
                	id: 'periodoMatriculaInicio',            
	           	 	xtype: 'datefield',
                	format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false, 
                	width: 100,
                	value: new Date(),  
                },{
                	fieldLabel: 'Inscripciones',
                	name: 'periodoInscripcionInicio',
                	id: 'periodoInscripcionInicio',            
	           	 	xtype: 'datefield',                	
          	    	format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false, 
                	width: 100,
                	value: new Date(),  
                }
                ]
            },{
                columnWidth: .55,
                layout: 'form',
                title:'Fecha Fin',                
                bodyStyle: '/*background:#DFE8F6*/; padding-left:20px; border:none;',
                items:[{
                   fieldLabel: 'Matrículas',
                	name: 'periodoMatriculaFin',            
                	id: 'periodoMatriculaFin',            
	           	 	xtype: 'datefield',
                	format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false, 
                	width: 100,
                	value: new Date(),  
                },{
                	fieldLabel: 'Período',
                	name: 'periodoFin',            
                	id: 'periodoFin',            
	           	 	xtype: 'datefield',
                	format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false, 
                	width: 100,
                	value: new Date(),  
                },{	fieldLabel: 'Inscripciones',
                	name: 'periodoInscripcionFin',
                	id: 'periodoInscripcionFin',            
	           	 	xtype: 'datefield',                	
          	    	format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false, 
                	width: 100,
                	value: new Date(),                  	
                }]
            }]                        
        }];   
        var boton=[            
        {
            text: 'Guardar',                
            formBind: true,               
            iconCls: 'add', 
            cls:'x-btn-blue',
            handler: function() {
            	if(Ext.getCmp('operIngresoPeriodos').getValue()=='add'){
            		Ext.Msg.confirm('Desea Guardar', 'Al momento de guardar un período nuevo todos los anterios periodos se finalizaran</br>    Desea continuar?', 
		       		function (btn){
			            if(btn==='yes'){
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
    	        	            	}
		                	        else
		                	        {
    		        	                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
        			                    formulario.getForm().reset();
        	    		            }
    	            	    	}
		                	});   
			            }
			            else{
		    	            return false;
		        	    }
		        	});   	
            	}else{
            		formulario.getForm().submit({
			            method: 'POST',
	    		        waitTitle: 'Conectando',
        	        	waitMsg: 'Enviando datos...',
               		    success: function() {                           
                			formulario.getForm().reset();
            	      	    Ext.Msg.alert('Mensaje', 'Datos Modificados correctamente');
		                },
    			        failure: function(form, action) {
	   			            if (action.failureType === 'server')
            		        {
                                obj = Ext.decode(action.response.responseText);
	           	                Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
    	          	            formulario.getForm().reset();
          	            	}
		                	else
		                    {
    		  	                Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
        			            formulario.getForm().reset();
        	    		    }
    	              	}
		           	}); 	
            	}		   		                     
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
                ventanaBuscarPeriodo();                    
            }
        },
        ];      
       var formulario = new Ext.FormPanel({                     
            url: '../servidor/periodos/periodos.php',
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,
            buttons: boton
        });        
        var win = desktop.getWindow('periodos' + src.windowId);
        if (!win) {
            var win = desktop.createWindow({
                id: 'periodos' + src.windowId,
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
    /////ventana distributivo////
    ventanaDistributivo: function(src) {
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
                url: '../servidor/general/cargaPeriodo.php'
            },
            listeners:{
                load: function(store, records, success) {                    
                    Ext.getCmp('periodoAcademico').setValue(store.getAt('0').get('id_per'));       
                }
            },        
        });   
        var items=[
            {
                name: 'operIngresoDistributivo',
                hidden: true,
                value: 'add'
            },
            {
                name: 'idIngresoDistributivo',
                hidden: true,                
            },
            {                                               
                xtype: 'combo',
                fieldLabel: 'Período Académico',
                labelWidth: 120,
                id: 'periodoAcademico',
                name: 'periodoAcademico',
                autoSelect: true,
                allowBlank: false,
                editable: true,
                triggerAction: 'all',
                typeAhead: true,
                anchor: '100%',
                enableKeyEvents: true,
                forceSelection: true,
                queryMode: 'local',
                store: store,
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
                			ventanaDistributivoMaterias();                			
                			//$("input[name='valor']").val(Ext.getCmp('periodoAcademico').getValue());                   			
                			Ext.getCmp('valor').setValue(Ext.getCmp('periodoAcademico').getValue());
                			Ext.getCmp('perAcedemico').setValue(Ext.getCmp('periodoAcademico').getRawValue());
		                },
    			        failure: function(form, action) {
	   			            if (action.failureType === 'server')
            		        {
                                obj = Ext.decode(action.response.responseText);
                                Ext.Msg.confirm('Deseas continuar?', obj.errors.reason, 
		       					function (btn){
			            			if(btn==='yes'){
										ventanaDistributivoMaterias();
                						//$("input[name='valor']").val('0');   
                						Ext.getCmp('valor').setValue('0');
                						Ext.getCmp('perAcedemico').setValue(Ext.getCmp('periodoAcademico').getRawValue());
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
            },           
        ];    

       var formulario = new Ext.FormPanel({                       
            url: '../servidor/general/revisaEstado.php',
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
/////////////////*********////////
function ventanaDistributivoMaterias() {
    ///////
    var contador=0;
    Ext.define("Post", {
        extend: 'Ext.data.Model',
        proxy: {
            type: 'jsonp',
            url : '../servidor/usuario/buscarDocente.php',
            reader: {
                type: 'json',
                root: 'topics',
                totalProperty: 'totalCount'
            }
        },

        fields: [
            {name: 'id', mapping: 'post_id'},
            {name: 'id_usuario', mapping: 'id_usuario'},
            {name: 'nombres_usuario', mapping: 'nombres_usuario'},
            {name: 'ci_usuario', mapping: 'ci_usuario'},
        ]
    });

    ds = Ext.create('Ext.data.Store', {
        pageSize: 10,
        model: 'Post'
    });
    /////////////
    Ext.define("Post1", {
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

    ds1 = Ext.create('Ext.data.Store', {
        pageSize: 10,
        model: 'Post1'
    });   
    /////////////
    Ext.define("Post2", {
        extend: 'Ext.data.Model',
        proxy: {
            type: 'jsonp',
            url : '../servidor/materia/buscarMateria.php',
            reader: {
                type: 'json',
                root: 'topics',
                totalProperty: 'totalCount'
            }
        },

        fields: [
            {name: 'id', mapping: 'post_id'},
            {name: 'id_materia', mapping: 'id_materia'},
            {name: 'nombre_materia', mapping: 'nombre_materia'},            
            {name: 'nro_creditos', mapping: 'nro_creditos'},   
        ]
    });

    ds2 = Ext.create('Ext.data.Store', {
        pageSize: 10,
        model: 'Post2'
    });
    ////////////
    Ext.define('ServiceList', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id_modalidad', type: 'int'},
            {name: 'nombre_modalidad', type: 'string'}
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
            url: '../servidor/general/cargaModalidad.php'
        }
    });  
    /////////
    Ext.define('ServiceList1', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id_seccion', type: 'int'},
            {name: 'nombre_seccion', type: 'string'}
        ]
    });
    var store1 = Ext.create('Ext.data.Store', {
        model: 'ServiceList1',
        autoLoad: true,
        proxy: {
            limitParam: undefined,
            startParam: undefined,
            paramName: undefined,
            pageParam: undefined,
            noCache: false,
            type: 'ajax',
            url: '../servidor/general/cargaSeccion.php'
        }
    });
    /////////
    Ext.define('ServiceList2', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id_nivel', type: 'int'},
            {name: 'nivel', type: 'string'}
        ]
    });
    var store2 = Ext.create('Ext.data.Store', {
        model: 'ServiceList2',
        autoLoad: true,
        proxy: {
            limitParam: undefined,
            startParam: undefined,
            paramName: undefined,
            pageParam: undefined,
            noCache: false,
            type: 'ajax',
            url: '../servidor/niveles/buscarNivel.php'
        }
    });
    /////////
    Ext.onReady(function() {
        Ext.QuickTips.init();

        var items=[
            {    
             	xtype: 'textfield',                                           
                id:'valor',                
                hidden: true,                  
            },
            {
                xtype: 'textfield',                                           
                name: 'accion',
                hidden: true,
                value: 'add'
            },
            {    
                xtype: 'textfield',                                           
                id:'estadoDistributivo',         
                name:'estadoDistributivo',                
                hidden: true,      
                value:'0',            
            },
            {    
                xtype: 'textfield',                                           
                id:'id_distributivo',         
                name:'id_distributivo',                
                hidden: true,      
                value:'0',            
            },
            {
           	 	fieldLabel: 'Período Académico ',
                labelWidth: 130,                    
                xtype: 'textfield',
                name: 'perAcedemico',
                id: 'perAcedemico',                    
                allowBlank:false,    
                anchor:"100% 8%",                       
                msgTarget: 'side',   
                readOnly:true,       
            },{
                id: 'idBuscarDocente',
                name: 'idBuscarDocente',
                xtype: 'textfield',
                hidden: true,           
            },{
            	layout: 'column', 
                title:'Datos del Distributivo',                                    
            	items:[{
	                columnWidth: 1,
	                layout: 'form',                    
	                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
	                items:[{                        
                        xtype: 'combo',
                        fieldLabel: 'Buscar Docente',
                        labelWidth: 100,
                        id: 'idDocente',
                        name: 'idDocente',
                        store: ds,
                        displayField: 'nombres_usuario',
                        valueField: 'id_usuario',
                        forceSelection: true,
                        enableKeyEvents:true,
                        typeAhead: false,
                        hideLabel: false,
                        hideTrigger:true,
                        allowBlank:true, 
                        minLength:4,
                        invalidText: 'Mínimo 4 caracteres para buscar',  
                        anchor: '100%',
                        listConfig: {
                            loadingText: 'Buscando...',
                            emptyText: 'No se encontraron resultados.',
                            // Custom rendering template for each item
                            getInnerTpl: function() {
                               return '<a class="search-item" onclick="limpiar_datos()">' +
                                '<h4 style=padding:0px;margin:5px 0 5px 0;><span>{nombres_usuario}</span> con Nro. de CI: {ci_usuario}</h4>' +
                                '</a>';   

                            }
                        },
                        listeners:{
                            'select': function(combo, rec) {
                                Ext.getCmp('idBuscarDocente').setValue(combo.value);
                            }
                        },
                        pageSize: 10,
                    },]
            	},{
	                columnWidth: .50,
	                layout: 'form',	                       
	                bodyStyle: '/*background:#DFE8F6*/; padding-left:5px; border:none;',
	                items:[
                    {
                        xtype: 'combo',
                        fieldLabel: 'Modalidad',
                        labelWidth: 100,
                        id: 'idModalidad',
                        name: 'idModalidad',
                        autoSelect: false,
                        allowBlank: true,
                        editable: true,
                        triggerAction: 'all',
                        typeAhead: true,
                        anchor: '100%',
                        enableKeyEvents: true,
                        queryMode: 'local',
                        store: store,
                        displayField: 'nombre_modalidad',
                        valueField: 'id_modalidad',
                        msgTarget: 'side'
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Sección',
                        labelWidth: 100,
                        id: 'idSeccion',
                        name: 'idSeccion',
                        autoSelect: false,
                        allowBlank: true,
                        editable: true,
                        triggerAction: 'all',
                        typeAhead: true,
                        anchor: '100%',
                        enableKeyEvents: true,
                        queryMode: 'local',
                        store: store1,
                        displayField: 'nombre_seccion',
                        valueField: 'id_seccion',
                        msgTarget: 'side'
                    },{                        
                        xtype: 'combo',
                        fieldLabel: 'Escuela',
                        labelWidth: 100,
                        id: 'idEscuela',
                        name: 'idEscuela',
                        store: ds1,
                        displayField: 'nombre_escuela',
                        valueField: 'id_escuela',
                        typeAhead: false,
                        hideLabel: false,
                        hideTrigger:true,
                        allowBlank:true, 
                        minLength:4,
                        invalidText: 'Mínimo 4 caracteres para buscar',  
                        anchor: '100%',
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
                    },]
            	},{
                    columnWidth: .49,
                    layout: 'form',                        
                    bodyStyle: '/*background:#DFE8F6*/; padding-left:15px; border:none;',
                    items:[
                    {
                        xtype: 'combo',
                        fieldLabel: 'Nivel',
                        labelWidth: 80,
                        id: 'idNivel',
                        name: 'idNivel',
                        autoSelect: false,
                        allowBlank: true,
                        editable: false,
                        triggerAction: 'all',
                        typeAhead: true,
                        anchor: '100%',
                        enableKeyEvents: true,
                        queryMode: 'local',
                        store: store2,
                        displayField: 'nivel',
                        valueField: 'id_nivel',
                        msgTarget: 'side'  
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Materias',
                        labelWidth: 80,
                        id: 'idMateria',
                        name: 'idMateria',
                        store: ds2,
                        displayField: 'nombre_materia',
                        valueField: 'id_materia',
                        typeAhead: false,
                        hideLabel: false,
                        hideTrigger:true,
                        allowBlank:true, 
                        enableKeyEvents: true,              
                        minLength:4,
                        invalidText: 'Mínimo 4 caracteres para buscar',  
                        anchor: '100%',
                        listeners: {
                            change: function (field, newValue, oldValue) {   
                                if(Ext.isEmpty(Ext.getCmp('idMateria').getValue())){
                                    Ext.getCmp("nroCreditos").setValue("");
                                }                                                          
                                if(!isNaN(Ext.getCmp('idMateria').getValue()) && !Ext.getCmp('idMateria').getValue()=="") {
                                    Ext.Ajax.request({
                                        url: '../servidor/general/nroCreditos.php',
                                        params: {
                                            codigo: Ext.getCmp('idMateria').getValue(),                                                                                        
                                        },
                                        success: function(response){                                                                                        
                                            resp = JSON.parse(response.responseText);
                                            Ext.getCmp("nroCreditos").setValue(resp["data"]);
                                        }
                                    });
                                }                                
                            },
                            scope: this
                        },
                        listConfig: {
                            loadingText: 'Buscando...',
                            emptyText: 'No se encontraron resultados.',
                            // Custom rendering template for each item
                            getInnerTpl: function() {
                               return '<a class="search-item">' +
                                '<h4 style=padding:0px;margin:5px 0 5px 0;><span>{nombre_materia}</span> - {nro_creditos} </h4>' +
                                '</a>';                             
                            }
                        },
                        pageSize: 10,
                    },{
                        xtype: 'textfield',
                        fieldLabel:'Nro. Créditos',                                                 
                        labelPad:2,           
                        labelWidth: 80,                  
                        minLength:3,                
                        name:'nroCreditos', 
                        id:'nroCreditos',                         
                        anchor:"100% 30%",   
                        vtype: 'soloNumero',
                        msgTarget: 'side', 
                        readOnly:true,       
                    },]
                },{
                    columnWidth: 1,
                    layout: 'form',                    
                    bodyStyle: '/*background:#DFE8F6*/; padding-left:0px; border:none;',
                    items:[
                    {
                        title : 'Distributivo del Docente',
                        region : 'north',
                        height : 220,
                        minSize : 75,
                        maxSize : 230,
                        overflowY: 'scroll',
                        cmargins : '0 0 5 0',
                        html: '<table id="tablaDistributivoDocente" style="font-size:11px;overflow-y: auto;" class="tablaDistributivoDocente"><thead><tr><th style="display: none">idMateria</th><th>Materia</th><th>Nro. Créditos</th><th style="display: none">idNivel</th><th>Nivel</th><th style="display: none">idEscuela</th><th>Escuela</th><th style="display: none">idSeccion</th><th>Sección</th><th style="display: none">idModalidad</th><th>Modalidad</th><th style="display: none">idDocene</th><th>Docente</th></tr></thead><tbody><tr></tr></tbody></table>'
                    },]   
                },]                       
            },];          
            
         var boton=[ 
            {
                text: 'Agregar Materia',
                iconCls: 'add', 
                cls:'x-btn-blue',
                handler: function() {
                    if(!Ext.getCmp('idDocente').getValue()!="" || !Ext.getCmp('idModalidad').getValue()!="" || !Ext.getCmp('idSeccion').getValue()!="" || !Ext.getCmp('idEscuela').getValue()!="" || !Ext.getCmp('idNivel').getValue()!="" || !Ext.getCmp("idMateria").getValue()!="" || !Ext.getCmp("idSeccion").getValue()!="" || !Ext.getCmp("idModalidad").getValue()!="" ){
                        Ext.Msg.alert('Mensaje', 'Error.. Llene todos los campos para poder agregar una materia');                        
                    }else{
                        Ext.Msg.alert('Mensaje','Datos Agregados Correctamente');
                        
                        var resp=repetidos(Ext.getCmp('idNivel').getValue(),Ext.getCmp('idMateria').getValue(),Ext.getCmp('idSeccion').getValue(),Ext.getCmp('idModalidad').getValue(),Ext.getCmp('idEscuela').getValue(),"tablaDistributivoDocente");
                        if(resp==1){
                            Ext.Msg.alert('Mensaje','Error.. Un docente no puede dar la misma materia en el mismo curso,modalidad,seccion,escuela. Seleccione otro');
                        }
                        else{
                            $("#tablaDistributivoDocente tbody").append( "<tr>" +
                            "<td align=center style='display: none'>" +Ext.getCmp('idMateria').getValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('idMateria').getRawValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('nroCreditos').getValue()+ "</td>" +
                            "<td align=center style='display: none'>" +Ext.getCmp('idNivel').getValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('idNivel').getRawValue()+ "</td>" +
                            "<td align=center style='display: none'>" +Ext.getCmp('idEscuela').getValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('idEscuela').getRawValue()+ "</td>" +
                            "<td align=center style='display: none'>" +Ext.getCmp('idSeccion').getValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('idSeccion').getRawValue()+ "</td>" +
                            "<td align=center style='display: none'>" +Ext.getCmp('idModalidad').getValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('idModalidad').getRawValue()+ "</td>" +
                            "<td align=center style='display: none'>" +Ext.getCmp('idBuscarDocente').getValue()+ "</td>" +
                            "<td align=center>" +Ext.getCmp('idDocente').getRawValue()+ "</td>" +
                            "<td align=center class='elimina'>" + "<img src='../images/delete.png' onclick='return fn_dar_eliminar(event)'/>"  + "</td>" + "</tr>" );
                            Ext.getCmp('idMateria').setValue('');
                            Ext.getCmp('idMateria').focus(false, 200);
                            Ext.getCmp('nroCreditos').setValue('');
                        }
                    }      
                }
            },           
            {
                text: 'Guardar', 
                id:'bntGuardarDistributivo',
                iconCls: 'go', 
                cls:'x-btn-blue',               
                formBind: true,
                handler: function() {
                    if(Ext.getCmp('valor').getValue()==0){
                        Ext.Msg.alert("Mensje","Error.. no se pueden guardar registros en períodos finalizados")
                    }
                    else{
                        var contador=num_registros("tablaDistributivoDocente");
                        if(contador==0){
                            Ext.Msg.alert("Mensje","Error.. para continuar llene la tabla")
                        }
                        else{
                            niv=datos_tabla("tablaDistributivoDocente",3);
                            mod=datos_tabla("tablaDistributivoDocente",9);
                            sec=datos_tabla("tablaDistributivoDocente",7);
                            esc=datos_tabla("tablaDistributivoDocente",5);
                            mat=datos_tabla("tablaDistributivoDocente",0);
                            idD=datos_tabla("tablaDistributivoDocente",11);
                            formulario.getForm().submit({
                                method: 'POST',
                                params: {
                                    nivel: niv.toString(),
                                    modalidad: mod.toString(),
                                    seccion: sec.toString(),
                                    escuela: esc.toString(),
                                    materia: mat.toString(),
                                    docentes: idD.toString(),
                                },
                                waitTitle: 'Conectando',
                                waitMsg: 'Enviando datos...',
                                success: function() {                           
                                    Ext.Msg.alert('Mensaje', 'Datos Guardados correctamente');
                                    limpiar_datos();
                                },
                                failure: function(form, action) {
                                    if (action.failureType === 'server')
                                    {
                                        obj = Ext.decode(action.response.responseText);
                                        Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                                        limpiar_datos();
                                    }
                                    else
                                    {
                                        Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                                           
                                        limpiar_datos();
                                    }
                                }
                            });
                        }  
                    }
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
                text: 'Nuevo',
                iconCls: 'new', 
                cls:'x-btn-blue',
                handler: function() {
                    limpiar_datos();
                }
            },  
            {
                text: 'Buscar',
                iconCls: 'search',               
                cls:'x-btn-blue',
                handler: function() {
                    Ext.getCmp('bntGuardarDistributivo').setText("Modificar");
                    Ext.getCmp('estadoDistributivo').setValue('1');
                    ventanaDistributivoDocentes();                    
                }
            },
           
        ];     
        var formulario = new Ext.FormPanel({
            url: '../servidor/distributivo/distributivo_materias.php',
            labelWidth: 80,
            frame: true,            
            //defaultType: 'textfield',
            monitorValid: true,
            items: items,            
            items: items,
            buttons: boton,            
            title:'Períodos Académicos',             
        });
        var win = new Ext.Window({
            layout: 'fit',
            width: 750,
            height: 500,
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
    jQuery(function() {
    })
} 

/*****busqueda ventana docentes******/
function ventanaBuscarPeriodo() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Períodos Académicos', 
            html: '<table id="tablaPeriodo" style="font-size:12px;"></table><div id="pgTablaPeriodo"></div>'
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
    function enviarDatosPeriodo(id) {
        var tabla = jQuery('#tablaPeriodo').jqGrid('getRowData', id);         
        jQuery("input[name='operIngresoPeriodos']").val('edit');
        jQuery("input[name='idIngresoPeriodos']").val(tabla.id_periodo);
        jQuery("input[name='periodoMatriculaInicio']").val(tabla.matriculas_inicio);
        jQuery("input[name='periodoInscripcionFin']").val(tabla.matriculas_fin);
        jQuery("input[name='periodoInscripcionInicio']").val(tabla.inscripcion_inicio);        
        jQuery("input[name='periodoInscripcionFin']").val(tabla.inscripcion_fin);                
        jQuery("input[name='periodoInicio']").val(tabla.periodo_inicio);        
        jQuery("input[name='periodoFin']").val(tabla.periodo_fin);                
        Ext.WindowManager.getActive().close();
    }
    jQuery(function() {
        var width = 600;
        jQuery("#tablaPeriodo").jqGrid({
            url: '../servidor/periodos/periodos_xml.php',
            datatype: "xml",            
            width: width,
            colNames: ['Id Periodo','Inicio Matrículas','Fin Matrículas','Inicio Inscripciones','Fin Inscripciones','Inicio Período Académico','Fin Período Académico','Estado'],
            colModel: [
                {
                    name:'id_periodo',index:'id_periodo',editable:true,align:'center', search:true,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'matriculas_inicio',index:'matriculas_inicio',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'matriculas_fin',index:'matriculas_fin',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'inscripcion_inicio',index:'inscripcion_inicio',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'inscripcion_fin',index:'inscripcion_fin',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'periodo_inicio',index:'periodo_inicio',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'periodo_fin',index:'periodo_fin',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'estado',index:'estado',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                                                             
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgTablaPeriodo',
            sortname: 'id_periodo',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosPeriodo(rowid);                   
            }
        });      
        jQuery("#tablaPeriodo").jqGrid('hideCol', "id_periodo");        
        jQuery("#tablaPeriodo").jqGrid('navGrid', '#pgTablaPeriodo',           
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
function ventanaDistributivoDocentes() {
    Ext.onReady(function() {
        Ext.QuickTips.init();
        var formulario = new Ext.FormPanel({
            labelWidth: 80,
            frame: true,
            defaultType: 'textfield',
            monitorValid: true,
            title:'Lista de Docentes en este Período', 
            html: '<table id="ventanaDistributivoDocentes" style="font-size:12px;"></table><div id="pgVentanaDistributivoDocentes"></div>'
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
    function enviarDatosDistributivoDocente(id) {
        var tabla = jQuery('#ventanaDistributivoDocentes').jqGrid('getRowData', id);         
        Ext.getCmp('idDocente').setReadOnly(true);
        Ext.getCmp('id_distributivo').setValue(tabla.id_distributivo)
         
        Ext.WindowManager.getActive().close();
        Ext.Ajax.request({
            url: '../servidor/general/cargaDistributivoDocente.php',
            params: {
                codigo: Ext.getCmp('periodoAcademico').getValue(),                                                                                        
                id: tabla.id_usuario,
            },
            success: function(response){                                                                                        
                resp = JSON.parse(response.responseText);
                limpiar_datos1();
                for (var i = 0; i < resp.data.length; i=i+13) {
                    Ext.getCmp('idBuscarDocente').setValue(resp.data[i+11]);
                    Ext.getCmp('idDocente').setRawValue(resp.data[i+12]);
                    
                    $("#tablaDistributivoDocente tbody").append( "<tr>" +
                    "<td align=center style='display: none'>" +parseInt(resp.data[i+0])+ "</td>" +
                    "<td align=center>" +resp.data[i+1]+ "</td>" +
                    "<td align=center>" +resp.data[i+2]+ "</td>" +
                    "<td align=center style='display: none'>" +resp.data[i+3]+ "</td>" +
                    "<td align=center>" +resp.data[i+4]+ "</td>" +
                    "<td align=center style='display: none'>" +resp.data[i+5]+ "</td>" +
                    "<td align=center>" +resp.data[i+6]+ "</td>" +
                    "<td align=center style='display: none'>" +resp.data[i+7]+ "</td>" +
                    "<td align=center>" +resp.data[i+8]+ "</td>" +
                    "<td align=center style='display: none'>" +resp.data[i+9]+ "</td>" +
                    "<td align=center>" +resp.data[i+10]+ "</td>" +
                    "<td align=center style='display: none'>" +resp.data[i+11]+ "</td>" +
                    "<td align=center>" +resp.data[i+12]+ "</td>" +
                    "<td align=center class='elimina'>" + "<img src='../images/delete.png' onclick='return fn_dar_eliminar(event)'/>"  + "</td>" + "</tr>" );
                }
            }
        });
    }
    jQuery(function() {
        var width = 600;
        jQuery("#ventanaDistributivoDocentes").jqGrid({
            url: '../servidor/distributivo/distributivo_docentes_xml.php?id='+Ext.getCmp('periodoAcademico').getValue(),
            datatype: "xml",            
            width: width,
            colNames: ['id_distributivo','id_matriculas','CI: Docente','Nombres Completos','Tipo Usuario','Inicio Período Académico','Fin Período Académico','id_periodo'],
            colModel: [
                {
                    name:'id_distributivo',index:'id_distributivo',editable:true,align:'center', search:true,frozen:true,editoptions: { readonly: 'readonly' },                    
                },                
                {
                    name:'id_usuario',index:'id_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                }, 
                {
                    name:'ci_usuario',index:'ci_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'nombres_usuario',index:'nombres_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'tipo_usuario',index:'tipo_usuario',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'periodo_inicio',index:'periodo_inicio',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'periodo_fin',index:'periodo_fin',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                {
                    name:'id_periodo',index:'id_periodo',editable:true,align:'center', search:true,frozen:true,formoptions: {elmsuffix: " (*)"},
                },
                                                             
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#pgVentanaDistributivoDocentes',
            sortname: 'id_distributivo',
            viewrecords: true,
            sortorder: "asc",            
            footerrow: false,
            userDataOnFooter: false,
            rownumbers: true,
            //altRows: true,
            shrinkToFit: false,               
            ondblClickRow: function(rowid) {               
                enviarDatosDistributivoDocente(rowid);                   
            }
        });      
        jQuery("#ventanaDistributivoDocentes").jqGrid('hideCol', "id_periodo");        
        jQuery("#ventanaDistributivoDocentes").jqGrid('hideCol', "id_usuario");        
        jQuery("#ventanaDistributivoDocentes").jqGrid('hideCol', "id_distributivo");        
        jQuery("#ventanaDistributivoDocentes").jqGrid('navGrid', '#pgVentanaDistributivoDocentes',           
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
    