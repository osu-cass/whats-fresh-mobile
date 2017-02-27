Ext.define('OregonsCatch.view.ProductInfo', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.Img'
	],
	xtype: 'ProductInfoView',
	config: {
		layout: 'vbox',
		scrollable: {
			vertical: true
		},
		items: [{
			xtype: 'toolbar',
			docked: 'top',
			title: 'Seafood',
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
			xtype: 'image',
			itemId: 'Image',
			id: 'ProductImage',
			maxWidth: '100%',
			minHeight: '240px',
			margin: '8px',
			styleHtmlContent: true
		}, {
			xtype: 'fieldset',
			itemId: 'Details',
			styleHtmlContent: true,
			tpl: '<tpl if="origin"><div><strong>Origin</strong><span style="float:right">{origin}</span></div></tpl>' +
				'<tpl if="alt_name"><div><strong>Other Name(s)</strong><span style="float:right">{alt_name}</span></div></tpl>' +
				'<tpl if="variety"><div><strong>Variety</strong><span style="float:right">{variety}</span></div></tpl>' +
				'<tpl if="season"><div><strong>Season</strong><span style="float:right">{season}</span></div></tpl>' +
				'<tpl if="market_price"><div><strong>Market Price</strong><span style="float:right">{market_price}</span></div></tpl>',
			data: {
				variety: 'Loading...'
			}
		}, {
			xtype: 'fieldset',
			itemId: 'Description',
			styleHtmlContent: true,
			tpl: '{description}',
			data: {
				description: 'Loading...'
			}
		}, {
			xtype: 'panel',
			itemId: 'Story',
			hidden: true,
			showAnimation: {
				type: 'fadeIn'
			},
			hideAnimation: {
				type: 'fadeOut'
			},
			items: [{
				xtype: 'fieldset',
				itemId: 'Facts',
				styleHtmlContent: true,
				tpl: '{facts}'
			}, {
				xtype: 'fieldset',
				itemId: 'Management',
				styleHtmlContent: true,
				tpl: '{season}'
			}, {
				xtype: 'fieldset',
				itemId: 'History',
				styleHtmlContent: true,
				tpl: '{history}'
			}, {
				xtype: 'fieldset',
				itemId: 'Buying',
				styleHtmlContent: true,
				tpl: '{buying}'
			}, {
				xtype: 'fieldset',
				itemId: 'Preparing',
				styleHtmlContent: true,
				tpl: '{preparing}'
			}, {
				xtype: 'fieldset',
				itemId: 'Products',
				styleHtmlContent: true,
				tpl: '{products}'
			}, {
				xtype: 'fieldset',
				itemId: 'ImagesButtonField',
				items: [{
					xtype: 'button',
					itemId: 'ImagesButton',
					html: 'Images'
				}]
			}, {
				xtype: 'fieldset',
				itemId: 'VideosButtonField',
				items: [{
					xtype: 'button',
					itemId: 'VideosButton',
					html: 'Videos'
				}]
			}]
		}, {
			xtype: 'fieldset',
			items: [{
				xtype: 'button',
				itemId: 'BuyButton',
				html: 'Where to Buy'
			}]
		}]
	}
});
