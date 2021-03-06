Ext.define('OregonsCatch.view.VendorMapList', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.form.FieldSet',
		'Ext.TabPanel',
		'Ext.dataview.List',
		'Ext.MessageBox',
		'OregonsCatch.view.Map'
	],
    xtype: 'VendorMapListView',
	config: {
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				itemId: 'Title',
				title: 'Vendors',
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
				flex: 0.7,
				xtype: 'SeaGrantMap',
				itemId: 'Map'
			},
			{
				xtype: 'toolbar',
				title: 'Select a vendor:'
			},
			{
				flex: 0.3,
				xtype: 'list',
				itemId: 'List',
				loadingText: 'Loading...',
				emptyText: 'No matching vendors available.',
				deferEmptyText: false,
				itemTpl: '{name}',
				ui: 'normal',
				pinHeaders: false,
				onItemDisclosure: true
			}
		]
	}
});
