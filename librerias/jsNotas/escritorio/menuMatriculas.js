Ext.define('MyDesktop.menuMatriculas', {
    extend: 'MyDesktop.matriculas',
    init: function() {
        this.launcher = {
            text: 'Incripciones y Matrículas',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: [      
                    {                                           
                        text: 'Inscripciones',
                        iconCls: 'bogus',
                        handler: this.ventanaPeriodos1,
                        scope: this,
                        windowId: 1,
                    }, 
                    {                                           
                        text: 'Matriculas',
                        iconCls: 'bogus',
                        handler: this.ventanaPeriodos2,
                        scope: this,
                        windowId: 2,
                    },                    
                ]
            }
        };
    }
});