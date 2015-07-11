Ext.define('OregonsCatch.controller.ProductInfo', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.Back',
		'OregonsCatch.util.CrossFilter'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			ProductMapListView	: 'ProductMapListView',
			ProductInfoView		: 'ProductInfoView',
			ProductInfoList		: 'ProductInfoView #List',
			BackButton			: 'ProductInfoView #BackButton',
			HomeButton			: 'ProductInfoView #HomeButton'
		},
		control: {
			BackButton: { tap	: 'onBack' },
			HomeButton: { tap	: 'onHome' }
		}
	},

	launch: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getProductInfoList().setStore(CF.filtered.vendors);
	},

	load: function (product) {
		var ctlr = this;
		OregonsCatch.util.Back.push();
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getProductInfoView(), transition);

		var CF = OregonsCatch.util.CrossFilter;
		CF.parameters.product = product;
		CF.parameters.vendor = null;
		CF.parameters.location = null;
		CF.parameters.position = null;
		CF.refilter();

		// set title
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); }

});
