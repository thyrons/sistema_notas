Ext.define('MyDesktop.menuIngreso', {
    extend: 'MyDesktop.ingreso',
    init: function() {
        this.launcher = {
            text: 'Ingresos',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: [      
                    {
                        text: 'Niveles',
                        iconCls: 'bogus',
                        handler: function() {
                            return false;
                        },
                        menu: {
                            items: [
                                {
                                    text: 'Niveles',
                                    iconCls: 'bogus',
                                    handler: this.ventanaNiveles,
                                    scope: this,
                                    windowId: 1
                                },                                                                                        
                                {
                                    text: 'Modalidad',
                                    iconCls: 'bogus',
                                    handler: this.ventanaModalidad,
                                    scope: this,
                                    windowId: 2
                                },                                                                                                                         
                                {
                                    text: 'Sección',
                                    iconCls: 'bogus',
                                    handler: this.ventanaSeccion,
                                    scope: this,
                                    windowId: 3
                                },                                                                                                     
                            ]
                        }
                    },
                    {
                        text: 'Carreras',
                        iconCls: 'bogus',
                        handler: this.ventanaCarreras,
                        scope: this,
                        windowId: 6
                    },
                    {
                        text: 'Escuelas',
                        iconCls: 'bogus',
                        handler: this.ventanaEscuela,
                        scope: this,
                        windowId: 6
                    },
                    {
                        text: 'Materias',
                        iconCls: 'bogus',
                        handler: this.ventanaMaterias,
                        scope: this,
                        windowId: 7
                    },
                    {
                        text: 'Docentes',
                        iconCls: 'bogus',
                        handler: this.ventanaDocentes,
                        scope: this,
                        windowId: 8
                    },      
                    {
                        text: 'Usuarios',
                        iconCls: 'bogus',
                        handler: this.ventanaUsuarios,
                        scope: this,
                        windowId: 9
                    },  
                    {
                        text: 'Períodos Académicos',
                        iconCls: 'bogus',
                        handler: this.ventanaPeriodos,
                        scope: this,
                        windowId: 9
                    },                       
                ]
            }
        };
    }
});