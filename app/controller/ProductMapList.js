Ext.define('OregonsCatch.controller.ProductMapList', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.CrossFilter',
		'OregonsCatch.util.Back'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			PML					: 'ProductMapListView',
			PML_Map				: 'ProductMapListView #Map',
			PML_List			: 'ProductMapListView #List',
			BackButton			: 'ProductMapListView #BackButton',
			HomeButton			: 'ProductMapListView #HomeButton'
		},
		control: {
			BackButton: {
				tap				: 'onBack'
			},
			HomeButton: {
				tap				: 'onHome'
			},
			PML_List: {
				itemsingletap	: 'onListSingleTap',
				disclose		: 'onDisclose',
				refresh			: 'onListRefresh'
			}
		}
	},

	launch: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getPML_List().setStore(CF.filtered.products);
	},

	load: function () {
		var ctlr = this;
		OregonsCatch.util.Back.push();
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		ctlr.getPML_Map().center();
		Ext.Viewport.animateActiveItem(ctlr.getPML(), transition);
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); },

	onListSingleTap: function () {

	},

	onDisclose: function (p1, product, p3, p4) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getApplication().getController('ProductInfo').load(product);
	},

	/* ------------------------------------------------------------------------
		Map Marker Controller (automated callback)
	------------------------------------------------------------------------ */

	onListRefresh: function () {
		var ctlr = this;
		var seagrantmap = ctlr.getPML_Map();
		var CF = OregonsCatch.util.CrossFilter;
		var store = CF.filtered.vendors;

		// addPointsAndCenter requires this to work
		// see: view/Map.js
		var customMarkerArray = [];

		// Save the current selection to reselect it once updated.
		var currentSelection = ctlr.getPML_List().getSelection();

		// Build a custom click function for each marker.
		// YOU CANNOT CREATE FUNCTIONS WITHIN A LOOP'S SCOPE.
		// It selects the matching item in the list.
		// Needed for the loop below.
		function getClickFunction (record) {
			return function () {
				ctlr.getPML_List().select(record);
			};
		}

		// All marker info windows will deselect the list when closed.
		// Needed for the loop below.
		function commonCloseFunction () { ctlr.getPML_List().deselectAll(); }

		// This converts the store items into an array
		// expected by view/Map.js addPoints() method.
		// See that file and method.
		for (var i = 0; i < store.getCount(); i++) {
			var poiRecord = store.getAt(i);
			var markerData = {
				lat		: poiRecord.get('lat'),
				lng		: poiRecord.get('lng'),
				id		: i,
				title	: poiRecord.get('name'),
				text	: '',
				click	: getClickFunction(poiRecord),
				close	: commonCloseFunction
			};
			customMarkerArray.push(markerData);
		}

		// This will remove existing markers, and add new ones.
		// It does NOT zoom or pan the map at all.
		seagrantmap.addPoints(customMarkerArray);

		// Apply the saved selection, if applicable
		if (currentSelection && currentSelection.length) {
			var index = store.indexOf(currentSelection[0]);
			if (index < 0) return;
			ctlr.getPML_List().select(currentSelection[0]);
			ctlr.onListSingleTap(ctlr.getPML_List(), index);
		}

	}


});
