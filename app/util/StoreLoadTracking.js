Ext.define('WhatsFresh.util.StoreLoadTracking', {

	singleton: true,

	StoreLoadStatus: {},

    StoreLoadError: function () { console.error('Unhandled store load error.'); },

    // Returns true if stores all called back and at least one has an error.
    hasStoreLoadError: function () {
    	var util = this;
		var error = false;
		for (var s in util.StoreLoadStatus) {
			if (!util.StoreLoadStatus[s].called) return false;
			if (!util.StoreLoadStatus[s].loaded) error = true;
		}
		return error;
	},

	// Call this during launch.
    registerStore: function (name) {
    	var util = this;
		// Add to the list to track.
		util.StoreLoadStatus[name] = {
			called	: false,
			loaded	: false
		};
		Ext.getStore(name).on('beforeload', function (store, operation) {
			util.StoreLoadStatus[name].called = false;
		});
		// Attach load event handler.
		Ext.getStore(name).on('load', function (vThis, records, success) {
			util.StoreLoadStatus[name].called = true;
    		if (success) util.StoreLoadStatus[name].loaded = true;
    		else util.StoreLoadStatus[name].loaded = false;
    		if (util.hasStoreLoadError()) util.StoreLoadError();
    	});
	}

});
