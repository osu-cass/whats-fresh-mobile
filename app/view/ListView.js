Ext.define('WhatsFresh.view.ListView', {
	extend: 'Ext.Panel',
	requires: ['Ext.form.FieldSet', 'Ext.TabPanel', 'Ext.dataview.List', 'Ext.MessageBox', 'WhatsFresh.view.Map'],
    xtype: 'ListView',
	alias: 'widget.listview',
	config: {
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				itemId: 'listPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'arrow_left',
						itemId: 'HomeButton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'search',
						itemId: 'backHomeButton'
					},
				]
			},
			{
				flex: 0.7,
				xtype: 'SeaGrantMap',
				id: 'ListMap',
				itemId: 'listmap'
			},
			{
				flex: 0.3,
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				xtype: 'list',
				itemId: 'Lpagelist',
				id: 'ListPageList',
				ui			: 'normal',
				pinHeaders	: false,
				loadingText: 'Loading Notes ...',
				emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
				itemTpl: '</pre><div class="list-item-name">{preparation} {name}</div><pre>'
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
		WhatsFresh.previousListItem = null;
		this.fireEvent('viewBackHomeCommand', this);
	},
	onLpagelistHighlight: function(list, record, target, index, evt, options){
		WhatsFresh.currentListItem = index.data.id;
		// this way if a user has previously highlighted a list item, when they tap it again, they see its details
		if(WhatsFresh.currentListItem === WhatsFresh.previousListItem){
			this.fireEvent('viewLpageListItemCommand', this, record, index);
		}else{
			this.fireEvent('viewLpageListHighlightCommand', this, record, index);
			WhatsFresh.previousListItem = WhatsFresh.currentListItem;
		}
	},
	onLpagelistDisclose: function(list, record, target, index, evt, options){
		this.fireEvent('viewLpageListItemCommand', this, record, index);
	}
});
