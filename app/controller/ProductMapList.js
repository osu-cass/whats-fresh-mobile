Ext.define('OregonsCatch.controller.ProductMapList', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.CrossFilter',
		'OregonsCatch.util.Back'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			ProductInfoView		: 'ProductInfoView',
			VendorInfo			: 'VendorInfoView',
			PML					: 'ProductMapListView',
			PML_Map				: 'ProductMapListView #Map',
			PML_List			: 'ProductMapListView #List'
		},
		control: {
			'ProductMapListView #BackButton': { tap: 'onBack' },
			'ProductMapListView #HomeButton': { tap: 'onHome' },
			PML_List: {
				itemsingletap	: 'onListSingleTap',
				itemdoubletap	: 'onListDoubleTap',
				disclose		: 'onDisclose',
				refresh			: 'onListRefresh'
			}
		}
	},

	launch: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getPML_List().setStore(CF.filtered.products);
		// VendorMapList has this covered.
		//Ext.Viewport.on('openVendor', ctlr.onMapClick, ctlr);
	},

	load: function () {
		var ctlr = this;
		ctlr.getPML_Map().center();
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); },

	// Highlights the pins that have that product.
	onListSingleTap: function (p1, index, p3, product) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		var markers = ctlr.getPML_Map().markers;
		var map = ctlr.getPML_Map().map();
		product = CF.filtered.products.getAt(index);
		for (var i = 0; i < markers.length; i++) {
			var vendor = CF.filtered.vendors.getAt(i);
			var found = false;
			if (vendor && product) {
				for (var k = 0; k < vendor.get('products').length; k++) {
					if (vendor.get('products')[k].product_id == product.get('id')) {
						found = true;
						break;
					}
				}
			}
			if (found) {
				markers[i].icon = 'resources/images/blue.png';
				markers[i].zIndex = 2;
			} else {
				markers[i].icon = 'resources/images/red.png';
				markers[i].zIndex = 1;
			}
			// Doesn't change anything, but allows us to "redraw" the map markers.
			markers[i].setMap(map);
		}
	},

	onListDoubleTap: function (p1, index, p3, product) {
		this.onDisclose(null, product);
	},

	onDisclose: function (p1, product, p3, p4) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getPML_List().select(product);
		OregonsCatch.util.Back.push();
		ctlr.getApplication().getController('ProductInfo').load(product);
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getProductInfoView(), transition);
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
