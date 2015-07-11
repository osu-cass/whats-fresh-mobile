Ext.define('OregonsCatch.controller.Home', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.MessageBox',
		'Ext.device.Geolocation',
		'OregonsCatch.util.CrossFilter'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			SeafoodSelect		: 'HomeView #SeafoodSelect',
			BuyModeRadio		: 'HomeView #BuyModeRadio',
			LocationFieldSet	: 'HomeView #LocationFieldSet',
			LocationError		: 'HomeView #LocationError',
			LocationSelect		: 'HomeView #LocationSelect',
			LocationToggle		: 'HomeView #LocationToggle',
			LocationDistance	: 'HomeView #LocationDistance',
			SearchPrediction	: 'HomeView #SearchPrediction',
			SearchButton		: 'HomeView #SearchButton',
			ProductMapListView	: 'ProductMapListView',
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
		Ext.getStore('Vendors').addListener('load', function () {
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
		var calledBack = false;
		if (checked) {
			Ext.device.Geolocation.getCurrentPosition({
				success: function (position) {
					OregonsCatch.util.CrossFilter.parameters.position = position;
					ctlr.getLocationSelect().setValue(-999);
					ctlr.getLocationError().hide();
					ctlr.onAnySearchChange();
					calledBack = true;
				},
				failure: function (PositionError) {
					console.log("PositionError: " + PositionError);
					ctlr.getLocationToggle().setValue(0);
					ctlr.getLocationError().show();
					calledBack = true;
				}
			});

			setTimeout(function () {
				if (!OregonsCatch.util.CrossFilter.parameters.position && !calledBack) {
					console.error("Geo never called back.");
					ctlr.getLocationToggle().setValue(0);
					ctlr.getLocationError().show();
				}
			}, 6000);

		} else {
			// toggle off == stop geolocation and clear position
			OregonsCatch.util.CrossFilter.parameters.position = null;
			ctlr.onAnySearchChange();
		}
	},

	onAnySearchChange: function (p1, checked, p3, p4) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		// Update the UI.
		if (CF.parameters.position) {
			ctlr.getLocationSelect().disable();
			ctlr.getLocationDistance().enable();
		} else {
			ctlr.getLocationSelect().enable();
			ctlr.getLocationDistance().disable();
		}
		// Update the filters.
		if (ctlr.getBuyModeRadio().getChecked()) {
			CF.parameters.allprod	= false;
			CF.parameters.product	= ctlr.getSeafoodSelect().getRecord();
			CF.parameters.vendor	= null;
			CF.parameters.distance	= ctlr.getLocationDistance().getRecord();
			CF.parameters.location	= ctlr.getLocationSelect().getRecord();
			//CF.parameters.position = null;
		} else {
			CF.parameters.allprod	= true;
			CF.parameters.product	= ctlr.getSeafoodSelect().getRecord();
			CF.parameters.vendor	= null;
			CF.parameters.distance	= null;
			CF.parameters.location	= null;
			//CF.parameters.position = null;
		}
		CF.refilter();
		ctlr.getSearchPrediction().setHtml(CF.toString());
	},

	onSearch: function () {
		var ctlr = this;
		console.log('[onSearch]');
		if (ctlr.getBuyModeRadio().getChecked()) {
		} else {
			ctlr.getApplication().getController('ProductMapList').load();
		}
	}

});
