Ext.define('OregonsCatch.view.SimpleImagesView', {
	extend: 'Ext.Panel',
	requires: ['Ext.Img'],
	xtype: 'SimpleImagesView',
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
				title: 'Images',
				itemId: 'Title',
				items: [
					{
						xtype: 'button',
						itemId: 'BackButton',
						ui: 'action',
						iconCls: 'arrow_left'
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
				itemId: 'ImagesPanel',
				items: []
			}
		]
	}
});
