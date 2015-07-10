/*
	This file is generated and updated by Sencha Cmd. You can edit this file as
	needed for your application, but these edits will have to be merged by
	Sencha Cmd when it performs code generation tasks such as generating new
	models, controllers or views and when running "sencha app upgrade".

	Ideally changes to this file would be limited and most work would be done
	in other places (such as Controllers). If Sencha Cmd cannot merge your
	changes and its generated code, it will produce a "merge conflict" that you
	will need to resolve manually.
*/

Ext.application({
	name: 'OregonsCatch',

	requires: [
		'Ext.MessageBox'
	],

	views: [
		'Home'
	],

	controllers: [
		'Home'
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

	icon: {
		'57': 'resources/icons/Icon.png',
		'72': 'resources/icons/Icon~ipad.png',
		'114': 'resources/icons/Icon@2x.png',
		'144': 'resources/icons/Icon~ipad@2x.png'
	},

	isIconPrecomposed: true,

	startupImage: {
		'320x460': 'resources/startup/320x460.jpg',
		'640x920': 'resources/startup/640x920.png',
		'768x1004': 'resources/startup/768x1004.png',
		'748x1024': 'resources/startup/748x1024.png',
		'1536x2008': 'resources/startup/1536x2008.png',
		'1496x2048': 'resources/startup/1496x2048.png'
	},

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
