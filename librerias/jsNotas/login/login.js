var redirect = '../html/index.html';
Ext.onReady(function(){     
    Ext.QuickTips.init();     
            
    var login = new Ext.FormPanel({        
        bodyPadding: 5,    
        url:'../../servidor/login/login.php',         
        frame:true, 
        title:'Ingreso de Usuarios', 
        defaultType:'textfield',
        layout: 'anchor',         
        monitorValid:true,    
        items:[
        {
                xtype: 'image',
                src: '../../img/logosUniandes/logo.png',          
                width: '80%',
                style:'margin-left: 10%;margin-bottom:20px  ',
                height:90,
            },
            {                                
                fieldLabel:'Nombre de Usuario',                                 
                labelWidth: 170,  
                labelPad:2,    
                id:'id',            
                labelStyle:'background: url(../../img/iconos/user.ico) no-repeat left;padding-left: 40px;height:30px;font-weight:bold;margin-top: 0;line-height: 30px;',                
                minLength:3,
                anchor:"100% 16%",                
                name:'loginUser', 

                allowBlank:false,                
            },{ 
                fieldLabel:'Contraseña', 
                labelWidth: 170,                  
                labelStyle:'font-weight:bold;',
                labelPad:2,                
                labelStyle:'background: url(../../img/iconos/unlock.ico) no-repeat left;padding-left: 40px;height:30px;font-weight:bold;margin-top: 0;line-height: 30px;',                
                anchor:"100% 16%",
                name:'passUser', 
                inputType:'password', 
                allowBlank:false 
            }],
        buttons:[{            
            xtype: 'button', 
            text:'Ingresar al Sistema',
            width: 150,
            height: 30,   
            id: 'btnIngreso',
            style:'background: url(../../img/iconos/apply.ico) no-repeat;background-size: 23px;background-position: 0 50%;',                
            formBind: true,                              
            handler:function(){ 
                login.getForm().submit({ 
                    method:'POST', 
                    waitTitle:'Conectando', 
                    waitMsg:'Enviando Información...',    
                    success: function() {
                        var redirect = "../index.php";
                        window.location = redirect;
                    },        
                    failure:function(form, action){ 
                        if (action.failureType == 'server')
                        {
                            obj = Ext.decode(action.response.responseText);
                            Ext.Msg.alert('Intenta de nuevo!', obj.errors.reason);
                             Ext.getCmp('id').focus();
                        }
                        else
                        {
                            Ext.Msg.alert('Advertencia!', 'el servidor no contesta : ' + action.response.responseText);                                
                            Ext.getCmp('id').focus();
                        }
                        login.getForm().reset();
                    },                   
                }); 
            }            
        }] 
    });
    var win = new Ext.Window({
        layout:'fit',
        width:450,
        height:320,
        closable: false,
        resizable: false,
        plain: true,
        border: false,
        bbar: [{
            xtype: 'tbtext',
            text: ' ©    2014 - Uniandes'
        }],
        items: [login]
    });
    win.show();
});