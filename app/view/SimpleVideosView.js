Ext.define('OregonsCatch.view.SimpleVideosView', {
	extend: 'Ext.Panel',
	requires: ['Ext.Img'],
	xtype: 'SimpleVideosView',
	config: {
		layout: 'vbox',
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Videos',
				itemId: 'Title',
				items: [
					{
						xtype: 'button',
						itemId: 'BackButton',
						ui: 'action',
						iconCls: 'arrow_left',
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						itemId: 'HomeButton',
						ui: 'action',
						iconCls: 'search'
					}
				]
			},
			{
				xtype: 'panel',
				itemId: 'VideosPanel',
				items: []
			}
		]
	}
});
