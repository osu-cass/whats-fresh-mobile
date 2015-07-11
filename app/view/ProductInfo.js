Ext.define('OregonsCatch.view.ProductInfo', {
	extend: 'Ext.Panel',
	requires: [],
    xtype: 'ProductInfoView',
	config: {
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Seafood',
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
				flex: 0.5,
				xtype: 'panel',
				itemId: 'Info',
				html: 'stuff goes here'
			},
			{
				xtype: 'label',
				html: 'These vendors sell this seafood:',
				styleHtmlContent: true
			},
			{
				flex: 0.5,
				xtype: 'list',
				itemId: 'List',
				loadingText: 'Loading...',
				emptyText: 'No vendors available.',
				itemTpl: '{name}',
				ui: 'normal',
				pinHeaders: false,
				onItemDisclosure: true
			}
		]
	}
});
