Ext.define('MyDesktop.menuPeriodo', {
    extend: 'MyDesktop.periodos',
    init: function() {
        this.launcher = {
            text: 'Períodos Académicos',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: [      
                    {                                           
                        text: 'Períodos Académicos',
                        iconCls: 'bogus',
                        handler: this.ventanaPeriodos,
                        scope: this,
                        windowId: 1,
                    }, 
                    {                                           
                        text: 'Distributivo Académico',
                        iconCls: 'bogus',
                        handler: this.ventanaDistributivo,
                        scope: this,
                        windowId: 2,
                    },                    
                ]
            }
        };
    }
});