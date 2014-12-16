Ext.define('SeaGrant_Proto.store.Location', {
    extend: 'Ext.data.Store',
    config: {
	model: 'SeaGrant_Proto.model.Locations',
	autoLoad: {
            callback: function(records, operation, success) {
                var locationStore = Ext.getStore('Location');
                var locationIndex = locationStore.data.length;
                locationStore.insert( 0, 
                    {
                        name: "Please choose a location",
                        location: locationIndex
                    }
                );
                //console.log("Location Store: autoload result records:");
                //console.log(locationStore.data);
                locationStore.fireEvent('refresh');
            }
        },
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
	}
    }
});
