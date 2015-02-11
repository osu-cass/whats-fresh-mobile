Ext.define('WhatsFresh.util.Messages', {

	singleton: true,

    requires : ['Ext.MessageBox'],

	showLocationError: function (cb) {
		Ext.Msg.alert(
			'Location Error', [
				'Unable to get location!<br><br>',
				'Check your device\'s privacy settings to see if ',
				'location services are enabled.'
			].join(''),
			cb || Ext.emptyFn);
	}

});
