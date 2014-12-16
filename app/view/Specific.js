Ext.define('WhatsFresh.view.Specific', {
	extend: 'Ext.form.Panel',
    fullscreen: true,
    xtype: 'Specific',
	alias: 'widget.specific',
	config: {
		items: [
			{
				xtype: 'toolbar',
				// title: 'Specific Page',
				itemId: 'specificPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backInfoButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						// text: 'Home',
						iconCls: 'home',
						itemId: 'backHomeButton'
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
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackHomeButtonTap'
			}
		]
	},
	onBackButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackInfoCommand', this);
	},
	onBackHomeButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackHomeCommand', this);
	}
});