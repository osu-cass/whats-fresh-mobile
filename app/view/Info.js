Ext.define('WhatsFresh.view.Info', {
	extend: 'Ext.Panel',
	requires: ['Ext.form.FieldSet', 'Ext.TabPanel', 'Ext.dataview.List', 'Ext.MessageBox'],
    fullscreen: true,
    xtype: 'Info',
	alias: 'widget.info',
	config: {
		layout: {
			type: 'fit'
		},
		items: [
			{
				xtype: 'toolbar',
				title: 'Info Page',
				itemId: 'infoPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backDetailButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'specific',
						itemId: 'specificButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						// text: 'Home',
						iconCls: 'home',
						itemId: 'backHomeButton'
					}
				]
			},
			{
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				xtype: 'list',
				store: 'Education',
				itemId: 'Ipagelist',
				loadingText: 'Loading Notes ...',
				emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
				itemTpl: '</pre><div class="list-item-listItem">{listItem}</div><pre>'
			}			
		],
		listeners: [
			{
				delegate: '#backDetailButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			},
			{
				delegate: '#specificButton',
				event: 'tap',
				fn: 'onSpecificButtonTap'
			},
			{
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			},
			{
				delegate: '#Ipagelist',
				event: 'itemtap',
				fn: 'onIpagelistDisclose'
			}
		]
	},
	onBackButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackDetailCommand', this);
	},
	onBackHomeButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackHomeCommand', this);
	},
	onSpecificButtonTap: function(){
		console.log('onSpecificButtonTap');
		this.fireEvent('viewSpecificCommand', this);
	},
	onIpagelistDisclose: function(list, record, taget, index, evt, option){
		console.log('viewIpageListItemCommand');
		this.fireEvent('viewIpageListItemCommand', this, record, index);
	}
});