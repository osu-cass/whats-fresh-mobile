Ext.define('OregonsCatch.store.Vendors', {
    extend: 'Ext.data.Store',
    config: {
		model: 'OregonsCatch.model.Vendor',
		autoLoad: false,
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
		    }
		}
    }
});
