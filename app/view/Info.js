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
				title: 'Info',
				itemId: 'infoPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button', 
						ui: 'action',
						iconCls: 'home',
						itemId: 'backHomeButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backDetailButton'
					}
				]
			},
			{	
				xtype: 'image',
				id: 'InfoImage',
				itemId: 'infoimage'
			},
			{
				xtype: 'panel',
	        	itemId: 'history',
	        	tpl: '</pre><div class="history">{hist}</div><pre>'
			},		
			{
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				xtype: 'list',
				id: 'InfoList',
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
		this.fireEvent('viewBackDetailCommand', this);
	},
	onBackHomeButtonTap: function(){
		this.fireEvent('viewBackHomeCommand', this);
	},
	onIpagelistDisclose: function(list, record, taget, index, evt, option){
		this.fireEvent('viewIpageListItemCommand', this, record, index);
	}
});