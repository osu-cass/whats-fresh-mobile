Ext.define('WhatsFresh.controller.ErrorLoading', {
	extend: 'Ext.app.Controller',
	requires: [],
	config: {
		refs: {
			homeView			: 'HomeView',
			errorView			: 'ErrorLoadingView',
			reload				: 'ErrorLoadingView #reloadButton'
		},
		control: {
			reload: {
				tap				: 'onReloadTap'
			}
		}
	},
	slideLeftTransition: {
		type: 'slide',
		direction: 'left'
	},
	slideRightTransition: {
		type: 'slide',
		direction: 'right'
	},

	/* ------------------------------------------------------------------------
		UI Callback (Event) Functions
	------------------------------------------------------------------------ */

	onReloadTap: function () {

	},

	hasErrorStateLocation: function () {
		// Get counts of remote stores.
		
		var c1 = Ext.getStore('Location').getCount();
		// This compensates for the place holder item "Please Choose ____"
		// because of loading order, the store may be empty, have only a place holder, 
		// or contain data and a place holder
		// if(c1 <= 1){
		// 	// if the store is empty or only contains a place holder then an error has occured
		// 	return true;
		// }else{
		// 	return false;
		// }
		console.log("location");
		console.log(c1);
		return !c1;
	},
	hasErrorStateProduct: function () {
		// Get counts of remote stores.
		
		var c1 = Ext.getStore('Location').getCount();
		// This compensates for the place holder item "Please Choose ____"
		// because of loading order, the store may be empty, have only a place holder, 
		// or contain data and a place holder
		// if(c1 <= 1){
		// 	// if the store is empty or only contains a place holder then an error has occured
		// 	return true;
		// }else{
		// 	return false;
		// }
		console.log("product");
		console.log(c1);
		return !c1;
	},
	hasErrorStateStory: function () {
		// Get counts of remote stores.
		
		var c1 = Ext.getStore('Location').getCount();
		// This store has no place holder to compensate for. 
		console.log("story");
		console.log(c1);
		return !c1;
	},
	hasErrorStateVendor: function () {
		// Get counts of remote stores.
		
		var c1 = Ext.getStore('Location').getCount();
		// This store has no place holder to compensate for. 
		console.log("vendor");
		console.log(c1);
		return !c1;
	},

	onStoreLoad: function (records, operation, success) {
		console.log(" in onStoreLoad function");
		var ctrl = this;
		var errorCheck = !!(ctrl.hasErrorStateLocation ||
						 ctrl.hasErrorStateProduct ||
						 ctrl.hasErrorStateStory || 
						 ctrl.hasErrorStateVendor);

						 console.log(errorCheck);

		// Test for failure or for empty stores.
		if (!success || errorCheck) {
			console.log(ctrl);
			if (Ext.Viewport.getActiveItem() !== ctrl.getErrorView()) {
				console.log("in the if statement");
				console.log(ctrl.getHomeView.transitions);
				// transition = ctrl.getHomeView.transitions.back;
				console.log(ctrl.getErrorView);
				Ext.Viewport.animateActiveItem(ctrl.getErrorView(), ctrl.slideRightTransition);
				// Ext.Viewport.animateActiveItem(this.getListView(), this.slideLeftTransition);
				console.log("after animateActiveItem");

				var loader = setInterval(function () {
					console.log("in loader");
					console.log(errorCheck);
					if (!errorCheck) {
						console.log("clearing the interval");
						clearInterval(loader);
					} else {
						console.log('Loading stores again...');
						Ext.getStore('Location').load();
						Ext.getStore('Product').load();
						Ext.getStore('Story').load();						
						Ext.getStore('Vendor').load();
					}

				}, 3000); // 3 second intervals
			}

		} else {
			console.log("in the else statement");
			if (Ext.Viewport.getActiveItem() !== ctrl.getHomeView()) {
				console.log("Store reloaded, going back to homeView");
				Ext.Viewport.animateActiveItem(ctrl.getHomeView(), ctrl.slideLeftTransition);

			}

		}

	}

});