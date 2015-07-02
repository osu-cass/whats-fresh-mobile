Ext.define('WhatsFresh.view.Home', {
	extend: 'Ext.Panel',
	require: ['Ext.field.Toggle', 'Ext.form.FieldSet', 'Ext.field.Select', 'Ext.fx.Animation', 'WhatsFresh.view.Map'],
	// fullscreen: true,
	xtype: 'Home',
	alias: 'widget.home',
	config: {
		scrollable: {
			direction: 'vertical'
		},
		items: [{
			xtype: 'toolbar',
			title: 'Oregon\'s Catch',
			itemId: 'homePageToolbar',
			docked: 'top'
		}, {
			xtype: 'fieldset',
			itemId: 'vendnum',
			tpl: '<div class="vendnum">{th}{numItems}{v}{i}{loc}{w}{prod}{end}</div>',
			items: [{
				xtype: 'fieldset',
				itemId: 'errorStatus',
				data: {
					error: 'The app has failed to populate this error message.'
				},
				tpl: '<div class="vendnum">Oh no! {error}</div>',
				hidden: true,
				hideAnimation: {
					type: 'slideOut',
					direction: 'up'
				},
				showAnimation: {
					type: 'slide',
					direction: 'down'
				}
			}]
		}, {
			xtype: 'fieldset',
			items: [{
				xtype: 'togglefield',
				name: 'userlocation',
				label: 'Use current locaton',
				labelWrap: true,
				itemId: 'userlocation'
			}, {
				xtype: 'selectfield',
				itemId: 'distance',
				label: 'Search within',
				labelWrap: true,
				displayField: 'distance',
				store: 'Distance'
					// valueField: 'id'
			}]
		}, {
			xtype: 'fieldset',
			items: [{
				xtype: 'selectfield',
				itemId: 'selectlocation',
				label: 'Location',
				labelWrap: true,
				displayField: 'name',
				store: 'Location',
				value: "Loading, please wait...",
				valueField: 'name'
			}]
		}, {
			xtype: 'fieldset',
			items: [{
				xtype: 'selectfield',
				itemId: 'selectproduct',
				label: 'Product',
				labelWrap: true,
				displayField: 'name',
				store: 'Product',
				value: "Loading, please wait...",
				valueField: 'name'
			}]
		}, {
			// Checkboxes for sorting data on list page
			xtype: 'fieldset',
			items: [{
				xtype: 'checkboxfield',
				label: 'Vendors',
				name: 'vendors',
				inputValue: '1',
				itemId: 'vendor'
			}, {
				xtype: 'checkboxfield',
				label: 'Products',
				name: 'products',
				inputValue: '2',
				itemId: 'product'
			}]
		}, {
			xtype: 'button',
			ui: 'action',
			text: 'Go',
			itemId: 'goButton'
		}],
		listeners: [{
			delegate: '#userlocation',
			event: 'change',
			fn: 'onUseLocation'
		}, {
			delegate: '#distance',
			event: 'change',
			fn: 'onDistance'
		}, {
			delegate: '#selectlocation',
			event: 'change',
			fn: 'onSelectLocation'
		}, {
			delegate: '#selectproduct',
			event: 'change',
			fn: 'onSelectProduct'
		}, {
			delegate: '#vendor',
			event: 'change',
			fn: 'onVendorSelect'
		}, {
			delegate: '#product',
			event: 'change',
			fn: 'onProductSelect'
		}, {
			delegate: '#goButton',
			event: 'tap',
			fn: 'onGoButtonTap'
		}]
	},
	onUseLocation: function (record, newVal, oldVal, eOpts) {
		this.fireEvent('setUseLocation', newVal);
	},
	onDistance: function (record) {
		this.fireEvent('setDistance', this, record);
	},
	onSelectLocation: function (record, index) {
		this.fireEvent('chosenLocation', this, record);
	},
	onSelectProduct: function (record) {
		this.fireEvent('chosenProduct', this, record);
	},
	onVendorSelect: function (record) {
		this.fireEvent('sortByVendorCommand', this, record);
	},
	onProductSelect: function (record) {
		this.fireEvent('sortByProductCommand', this, record);
	},
	onGoButtonTap: function (list, record, target, index, evt, options) {
		this.fireEvent('viewGoCommand');
	}
});
