Ext.define('WhatsFresh.view.Specific', {
	extend: 'Ext.form.Panel',
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
						iconCls: 'home',
						itemId: 'backHomeButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backInfoButton'
					}
				]
			},
			{	
				xtype: 'image',
				itemId: 'specimage'
			},
			{
				xtype: 'video',
				width: 400,
				height: 300,
				itemId: 'video1',
				posterUrl: 'http://msevents.microsoft.com/cui/resources/images/playbutton.png' 
			},
			{
				xtype: 'panel',
	        	itemId: 'caption',
	        	tpl: '</pre><div class="caption">{cap}</div><pre>'
			}			
		],
		listeners: [
			{
				delegate: '#backInfoButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			},
			{
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			}
		]
	},
	onBackButtonTap: function(){
		this.fireEvent('viewBackInfoCommand', this);
	},
	onBackHomeButtonTap: function(){
		this.fireEvent('viewBackHomeCommand', this);
	}
});