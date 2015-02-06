Ext.define('WhatsFresh.view.Detail', {
	extend: 'Ext.Panel',
	requires: ['Ext.MessageBox', 'Ext.dataview.List'],
	alias: 'widget.detail',
	fullscreen: true,
	config: {
		layout: {
			type: 'fit'
		},
		items: [
			{
				xtype: 'toolbar',
				itemId: 'detailPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						// text: 'Home',
						iconCls: 'home',
						itemId: 'backHomeButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backListButton'
					}
				]
			},
			{
				xtype: 'fieldset',
				id: 'Details',
				scrollable: true,
				items: [					
					{
						itemId: 'infoBlock',
						id: 'InfoBlock',
						tpl: '</pre><div class="list-item-title">{name}</div><div class="list-item-description">{description}</div><div class="list-item-phone">Phone #: {phone}</div><div class="list-item-description">Representative: {contact_name}</div><div class="list-item-email">E-mail: {email}</div><div class="list-item-website">Website: {website}</div><div class="list-item-address">Address: {street} {city} {state} {zip}</div><div class="list-item-location_description">{location_description}</div><pre>'
					},
					{
						xtype: 'image',
						id: 'StaticMap',
						itemId: 'staticmap'
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
				id: 'DetailList',
				store: 'VendorInventory',
				itemId: 'Dpagelist',
				loadingText: 'Loading Notes ...',
				emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
				itemTpl: '</pre><tpl><div>{preparation} {name}</div></tpl><pre>'
			}
		],
		listeners: [
			{
				delegate: '#backListButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			},
			{
				delegate: '#staticmap',
				event: 'tap',
				fn: 'onNavigationTap'
			},
			{
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			},
			{
				delegate: '#Dpagelist',
				event: 'itemtap',
				fn: 'onDpagelistDisclose'
			}
		]
	},
	onBackButtonTap: function(){
		this.fireEvent('viewBackListCommand', this);
	},
	onBackHomeButtonTap: function(){
		this.fireEvent('viewBackHomeCommand', this);
	},
	onNavigationTap: function(index){
		this.fireEvent('navigationFunction', index.coords);
	},
	onDpagelistDisclose: function(list, record, target, index, evt, options){
		this.fireEvent('viewDpageListItemCommand', this, record, index);
	}
});
