Ext.define('WhatsFresh.store.Vendor', {
    extend: 'Ext.data.Store',
    config: {
		model: 'WhatsFresh.model.Vendors',
		autoLoad: true,
		proxy: {
		    type: 'ajax',
		    url: 'http://seagrant-staging-api.osuosl.org/1/vendors',
		    noCache: false,
	        pageParam: false,
	        limitParam: false,
	        startParam: false,

		    reader: {
				type: 'json',
				rootProperty: 'vendors'
		    },
		    timeout: 3000,
            listeners:{
            	error: 	function(jqXHR, textStatus, errorthrown){
            		alert(textStatus, '\n' + errorthrown);
            	},
                exception: function(proxy, response){
                    console.log("No internet access, we can't load the data");
                    WhatsFresh.util.Messages.showApiError();
                }
            }            
		}
    }
});
