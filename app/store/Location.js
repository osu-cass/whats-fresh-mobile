Ext.define('WhatsFresh.store.Location', {
    extend: 'Ext.data.Store',
    config: {
    	model: 'WhatsFresh.model.Locations',
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
