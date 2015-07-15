Ext.define('OregonsCatch.view.ProductEducation', {
	extend: 'Ext.Panel',
	xtype: 'ProductEducationView',
	config: {
		layout: 'vbox',
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
		defaults: {
			maxWidth: '100%'
		},
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Education',
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
				defaults: {
					margin: '8px',
					ui: 'normal'
				},
				items: [
					{
						xtype: 'button',
						itemId: 'FactsButton',
						text: 'Facts'
					},
					{
						xtype: 'button',
						itemId: 'HistoryButton',
						text: 'History'
					},
					{
						xtype: 'button',
						itemId: 'SeasonButton',
						text: 'Season'
					},
					{
						xtype: 'button',
						itemId: 'PackagingButton',
						text: 'Product Packaging'
					},
					{
						xtype: 'button',
						itemId: 'BuyTipsButton',
						text: 'Buying Tips'
					},
					{
						xtype: 'button',
						itemId: 'PreparationButton',
						text: 'Preparation'
					},
					{
						xtype: 'button',
						itemId: 'ImagesButton',
						text: 'Images'
					},
					{
						xtype: 'button',
						itemId: 'VideosButton',
						text: 'Videos'
					}
				]
			}
		]
	}
});
