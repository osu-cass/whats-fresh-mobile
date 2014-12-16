Ext.define('WhatsFresh.view.ListView', {
	extend: 'Ext.Panel',
	requires: ['Ext.form.FieldSet', 'Ext.TabPanel', 'Ext.dataview.List', 'Ext.MessageBox', 'WhatsFresh.view.Map'],
    xtype: 'ListView',
	alias: 'widget.listview',
	config: {
		layout: 'fit',
		items: [
			{
				xtype: 'toolbar',
				title: 'List Page',
				itemId: 'listPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action', 
						text: 'back',
						itemId: 'HomeButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'Detail',
						itemId: 'detailButton'
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
				xtype: 'SeaGrantMap',
				itemId: 'listmap'
			},					
			{
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				// I assumed that the commented out lines would make my list dynamic, but they are not doing what I expected
				xtype: 'list',
				itemId: 'Lpagelist',
				// store: 'Vendor',
				// store: WhatsFresh.tplStore,
				loadingText: 'Loading Notes ...',
				emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
				itemTpl: '</pre><div class="list-item-name">{preparation} {name}</div><pre>'
				// itemTpl: '</pre><div class="list-item-name">'WhatsFresh.writer'</div><pre>'
			}
		],
		listeners: [
			{
				delegate: '#HomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			},
			{
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			},
			{
				delegate: '#detailButton',
				event: 'tap',
				fn: 'onDetailButtonTap'
			},
			{
				delegate: '#Lpagelist',
				event: 'itemsingletap',
				fn: 'onLpagelistHighlight'
			},
			{
				delegate: '#Lpagelist',
				event: 'itemdoubletap',
				fn: 'onLpagelistDisclose'
			}
		]
	},
	onBackHomeButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackHomeCommand', this);
	},
	onDetailButtonTap: function(){
		console.log('onDetailButtonTap');
		this.fireEvent('viewDetailCommand', this);
	},
	onLpagelistHighlight: function(list, record, target, index, evt, options){
		console.log('viewLpageListHighlightCommand');
		this.fireEvent('viewLpageListHighlightCommand', this, record, index);
	},
	onLpagelistDisclose: function(list, record, target, index, evt, options){
		console.log('viewLpageListItemCommand');
		this.fireEvent('viewLpageListItemCommand', this, record, index);
	}
});