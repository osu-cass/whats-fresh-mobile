Ext.define('WhatsFresh.store.Product', {
    extend: 'Ext.data.Store',
    config: {
    	model: 'WhatsFresh.model.Products',
    	autoLoad: {
            callback: function(records, operation, success) {
                var productStore = Ext.getStore('Product');
                productStore.insert( 0, [
                    {
                        name: "Please choose a product",
                        is_not_filterable: true
                    }
                ]);
                productStore.fireEvent('refresh');
            }
        },
    	proxy: {
    	    type: 'ajax',
    	    url: 'http://seagrant-staging-api.osuosl.org/1/products',
    	    noCache: false,
            pageParam: false,
            limitParam: false,
            startParam: false,
    	    reader: {
        		type: 'json',
        		rootProperty: 'products'
    	    },
            timeout: 3000,
            listeners:{
                exception: function(proxy, response){
                    console.log("No internet access, we can't load the data");
                    WhatsFresh.util.Messages.showApiError();
                }
            }
    	}
    }
});
