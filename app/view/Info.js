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
						text: 'back',
						itemId: 'backDetailButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'specific',
						itemId: 'specificButton'
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
				xtype: 'image',
				id: 'InfoImage',
				itemId: 'infoimage'
				// src: '{im}'
				// src: 'http://michellesread.com/files/2013/04/smile.jpg'
				// src: 'https://images.search.yahoo.com/images/view;_ylt=AwrTcXHtp4BURvQAPEmJzbkF;_ylu=X3oDMTIyZXY4ZmNzBHNlYwNzcgRzbGsDaW1nBG9pZAM0Yjc2ZGMzMjgwYzhmZTY3NGQyMjA4ZjcwMzU1NTcwYQRncG9zAzcEaXQDYmluZw--?.origin=&back=https%3A%2F%2Fimages.search.yahoo.com%2Fyhs%2Fsearch%3F_adv_prop%3Dimage%26va%3Dsmile%26fr%3Dyhs-mozilla-001%26hsimp%3Dyhs-001%26hspart%3Dmozilla%26tab%3Dorganic%26ri%3D7&w=693&h=693&imgurl=www.technodabble.com%2Fcssimg%2Fsmile.jpg&rurl=http%3A%2F%2Fwww.technodabble.com%2Fcssimg%2F&size=170.1KB&name=img+alt+%3Cb%3Esmile%3C%2Fb%3E+src+%3Cb%3Esmile%3C%2Fb%3E+jpg&p=smile&oid=4b76dc3280c8fe674d2208f70355570a&fr2=&fr=yhs-mozilla-001&tt=img+alt+%3Cb%3Esmile%3C%2Fb%3E+src+%3Cb%3Esmile%3C%2Fb%3E+jpg&b=0&ni=21&no=7&ts=&tab=organic&sigr=113d9msfq&sigb=144360p2c&sigi=115a15n4g&sigt=119pja3gl&sign=119pja3gl&.crumb=tfiwMKLaaGq&fr=yhs-mozilla-001&hsimp=yhs-001&hspart=mozilla'			
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
				delegate: '#specificButton',
				event: 'tap',
				fn: 'onSpecificButtonTap'
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
		console.log('onBackButtonTap');
		this.fireEvent('viewBackDetailCommand', this);
	},
	onBackHomeButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackHomeCommand', this);
	},
	onSpecificButtonTap: function(){
		console.log('onSpecificButtonTap');
		this.fireEvent('viewSpecificCommand', this);
	},
	onIpagelistDisclose: function(list, record, taget, index, evt, option){
		console.log('viewIpageListItemCommand');
		this.fireEvent('viewIpageListItemCommand', this, record, index);
	}
});