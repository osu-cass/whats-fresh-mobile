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
			VendorMapList		: 'VendorMapListView',
			VendorMapListTitle	: 'VendorMapListView #Title',
			ProductInfoView		: 'ProductInfoView',
			ProductInfoTitle	: 'ProductInfoView #Title',
			Image				: 'ProductInfoView #Image',
			Description			: 'ProductInfoView #Description',
			Details				: 'ProductInfoView #Details',
			Story				: 'ProductInfoView #Story',
			Facts				: 'ProductInfoView #Facts',
			Products			: 'ProductInfoView #Products',
			Preparing			: 'ProductInfoView #Preparing',
			Buying				: 'ProductInfoView #Buying',
			History				: 'ProductInfoView #History',
			BuyButton			: 'ProductInfoView #BuyButton',
			ImagesButton		: 'ProductInfoView #ImagesButton',
			VideosButton		: 'ProductInfoView #VideosButton',
			SimpleImagesView	: 'SimpleImagesView',
			SimpleVideosView	: 'SimpleVideosView'
		},
		control: {
			'ProductInfoView #BackButton': { tap: 'onBack' },
			'ProductInfoView #HomeButton': { tap: 'onHome' },
			EducationButton		: { tap: 'onOpenEducation' },
			BuyButton			: { tap: 'onBuy' },
			ProductInfoList		: { disclose: 'onDisclose' },
			ImagesButton		: { tap: 'onImages' },
			VideosButton		: { tap: 'onVideos' }
		}
	},

	launch: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); },

	load: function (product) {
		var ctlr = this;

		var CF = OregonsCatch.util.CrossFilter;
		CF.parameters.product = product;
		CF.parameters.preparation = null;
		CF.parameters.vendor = null;
		CF.parameters.location = null;
		CF.parameters.position = null;
		CF.parameters.allprod = false;
		CF.refilter();

		ctlr.getProductInfoTitle().setTitle(product.get('name'));

		if (product.get('image')) {
			ctlr.getImage().show();
			ctlr.getImage().setSrc(OregonsCatch.util.API.url + product.get('image').link);
		} else {
			ctlr.getImage().hide();
		}

		ctlr.getDescription().setData(product.data);
		ctlr.getDetails().setData(product.data);

		ctlr._product = product;

		if (product.get('story')) {
			ctlr.loadStory();
		} else {
			ctlr.getStory().hide();
		}
	},

	loadStory: function () {
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
				console.log('Loaded story for product.');
				var story = Stories.first().getData();
				ctlr._story = Stories.first();
				ctlr.getFacts().setData(story);
				ctlr.getProducts().setData(story);
				ctlr.getPreparing().setData(story);
				ctlr.getBuying().setData(story);
				ctlr.getHistory().setData(story);
				if (story.images.length) {
					ctlr.getImagesButton().show();
				} else {
					ctlr.getImagesButton().hide();
				}
				if (story.videos.length) {
					ctlr.getVideosButton().show();
				} else {
					ctlr.getVideosButton().hide();
				}
				ctlr.getStory().show();
			} else {
				ctlr.getStory().hide();
			}
		});
	},

	onBuy: function () {
		var ctlr = this;
		OregonsCatch.util.Back.push(ctlr, ctlr._product);

		var CF = OregonsCatch.util.CrossFilter;
		CF.parameters.product = ctlr._product;
		CF.parameters.preparation = null;
		CF.parameters.vendor = null;
		CF.parameters.location = null;
		CF.parameters.position = null;
		CF.parameters.allprod = false;
		CF.refilter();

		ctlr.getVendorMapListTitle().setTitle(ctlr._product.get('name'));

		ctlr.getApplication().getController('VendorMapList').load();
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getVendorMapList(), transition);
	},

	onImages: function () {
		var ctlr = this;
		OregonsCatch.util.Back.push(ctlr, ctlr._story);
		ctlr.getApplication().getController('SimpleImagesView').load(ctlr._story.get('images'));
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getSimpleImagesView(), transition);
	},

	onVideos: function () {
		var ctlr = this;
		OregonsCatch.util.Back.push(ctlr, ctlr._story);
		ctlr.getApplication().getController('SimpleVideosView').load(ctlr._story.get('videos'));
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getSimpleVideosView(), transition);
	}

});
