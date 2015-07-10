Ext.define('OregonsCatch.store.Locations', {
    extend: 'Ext.data.Store',
    config: {
    	model: 'OregonsCatch.model.Location',
    	autoLoad: false,
    	proxy: {
    	    type: 'ajax',
    	    url: 'http://seagrant-staging-api.osuosl.org/1/locations',
    	    noCache: false,
            pageParam: false,
            limitParam: false,
            startParam: false,
    	    reader: {
        		type: 'json',
        		rootProperty: 'locations'
    	    }
    	}
    }
});
