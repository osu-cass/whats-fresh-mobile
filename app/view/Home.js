Ext.define('OregonsCatch.view.Home', {
	extend: 'Ext.Panel',
	requires: [
		'Ext.form.FieldSet',
		'Ext.Label',
		'Ext.field.Radio',
		'Ext.field.Select',
		'Ext.field.Toggle'
	],
	xtype: 'HomeView',
	config: {
		scrollable: { direction: 'vertical' },
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Oregon\'s Catch'
			},
			{
				xtype: 'fieldset',
				defaults: { labelWidth: '40%' },
				items: [
					{
						xtype: 'label',
						style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
						html: 'Select a type of seafood.',
						styleHtmlContent: true
					},
					{
						xtype: 'selectfield',
						itemId: 'SeafoodSelect',
						label: 'Seafood Type',
						store: 'Products',
						displayField: 'name',
						valueField: 'id'
					},
					{
						xtype: 'selectfield',
						itemId: 'PreparationSelect',
						label: 'Preparation',
						hidden: true,
						showAnimation: { type: 'fadeIn' },
						hideAnimation: { type: 'fadeOut' },
						displayField: 'name',
						valueField: 'id'
					}
				]
			},
			{
				xtype: 'fieldset',
				defaults: { labelWidth: '50%' },
				items: [
					{
						xtype: 'label',
						style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
						html: 'Search Options',
						styleHtmlContent: true
					},
					{
						xtype: 'radiofield',
						name: 'buymode',
						value: 'learn',
						label: 'Learn More',
						checked: true
					},
					{
						xtype: 'radiofield',
						itemId: 'BuyModeRadio',
						name: 'buymode',
						value: 'buy',
						label: 'Where to Buy'
					}
				]
			},
			{
				xtype: 'fieldset',
				itemId: 'LocationFieldSet',
				hidden: true,
				showAnimation: { type: 'fadeIn' },
				hideAnimation: { type: 'fadeOut' },
				defaults: { labelWidth: '40%' },
				items: [
					{
						xtype: 'label',
						style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
						html: 'Select a location to limit your search.',
						styleHtmlContent: true
					},
					{
						xtype: 'selectfield',
						itemId: 'LocationSelect',
						label: 'City',
						store: 'Locations',
						displayField: 'name',
						valueField: 'id'
					},
					{
						xtype: 'label',
						itemId: 'LocationError',
						hidden: true,
						style: { background: 'rgba(255,50,0,0.2)', 'text-align': 'center' },
						html: '<strong>Unable to locate you!</strong>',
						styleHtmlContent: true
					},
					{
						xtype: 'togglefield',
						itemId: 'LocationToggle',
						label: 'Use my current location?',
						labelWrap: true
					},
					{
						xtype: 'selectfield',
						itemId: 'LocationDistance',
						label: 'Search Range',
						labelWrap: true,
						store: 'Distances',
						displayField: 'distance',
						valueField: 'value',
						disabled: true
					}
				]
			},
			{
				xtype: 'fieldset',
				items: [
					{
						xtype: 'label',
						itemId: 'SearchPrediction',
						hidden: true,
						showAnimation: { type: 'fadeIn' },
						hideAnimation: { type: 'fadeOut' },
						style: { background: 'rgba(0,50,255,0.1)', 'text-align': 'center' },
						html: 'Predicting search results...',
						styleHtmlContent: true
					},
					{
						xtype: 'button',
						itemId: 'SearchButton',
						ui: 'action',
						text: 'Search',
						style: { height: '3em' }
					}
				]
			}
		]
	}
});
