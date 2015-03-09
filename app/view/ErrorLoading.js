Ext.define('WhatsFresh.view.ErrorLoading', {
	extend		: 'Ext.Panel',
	xtype		: 'ErrorLoadingView',
	config		: {
		items	: [
			{
				xtype: 'toolbar',
				itemId: 'errorViewToolbar',
				docked: 'top',
				items: []
			},
			{
				xtype: 'label',
				itemId: 'errorInfoText',
				html:
					'<p style="text-align:center">' +
						'<br/>' +
						'<b>Connection Error</b>' +
						'<p style="text-align:center; padding:14px;">' +
							'There was a problem downloading information from the server.' +
						'</p>' +
						'<p style="text-align:center; padding:14px;">' +
							'Check that WiFi or cellular data are enabled and try again.' +
						'</p>' +
						'<p style="text-align:center; padding:14px;">' +
							'Attempting to connect...' +
						'</p>' +
						'<p style="text-align:center; padding:14px;">' +
							'<img alt="loading" src="resources/images/712.GIF" width=64 height=64 />' +
						'</p>' +
					'</p>'
			}
		]
	}
});