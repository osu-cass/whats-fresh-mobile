Ext.define('OregonsCatch.view.VendorInfo', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.Img'
	],
	xtype: 'VendorInfoView',
	config: {
		layout: 'vbox',
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Vendor',
			itemId: 'Title',
			items: [{
				xtype: 'button',
				itemId: 'BackButton',
				ui: 'action',
				iconCls: 'arrow_left'
			}, {
				xtype: 'spacer'
			}, {
				xtype: 'button',
				itemId: 'HomeButton',
				ui: 'action',
				iconCls: 'search'
			}]
		}, {
			flex: 0.6,
			xtype: 'panel',
			scrollable: true,
			items: [{
				xtype: 'fieldset',
				itemId: 'Description',
				styleHtmlContent: true,
				tpl: '{description}',
				data: {
					description: 'Loading...'
				}
			}, {
				xtype: 'fieldset',
				itemId: 'Contact',
				styleHtmlContent: true,
				tpl: '<div><strong>Contact</strong><span style="float:right">{contact_name}</span></div>' +
					'<tpl if="phone"><strong>Phone</strong><span style="float:right">{phone}</span></tpl>' +
					'<tpl if="email"><strong>Email</strong><span style="float:right">{email}</span></tpl>' +
					'<tpl if="website" style="text-align:center"><div><strong>Website</strong><span style="float:right"><a href="{website}">Open Website</a></span></div></tpl>' +
					'<tpl if="hours"><strong>Hours</strong><span style="float:right">{hours}</span></tpl>'
			}, {
				xtype: 'fieldset',
				itemId: 'LocationDescription',
				styleHtmlContent: true,
				tpl: '{location_description}',
				data: {
					description: 'Loading...'
				}
			},
			{
				xtype: 'fieldset',
				itemId: 'Navigation',
				items: [{
					xtype: 'label',
					itemId: 'Address',
					styleHtmlContent: true,
					style: {
						'text-align': 'center'
					},
					tpl: '{street}, {city}, {state}, {zip}'
				},
				{
					xtype: 'image',
					itemId: 'MapImage',
					styleHtmlContent: true,
					width: '200px',
					height: '200px',
					margin: '8px auto'
				}, {
					xtype: 'label',
					styleHtmlContent: true,
					style: {
						background: 'rgba(0,50,255,0.1)',
						'text-align': 'center'
					},
					html: 'Tap map to open in Maps.'
				}]
			}]
		}, {
			xtype: 'toolbar',
			title: 'This vendor sells:'
		}, {
			flex: 0.3,
			xtype: 'list',
			itemId: 'List',
			loadingText: 'Loading...',
			emptyText: 'No seafood available now.',
			deferEmptyText: false,
			itemTpl: '{preparation} {name}',
			ui: 'normal',
			pinHeaders: false,
			onItemDisclosure: true
		}]
	}
});
