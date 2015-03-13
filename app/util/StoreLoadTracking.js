Ext.define('WhatsFresh.util.StoreLoadTracking', {

	singleton: true,

	StoreLoadStatus: {},

    StoreLoadSuccess: function () { console.log('Unhandled store load success.'); },

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

	// Returns true if stores all called back
    areStoresDone: function () {
    	var util = this;
		for (var s in util.StoreLoadStatus) {
			if (!util.StoreLoadStatus[s].called) return false;
		}
		return true;
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
    		if (util.areStoresDone()) {
    			if (util.hasStoreLoadError()) util.StoreLoadError();
    			else util.StoreLoadSuccess();
    		}
    	});
	}

});
