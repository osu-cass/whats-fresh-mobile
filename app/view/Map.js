Ext.define('OregonsCatch.view.Map', {
	extend: 'Ext.Container',
	requires: ['Ext.Map'],
	xtype: 'SeaGrantMap',
	config: {
		layout: 'fit',
		items: [
			{
				xtype: 'map',
				mapOptions: {
					center: new google.maps.LatLng(43, -123),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 13,
					// The point of this piece is so that the
					// points of interest are removed from the map.
					styles: [
						{
							featureType: 'administrative',
							elementType: 'labels',
							stylers: [
								{ visibility: 'off' }
							]
						},
						{
							featureType: 'landscape',
							elementType: 'labels',
							stylers: [
								{ visibility: 'off' }
							]
						},
						{
							featureType: 'poi',
							elementType: 'labels',
							stylers: [
								{ visibility: 'off' }
							]
						},
						{
							featureType: 'transit.station.airport',
							elementType: 'labels',
							stylers: [
								{ visibility: 'off' }
							]
						}
					]
				}
			}
		]
	},

	initialize: function () {
		var that = this;
		that.callParent(arguments);
	},

	map: function () { return this.down('map').getMap(); },

	centerToBounds: function (bounds) {
		var gMap = this.map();

		/*
		Developers beware: this is async because Google Maps does something
		internally that is also async. It leads to the first viewing of the
		map centering in the top, left corner instead of the middle.
		*/

		/* global setTimeout */
		setTimeout(function () {
			// Resize causes the map to redraw, fixing the "blank" map error.
			google.maps.event.trigger(gMap, 'resize');
			gMap.fitBounds(bounds);
			gMap.panToBounds(bounds);
			if(gMap.getZoom() > 15) { gMap.setZoom(15); }
			if(gMap.getZoom() < 6) { gMap.setZoom(6); }
		}, 1);
	},

	center: function () {
		var self = this;
		var bounds = new google.maps.LatLngBounds();
		for (var k = 0; k < self.markers.length; k++) {
			bounds.extend(self.markers[k].position);
		}
		self.centerToBounds(bounds);
	},

	currentInfoWindow: null,
	markers: [],

	addPoint: function (point, id, title, text, onClick, onClose) {
		var view	= this;
		var gMap	= view.map();
		onClick		= onClick || function () {};

		/*
		Developers:
		This code defeats the scope issue created when a button
		needs to call a private/anonyous function.
		Ext.Viewport events are fired semi-globally, such that we can
		reliably listen for them in the currently displayed view.
		This event, mapButton, is listened for in the MapList.js controller,
		as defined in the 'launch' function. Each button is told what
		index, or id, to use when calling the event. This allows the
		controller to know which item in the list to select.
		 */

		var html = '';
		html += '<h1>' + title + '</h1>';
		html += '<p>' + text + '</p>';
		html += '<a href="javascript:void(0);" onclick="Ext.Viewport.fireEvent(\'openVendor\',\'' + id + '\')">Open details...</a>';

		var marker	= new google.maps.Marker({
			map				: gMap,
			animation		: google.maps.Animation.DROP,
			// opacity		: opnum,
			zIndex			: 1, // google.maps.Marker.MAX_ZINDEX + 1,
			icon			: 'resources/images/red.png',
			position		: point,
			clickable		: true,
			info			: new google.maps.InfoWindow({
				content			: html,
				disableAutoPan	: false
			})
		});

		view.markers.push(marker);

		google.maps.event.addListener(marker, 'click', function () {
			if (view.currentInfoWindow) {
				view.currentInfoWindow.close();
			}
			view.currentInfoWindow = marker.info;
			view.currentInfoWindow.open(gMap, this);
			onClick();
		});

		google.maps.event.addListener(marker.info, 'closeclick', onClose);

	},

	addPoints: function (customArray) {
		var view = this;
		for (var i = 0; i < view.markers.length; i++) {
			view.markers[i].setMap(null);
		}
		view.markers = [];
		for (var k = 0; k < customArray.length; k++) {
			var lat		= customArray[k].lat;
			var lng		= customArray[k].lng;
			var id		= customArray[k].id;
			var title	= customArray[k].title;
			var text	= customArray[k].text;
			var click	= customArray[k].click;
			var close	= customArray[k].close;
			var point	= new google.maps.LatLng(lat, lng);
			view.addPoint(point, id, title, text, click, close);
		}
	}

});
