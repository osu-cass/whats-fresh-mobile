Ext.define('SeaGrant_Proto.store.Location', {
    extend: 'Ext.data.Store',
    config: {
		model: 'SeaGrant_Proto.model.Locations',
		autoLoad: true,
		proxy: {
		    type: 'ajax',
		    url: 'http://seagrant-staging.osuosl.org/1/locations',
		    noCache: false,
	            pageParam: false,
	            limitParam: false,
	            startParam: false,
		    reader: {
				type: 'json',
				rootProperty: 'locations'
		    }
		},
		data: [
			{
				name: 'Please choose a location',
				id: 0
			}
		]
    }
});
