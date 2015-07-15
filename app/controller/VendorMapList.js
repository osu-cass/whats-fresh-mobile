Ext.define('OregonsCatch.controller.VendorMapList', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.CrossFilter',
		'OregonsCatch.util.Back'
	],

	config: {
		refs: {
			HomeView			: 'HomeView',
			VendorMapList		: 'VendorMapListView',
			VendorInfo			: 'VendorInfoView',
			VendorMap			: 'VendorMapListView #Map',
			VendorList			: 'VendorMapListView #List'
		},
		control: {
			'VendorMapListView #BackButton': { tap: 'onBack' },
			'VendorMapListView #HomeButton': { tap: 'onHome' },
			VendorList: {
				itemsingletap	: 'onListSingleTap',
				disclose		: 'onDisclose',
				refresh			: 'onListRefresh'
			}
		}
	},

	launch: function () {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getVendorList().setStore(CF.filtered.vendors);
		Ext.Viewport.on('openVendor', ctlr.onMapClick, ctlr);
	},

	load: function () {
		var ctlr = this;
		ctlr.getVendorMap().center();
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); },

	// Highlights the pins that have that product.
	onListSingleTap: function (p1, index, p3, product) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		var markers = ctlr.getVendorMap().markers;
		google.maps.event.trigger(markers[index], 'click');
	},

	onMapClick: function (index) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		var vendor = CF.filtered.vendors.getAt(index);
		ctlr.onDisclose(null, vendor);
	},

	onDisclose: function (p1, vendor, p3, p4) {
		var ctlr = this;
		var CF = OregonsCatch.util.CrossFilter;
		ctlr.getVendorList().select(vendor);
		OregonsCatch.util.Back.push();
		ctlr.getApplication().getController('VendorInfo').load(vendor);
		var transition = {
			type		: 'slide',
			direction	: 'left'
		};
		Ext.Viewport.animateActiveItem(ctlr.getVendorInfo(), transition);
	},

	/* ------------------------------------------------------------------------
		Map Marker Controller (automated callback)
	------------------------------------------------------------------------ */

	onListRefresh: function () {
		var ctlr = this;
		var seagrantmap = ctlr.getVendorMap();
		var CF = OregonsCatch.util.CrossFilter;
		var store = CF.filtered.vendors;

		// addPointsAndCenter requires this to work
		// see: view/Map.js
		var customMarkerArray = [];

		// Save the current selection to reselect it once updated.
		var currentSelection = ctlr.getVendorList().getSelection();

		// Build a custom click function for each marker.
		// YOU CANNOT CREATE FUNCTIONS WITHIN A LOOP'S SCOPE.
		// It selects the matching item in the list.
		// Needed for the loop below.
		function getClickFunction (record) {
			return function () {
				ctlr.getVendorList().select(record);
			};
		}

		// All marker info windows will deselect the list when closed.
		// Needed for the loop below.
		function commonCloseFunction () { ctlr.getVendorList().deselectAll(); }

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
			ctlr.getVendorList().select(currentSelection[0]);
			ctlr.onListSingleTap(ctlr.getVendorList(), index);
		}

	}


});
