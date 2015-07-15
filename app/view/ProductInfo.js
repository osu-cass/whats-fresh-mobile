Ext.define('OregonsCatch.view.ProductInfo', {
	extend: 'Ext.Panel',
	requires: ['Ext.Img'],
    xtype: 'ProductInfoView',
	config: {
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Seafood',
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
				flex: 0.6,
				xtype: 'panel',
				itemId: 'Info',
				scrollable: true,
				items: [
					{
						xtype: 'image',
						itemId: 'Image',
						maxWidth: '100%',
						height: '240px',
						margin: '8px',
						styleHtmlContent: true
					},
					{
						xtype: 'fieldset',
						itemId: 'Description',
						styleHtmlContent: true,
						tpl: '<strong>Description</strong><p>{description}</p><p>Scroll down for more information.</p>',
						data: { description: 'Loading...' }
					},
					{
						xtype: 'fieldset',
						itemId: 'Details',
						styleHtmlContent: true,
						tpl:	'<div><strong>Other Name(s)</strong><span style="float:right">{alt_name}</span></div>' +
								'<div><strong>Variety</strong><span style="float:right">{variety}</span></div>' +
								'<div><strong>Season</strong><span style="float:right">{season}</span></div>',
						data: { variety: 'Loading...' }
					},
					{
						xtype: 'fieldset',
						items: [
							{
								xtype: 'button',
								itemId: 'EducationButton',
								html: 'Read More'
							}
						]
					}
				]
			},
			{
				xtype: 'label',
				itemId: 'VendorTitle',
				style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
				tpl: 'These vendors sell {name}:',
				data: { name: 'this seafood' },
				styleHtmlContent: true
			},
			{
				flex: 0.3,
				xtype: 'list',
				itemId: 'List',
				loadingText: 'Loading...',
				emptyText: 'No matching vendors available.',
				deferEmptyText: false,
				itemTpl: '{name}',
				ui: 'normal',
				pinHeaders: false,
				onItemDisclosure: true
			}
		]
	}
});
