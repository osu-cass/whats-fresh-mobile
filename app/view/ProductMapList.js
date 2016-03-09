Ext.define('OregonsCatch.view.ProductMapList', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.form.FieldSet',
		'Ext.TabPanel',
		'Ext.dataview.List',
		'Ext.MessageBox',
		'OregonsCatch.view.Map'
	],
    xtype: 'ProductMapListView',
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
				flex: 0.5,
				xtype: 'SeaGrantMap',
				itemId: 'Map'
			},
			{
				xtype: 'toolbar',
				title: 'Select a seafood:'
			},
			{
				flex: 0.5,
				xtype: 'list',
				itemId: 'List',
				loadingText: 'Loading...',
				emptyText: 'No seafood available.',
				deferEmptyText: false,
				itemTpl: '{preparation} {name}',
				ui: 'normal',
				pinHeaders: false,
				onItemDisclosure: true
			}
		]
	}
});
