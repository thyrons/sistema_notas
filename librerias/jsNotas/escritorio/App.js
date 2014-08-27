/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',  
        'MyDesktop.Notepad',
        'MyDesktop.Settings',   
        'MyDesktop.menuIngreso',   
        'MyDesktop.menuPeriodo',   
        'MyDesktop.menuMatriculas',   
        
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [           
            //new MyDesktop.Blockalanche(),            
            new MyDesktop.Notepad(),
            new MyDesktop.menuIngreso(),
            new MyDesktop.menuPeriodo(),
            new MyDesktop.menuMatriculas(),
            
            
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Cambiar configuración', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [                   
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },                   
                    
                ]
            }),

            wallpaper: 'wallpapers/desk.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();
        var nombreUsuario = nombreCompleto();
        return Ext.apply(ret, {
            title: nombreUsuario,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 130,
                items: [
                    {
                        text:'Configuraciones',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Salir Sistema',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    },
                    '-',
                    {
                        text:'Cambiar Clave',
                        iconCls:'clave',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                //{ name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                //{ name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Salir', 'Esta seguro de querer salir', 
        function (btn){
            if(btn==='yes'){
                location.href='../index.html';
            }
            else{
                return false;
            }
        });        

    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
