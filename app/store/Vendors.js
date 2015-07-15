Ext.define('OregonsCatch.store.Vendors', {
    extend: 'Ext.data.Store',
    requires: ['OregonsCatch.util.API'],
    config: {
		model: 'OregonsCatch.model.Vendor',
		autoLoad: false,
		proxy: {
		    type: 'ajax',
		    url: OregonsCatch.util.API.url + '/1/vendors',
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
