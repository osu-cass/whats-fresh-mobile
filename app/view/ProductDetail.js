Ext.define('WhatsFresh.view.ProductDetail', {
	extend: 'Ext.Panel',
	requires: ['Ext.MessageBox', 'Ext.dataview.List'],
	alias: 'widget.productdetail',
	fullscreen: true,
	config: {
		layout: {
			type: 'fit' 
		}, 
		items: [
			{
				xtype: 'toolbar',
				// title: 'Detail Page',
				itemId: 'productdetailPageToolbar',
				tpl: '</pre><tpl>{preperation} {name}</tpl><pre>',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						text: 'Back',
						itemId: 'backListButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'Info',
						itemId: 'infoButton'
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
				xtype: 'panel',
				itemId: 'infoBlock',
				tpl: '</pre><div class="list-item-title">{preparation} {name}</div><div class="list-item-description">description:  {description}</div><pre>'
			},
			{
				xtype: 'button',
				ui: 'action',
				iconCls: 'info',
				itemId: 'infoButton'
			},			
			{
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				// We want this list to have only products of the vendor selected in
				// the list screen. Perhaps we will have to deal with the products root
				// of the vendor selected, and link the vendors products to the product store.
				xtype: 'list',
				store: 'VendorInventory',
				itemId: 'Dpagelist',
				loadingText: 'Loading Notes ...',
				emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
				itemTpl: '</pre><tpl><div>{name}</div></tpl><pre>'
			}
		],
		listeners: [
			{
				delegate: '#backListButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			},
			{
				delegate: '#infoButton',
				event: 'tap',
				fn: 'onInfoButtonTap'
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
		console.log('onBackButtonTap');
		this.fireEvent('viewBackListCommand', this);
	},
	onBackHomeButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackHomeCommand', this);
	},
	onInfoButtonTap: function(){
		console.log('onInfoButtonTap');
		this.fireEvent('viewInfoCommand', this);
	},
	onDpagelistDisclose: function(list, record, target, index, evt, options){
		console.log('viewDpageListItemCommand');
		this.fireEvent('viewDpageListItemCommand', this, record, index);
	}
});