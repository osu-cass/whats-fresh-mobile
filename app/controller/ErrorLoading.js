Ext.define('WhatsFresh.controller.ErrorLoading', {
	extend: 'Ext.app.Controller',
	requires: [],
	config: {
		refs: {
			homeView			: 'home',
			errorView			: 'ErrorLoadingView'
		}
	},

	/* ------------------------------------------------------------------------
		UI Callback (Event) Functions
	------------------------------------------------------------------------ */

	loader: null,

	onError: function () {
		var ctrl = this;
		var transition;

		if (Ext.Viewport.getActiveItem() !== ctrl.getErrorView()) {

			transition = ctrl.getErrorView().transitions.back;
			Ext.Viewport.animateActiveItem(ctrl.getErrorView(), transition);

			ctrl.loader = setInterval(function () {

				console.log('Loading stores again...');
				Ext.getStore('Location').load();
				Ext.getStore('Product').load();
				Ext.getStore('Vendor').load();

			}, 3000); // 3 second intervals
		}

	},

	onSuccess: function () {
		var ctrl = this;
		var transition;

		clearInterval(ctrl.loader);

		if (Ext.Viewport.getActiveItem() !== ctrl.getHomeView()) {

			transition = ctrl.getErrorView().transitions.home;
			Ext.Viewport.animateActiveItem(ctrl.getHomeView(), transition);

		}

	}

});
