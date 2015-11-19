Ext.define('OregonsCatch.controller.ProductEducation', {
	extend: 'Ext.app.Controller',
	requires: [ 'OregonsCatch.util.Back' ],

	config: {
		refs: {
			EducationView		: 'ProductEducationView',
			SimpleTextView		: 'SimpleTextView',
			SimpleImagesView	: 'SimpleImagesView',
			SimpleVideosView	: 'SimpleVideosView',
			Title				: 'ProductEducationView #Title',
			ImagesButton		: 'ProductEducationView #ImagesButton',
			VideosButton		: 'ProductEducationView #VideosButton'
		},
		control: {
			'ProductEducationView #BackButton'			: { tap: 'onBack' },
			'ProductEducationView #HomeButton'			: { tap: 'onHome' },
			'ProductEducationView #FactsButton'			: { tap: 'onFacts' },
			'ProductEducationView #HistoryButton'		: { tap: 'onHistory' },
			'ProductEducationView #SeasonButton'		: { tap: 'onSeason' },
			'ProductEducationView #PackagingButton'		: { tap: 'onPackaging' },
			'ProductEducationView #BuyTipsButton'		: { tap: 'onBuyTips' },
			'ProductEducationView #PreparationButton'	: { tap: 'onPreparation' },

			ImagesButton		: { tap: 'onImages' },
			VideosButton		: { tap: 'onVideos' }
		}
	},

	load: function (story) {
		var ctlr = this;
		ctlr._story = story;

		// Population
		ctlr.getTitle().setTitle(story.get('name'));

		// Conditional Buttons
		if (story.get('images').length > 0) {
			ctlr.getImagesButton().show();
		} else {
			ctlr.getImagesButton().hide();
		}

		if (story.get('videos').length > 0) {
			ctlr.getVideosButton().show();
		} else {
			ctlr.getVideosButton().hide();
		}
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); },

	onFacts: function () {
		var ctlr = this;
		ctlr.onAnyPage({
			title	: ctlr._story.get('name'),
			header	: 'Facts',
			text	: ctlr._story.get('facts')
		});
	},

	onHistory: function () {
		var ctlr = this;
		ctlr.onAnyPage({
			title	: ctlr._story.get('name'),
			header	: 'History',
			text	: ctlr._story.get('history')
		});
	},

	onSeason: function () {
		var ctlr = this;
		ctlr.onAnyPage({
			title	: ctlr._story.get('name'),
			header	: 'Season',
			text	: ctlr._story.get('season')
		});
	},

	onPackaging: function () {
		var ctlr = this;
		ctlr.onAnyPage({
			title	: ctlr._story.get('name'),
			header	: 'Product Packaging',
			text	: ctlr._story.get('products')
		});
	},

	onBuyTips: function () {
		var ctlr = this;
		ctlr.onAnyPage({
			title	: ctlr._story.get('name'),
			header	: 'Buying Tips',
			text	: ctlr._story.get('buying')
		});
	},

	onPreparation: function () {
		var ctlr = this;
		ctlr.onAnyPage({
			title	: ctlr._story.get('name'),
			header	: 'Preparation',
			text	: ctlr._story.get('preparing')
		});
	},

	onAnyPage: function (info) {
		var ctlr = this;
		OregonsCatch.util.Back.push(ctlr, ctlr._story);
		ctlr.getApplication().getController('SimpleTextView').load(info);
		// View Change
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getSimpleTextView(), transition);
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
