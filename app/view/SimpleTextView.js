Ext.define('OregonsCatch.view.SimpleTextView', {
	extend: 'Ext.Panel',
	xtype: 'SimpleTextView',
	config: {
		layout: 'vbox',
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
		defaults: {
			maxWidth: '100%'
		},
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Info',
				itemId: 'Title',
				items: [
					{
						xtype: 'button',
						itemId: 'BackButton',
						ui: 'action',
						iconCls: 'arrow_left',
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						itemId: 'HomeButton',
						ui: 'action',
						iconCls: 'search'
					}
				]
			},
			{
				xtype: 'fieldset',
				items: [
					{
						xtype: 'label',
						itemId: 'Header',
						styleHtmlContent: true,
						style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
						tpl: '<strong>{header}</strong>',
					},
					{
						xtype: 'label',
						itemId: 'Text',
						styleHtmlContent: true,
						tpl: '{text}',
						data: { text: 'Loading...' }
					}
				]
			}
		]
	}
});
