Ext.define('WhatsFresh.store.Product', {
    extend: 'Ext.data.Store',
    config: {
    	model: 'WhatsFresh.model.Products',
    	autoLoad: {
            callback: function(records, operation, success) {
                var productStore = Ext.getStore('Product');
                var productIndex = productStore.data.length;
                productStore.insert( 0, [
                    {
                        name: "Please choose a product",
                        id: productIndex,
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
    	    }
    	}
    }
});
