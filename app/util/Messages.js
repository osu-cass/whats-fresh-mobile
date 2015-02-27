Ext.define('WhatsFresh.util.Messages', {

	singleton: true,

    requires : ['Ext.MessageBox'],

	showLocationError: function (cb) {

		var util = this;

		Ext.Msg.alert(
			'Location Error',
			util.locationErrorText,
			cb || Ext.emptyFn);
	},

	locationErrorText : [
		'We couldn\'t find you!',
		'<br />',
		'Please check your location settings and try again.'
	].join(''),
	
	showApiError: function (cb) {
		Ext.Msg.alert(
			'Data Error', [
				'Unable to fetch data!<br><br>',
				'Check your device\'s internet settings ',
				'and restart the app.'
			].join(''),
			cb || Ext.emptyFn);
	}

});
