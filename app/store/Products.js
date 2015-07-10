Ext.define('OregonsCatch.store.Products', {
    extend: 'Ext.data.Store',
    config: {
    	model: 'OregonsCatch.model.Product',
    	autoLoad: false,
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
