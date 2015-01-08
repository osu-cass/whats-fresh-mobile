Ext.define('WhatsFresh.util.Messages', {

	singleton: true,

	showLocationError: function (cb) {
		Ext.Msg.alert(
			'Location Error', [
				'Unable to get location!<br><br>',
				'Check your device\'s privacy settings to see if ',
				'location is enabled for WorkingWaterfronts.'
			].join(''),
			cb || Ext.emptyFn);
	}

});