Ext.define('OregonsCatch.controller.Home', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.MessageBox',
		'Ext.device.Geolocation'
		//'OregonsCatch.util.Link',
		//'OregonsCatch.util.Messages',
		//'OregonsCatch.util.Geography'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			SeafoodSelect		: 'HomeView #SeafoodSelect',
			BuyModeRadio		: 'HomeView #BuyModeRadio',
			LocationFieldSet	: 'HomeView #LocationFieldSet',
			LocationSelect		: 'HomeView #LocationSelect',
			LocationToggle		: 'HomeView #LocationToggle',
			LocationDistance	: 'HomeView #LocationDistance',
			SearchPrediction	: 'HomeView #SearchPrediction',
			SearchButton		: 'HomeView #SearchButton'
		},
		control: {
			SeafoodSelect: {
				change			: 'onAnySearchChange'
			},
			BuyModeRadio: {
				change			: 'onBuyModeToggle'
			},
			LocationSelect: {
				change			: 'onAnySearchChange'
			},
			LocationToggle: {
				change			: 'onLocationToggle'
			},
			LocationDistance: {
				change			: 'onAnySearchChange'
			},
			SearchButton: {
				tap				: 'onSearch'
			}
		}
	},

	launch: function () {
		var ctlr = this;
		Ext.getStore('Products').addListener('addrecords', function () {
			ctlr.getSeafoodSelect().setValue(-999);
		});
		Ext.getStore('Locations').addListener('addrecords', function () {
			ctlr.getLocationSelect().setValue(-999);
		});
		Ext.getStore('Vendors').addListener('refresh', function () {
			ctlr.onAnySearchChange();
		});
	},

	onBuyModeToggle: function (p1, checked, p3, p4) {
		var ctlr = this;
		var fields = ctlr.getLocationFieldSet();
		if (checked) fields.show(); else fields.hide();
		ctlr.onAnySearchChange();
	},

	onLocationToggle: function (p1, checked, p3, p4) {
		var ctlr = this;
		console.log('[onLocationToggle]: ' + checked);
		ctlr.onAnySearchChange();
	},

	onAnySearchChange: function (p1, checked, p3, p4) {
		var ctlr = this;

		var Vendors = Ext.getStore('Vendors');
		var totalVendors = Vendors.getCount();

		var Products = Ext.getStore('Products');
		var totalProducts = Products.getCount();

		var product, location, vendor, distance;

		function resetFilter () {
			product		= null;
			location	= null;
			vendor		= null;
			distance	= null;
		}

		resetFilter();

		// filterProducts()
		// filterVendors()





















		ctlr.getSearchPrediction().setHtml('There are ' + totalVendors + ' vendors.');

		console.log('[onAnySearchChange]');
	},

	onSearch: function () {
		var ctlr = this;
		console.log('[onSearch]');
	}

});
