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
				// title: 'Detail Page',
				itemId: 'detailPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
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
				tpl: '</pre><div class="list-item-title">{name}</div><div class="list-item-description">{description}</div><div class="list-item-phone">Phone #: {phone}</div><div class="list-item-description">Representative: {contact_name}</div><div class="list-item-email">E-mail: {email}</div><div class="list-item-website">Website: {website}</div><pre>'
			},
			{
				xtype: 'image',
				itemId: 'staticmap',
				// src: 'http://maps.googleapis.com/maps/api/staticmap?center=44.632442,-124.057761&zoom=14&size=200x200'
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