Ext.define('SeaGrant_Proto.store.Product', {
    extend: 'Ext.data.Store',
    config: {
		model: 'SeaGrant_Proto.model.Products',
		autoLoad: true,
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
		},
		data: [
			{
				name: 'Please choose a product',
				id: 0
			}
		]
    }
});
