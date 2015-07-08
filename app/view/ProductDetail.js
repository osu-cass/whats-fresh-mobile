Ext.define('WhatsFresh.view.ProductDetail', {
	extend: 'Ext.Panel',
	requires: ['Ext.MessageBox', 'Ext.dataview.List'],
	alias: 'widget.productdetail',
	fullscreen: true,
	config: {
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				itemId: 'productdetailPageToolbar',
				tpl: '</pre><tpl>{preperation} {name}</tpl><pre>',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'arrow_left',
						itemId: 'backListButton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'search',
						itemId: 'backHomeButton'
					}
				]
			},
			{
				flex: 0.6,
				xtype: 'fieldset',
				id: 'ProductDetails',
				scrollable: true,
				items: [
					{
						xtype: 'panel',
						id: 'ProductNameBlock',
						itemId: 'productNameBlock',
						tpl: '</pre><div class="list-item-title">{preparation} {name}</div>'
					},
					{
						xtype: 'image',
						id: 'ProductDetailImage',
						itemId: 'productDetailImage'
					},
					{
						xtype: 'panel',
						id: 'ProductInfoBlock',
						itemId: 'productInfoBlock',
						tpl: '</pre><div class="list-item-description">Description:  {description}</div><div class="list-item-varity">Variety: {variety}</div><div class="list-item-season">Season: {season}</div><pre>'
					},
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'info',
						id: 'InfoButton',
						itemId: 'infoButton'
					}
				]
			},
			{
				flex: 0.4,
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				xtype: 'list',
				id: 'ProductDetailList',
				store: 'VendorInventory',
				itemId: 'Dpagelist',
				ui			: 'normal',
				pinHeaders	: false,
				loadingText: 'Loading vendors...',
				emptyText: '</pre><div class="notes-list-empty-text">No vendors found.</div><pre>',
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
		this.fireEvent('viewBackListCommand', this);
	},
	onBackHomeButtonTap: function(){
		this.fireEvent('viewBackHomeCommand', this);
	},
	onInfoButtonTap: function(){
		this.fireEvent('viewInfoCommand', this);
	},
	onDpagelistDisclose: function(list, record, target, index, evt, options){
		this.fireEvent('viewDpageListItemCommand', this, record, index);
	}
});
