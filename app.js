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
		'Vendor',
		'Preparation',
		'ProductPreparation'
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

		// Load the API into the millions of stores.

		OregonsCatch.util.CrossFilter.appStart();

		// Views must be manually instantiated.

		Ext.Viewport.add(Ext.create('OregonsCatch.view.Home'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductMapList'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductInfo'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleTextView'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleImagesView'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleVideosView'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.VendorMapList'));
		Ext.Viewport.add(Ext.create('OregonsCatch.view.VendorInfo'));

		// Android back button functionality.

		function onBackKeyDown (e) {
			e.preventDefault();
			if (OregonsCatch.util.Back.history.length) {
				OregonsCatch.util.Back.pop();
			} else {
				navigator.app.exitApp();
			}
		}

		if (Ext.os.is('Android')) {
			document.addEventListener('backButton', Ext.bind(onBackKeyDown, this), false);
		}


		// This is a hacky solution to the problem:
		// Cordova cannot handle inline hrefs to external pages.
		// This forces links to open with JS instead.
		Ext.Viewport.element.dom.addEventListener('click', function (e) {
			if (e.target.tagName.toLowerCase() !== 'a') { return; }
			var url = e.target.getAttribute('href');
			e.preventDefault();
			OregonsCatch.util.Link.openLink(url);
		}, false);

		// Finally, bring the user into the app.

		setTimeout(function () {
			if (navigator.splashscreen) {
				navigator.splashscreen.hide();
			}
		}, 1000);

		Ext.fly('appLoadingIndicator').destroy();
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
