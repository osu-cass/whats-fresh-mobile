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
						style: { background: 'rgba(0,50,255,0.1)' },
						html: 'Select a type of seafood, if any.',
						styleHtmlContent: true
					},
					{
						xtype: 'selectfield',
						itemId: 'SeafoodSelect',
						label: 'Seafood Type',
						store: 'Products',
						displayField: 'name',
						valueField: 'id'
					}
				]
			},
			{
				xtype: 'fieldset',
				defaults: { labelWidth: '40%' },
				items: [
					{
						xtype: 'label',
						style: { background: 'rgba(0,50,255,0.1)' },
						html: 'Select a purpose for your search.',
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
						label: 'Buy It'
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
						style: { background: 'rgba(0,50,255,0.1)' },
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
						valueField: 'value'
					}
				]
			},
			{
				xtype: 'fieldset',
				items: [
					{
						xtype: 'label',
						itemId: 'SearchPrediction',
						style: { background: 'rgba(0,50,255,0.1)' },
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
