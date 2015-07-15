Ext.application({
	name: 'OregonsCatch',

	requires: [
		'Ext.MessageBox',
		'OregonsCatch.util.API',
		'OregonsCatch.util.CrossFilter'
	],

	views: [
		'Home',
		'ProductMapList',
		'ProductInfo',
		'ProductEducation',
		'SimpleTextView',
		'SimpleImagesView',
		'SimpleVideosView',
		'VendorMapList',
		'VendorInfo'
	],

	controllers: [
		'Home',
		'ProductMapList',
		'ProductInfo',
		'ProductEducation',
		'SimpleTextView',
		'SimpleImagesView',
		'SimpleVideosView',
		'VendorMapList',
		'VendorInfo'
	],

	models: [
		'Location',
		'Product',
		'Story',
		'Vendor'
	],

	stores: [
		'Distances',
		'Locations',
		'Products',
		'Stories',
		'Vendors'
	],

	launch: function () {
		var app = this;

		setTimeout(function () {
			if (navigator.splashscreen) {
				navigator.splashscreen.hide();
			}
		}, 1000);

		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();

		// Initialize the main view
		Ext.Viewport.add(Ext.create('OregonsCatch.view.Home'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductMapList'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductInfo'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductEducation'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleTextView'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleImagesView'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleVideosView'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.VendorMapList'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.VendorInfo'));


		Ext.getStore('Locations').addListener('load', function () {
			Ext.getStore('Locations').insert(0, {
				is_not_filterable: true,
				name: 'Any city...',
				id: -999
			});
		});

		Ext.getStore('Products').addListener('load', function () {
			Ext.getStore('Products').insert(0, {
				is_not_filterable: true,
				name: 'Any type...',
				id: -999
			});
		});

		Ext.getStore('Locations').load();
		Ext.getStore('Products').load();
		Ext.getStore('Vendors').load();

		var CF = OregonsCatch.util.CrossFilter, i = 0;
		CF.delayed_constructor();

		var Products = Ext.getStore('Products');
		Products.addListener('load', function () {
			CF.filtered.products.removeAll();
			for (i = 0; i < Products.getAllCount(); i++) {
				if (!Products.getAt(i).get('is_not_filterable')) {
					CF.filtered.products.add(Products.getAt(i));
				}
			}
			console.log('Copied ' + CF.filtered.products.getAllCount() + ' products.');
		});

		var Vendors = Ext.getStore('Vendors');
		Vendors.addListener('load', function () {
			CF.filtered.vendors.removeAll();
			for (i = 0; i < Vendors.getAllCount(); i++) {
				CF.filtered.vendors.add(Vendors.getAt(i));
			}
			console.log('Copied ' + CF.filtered.vendors.getAllCount() + ' vendors.');
		});
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
