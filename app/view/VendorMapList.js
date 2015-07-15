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
				title: 'Vendors',
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
				flex: 0.7,
				xtype: 'SeaGrantMap',
				itemId: 'Map'
			},
			{
				xtype: 'label',
				style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
				html: 'Select which vendor to learn about:',
				styleHtmlContent: true
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
