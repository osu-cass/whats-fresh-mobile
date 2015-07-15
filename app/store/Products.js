Ext.define('OregonsCatch.store.Products', {
    extend: 'Ext.data.Store',
    requires: ['OregonsCatch.util.API'],
    config: {
    	model: 'OregonsCatch.model.Product',
    	autoLoad: false,
    	proxy: {
    	    type: 'ajax',
    	    url: OregonsCatch.util.API.url + '/1/products',
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
