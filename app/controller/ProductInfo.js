Ext.define('OregonsCatch.controller.ProductInfo', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.API',
		'OregonsCatch.util.Back',
		'OregonsCatch.util.CrossFilter',
		'Ext.MessageBox'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			ProductMapListView	: 'ProductMapListView',
			EducationView		: 'ProductEducationView',
			VendorInfo			: 'VendorInfoView',
			ProductInfoView		: 'ProductInfoView',
			ProductInfoTitle	: 'ProductInfoView #Title',
			ProductInfoVendor	: 'ProductInfoView #VendorTitle',
			Image				: 'ProductInfoView #Image',
			Description			: 'ProductInfoView #Description',
			Details				: 'ProductInfoView #Details',
			ProductInfoList		: 'ProductInfoView #List',
			EducationButton		: 'ProductInfoView #EducationButton'
		},
		control: {
			'ProductInfoView #BackButton': { tap: 'onBack' },
			'ProductInfoView #HomeButton': { tap: 'onHome' },
			EducationButton		: { tap: 'onOpenEducation' },
			ProductInfoList		: { disclose: 'onDisclose' }
		}
	},

	launch: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getProductInfoList().setStore(CF.filtered.vendors);
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); },

	load: function (product) {
		var ctlr = this;

		var CF = OregonsCatch.util.CrossFilter;
		CF.parameters.product = product;
		CF.parameters.vendor = null;
		CF.parameters.location = null;
		CF.parameters.position = null;
		CF.parameters.allprod = false;

		CF.refilter();

		// title
		ctlr.getProductInfoTitle().setTitle(product.get('name'));

		// top half
		if (product.get('image')) {
			ctlr.getImage().show();
			ctlr.getImage().setSrc(OregonsCatch.util.API.url + product.get('image').link);
		} else {
			ctlr.getImage().hide();
		}
		ctlr.getDescription().setData(product.data);
		ctlr.getDetails().setData(product.data);

		// bottom half
		ctlr.getProductInfoVendor().setData(product.data);

		ctlr._product = product;
	},

	onDisclose: function (p1, vendor) {
		var ctlr = this;
		ctlr.getProductInfoList().select(vendor);
		OregonsCatch.util.Back.push(ctlr, ctlr._product);
		ctlr.getApplication().getController('VendorInfo').load(vendor);
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getVendorInfo(), transition);
	},

	onOpenEducation: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		var url = OregonsCatch.util.API.url;
		var Stories = Ext.getStore('Stories');

		var proxy = Stories.getProxy();
		Stories.setProxy({
			type: 'ajax',
			url: url + '/1/stories/' + ctlr._product.get('story'),
			reader: { type: 'json' }
		});
		Stories.load(function (p1, p2, success) {
			if (success) {
				OregonsCatch.util.Back.push(ctlr, ctlr._product);
				var story = Stories.getAt(0);
				ctlr.getApplication().getController('ProductEducation').load(story);
				// View Change
				var transition = {
					type		: 'slide',
					direction	: 'left'
				};
				Ext.Viewport.animateActiveItem(ctlr.getEducationView(), transition);
			} else {
				Ext.Msg.alert(ctlr._product.get('name'), 'No educational information is available at this time.');
			}
		});
	}

});
