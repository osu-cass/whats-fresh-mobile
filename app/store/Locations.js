Ext.define('OregonsCatch.store.Locations', {
    extend: 'Ext.data.Store',
    requires: ['OregonsCatch.util.API'],
    config: {
    	model: 'OregonsCatch.model.Location',
    	autoLoad: false,
    	proxy: {
    	    type: 'ajax',
    	    url: OregonsCatch.util.API.url + '/1/locations',
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
