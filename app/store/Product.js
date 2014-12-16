Ext.define('SeaGrant_Proto.store.Product', {
    extend: 'Ext.data.Store',
    config: {
	model: 'SeaGrant_Proto.model.Products',
	autoLoad: {
            callback: function(records, operation, success) {
                var productStore = Ext.getStore('Product');
                productStore.insert( 0, [
                    {
                        name: "Please choose a product",
                    }
                ]);
                console.log("Product Store: autoload result records:");
                console.log(productStore.data);
                productStore.fireEvent('refresh');
            }
        },
	proxy: {
	    type: 'ajax',
	    url: 'http://seagrant-staging.osuosl.org/1/products',
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
