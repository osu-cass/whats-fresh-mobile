Ext.define('WhatsFresh.view.Specific', {
	extend: 'Ext.Panel',
    fullscreen: true,
    xtype: 'Specific',
	alias: 'widget.specific',
	config: {
		items: [
			{
				xtype: 'toolbar',
				itemId: 'specificPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						iconCls: 'arrow_left',
						itemId: 'backInfoButton'
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
				xtype: 'fieldset',
				id: 'SpecificField',
				scrollable: true,
				items: [
					{
						xtype: 'image',
						id: 'Specvideo',
						width: 400,
						height: 300,
						itemId: 'video1'
					},
					{
						xtype: 'panel',
						id: 'Speccaption',
			        	itemId: 'caption',
			        	tpl: '</pre><div class="caption">{cap}</div><pre>'
					}
				]
			}
		],
		listeners: [
			{
				delegate: '#backInfoButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			},
			{
				delegate: '#video1',
				event: 'tap',
				fn: 'onVideoTap'
			},
			{
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			}
		]
	},
	onVideoTap: function(){
		this.fireEvent('videoTapFunction', WhatsFresh.SVvideo.link);
	},
	onBackButtonTap: function(){
		this.fireEvent('viewBackInfoCommand', this);
	},
	onBackHomeButtonTap: function(){
		this.fireEvent('viewBackHomeCommand', this);
	}
});
