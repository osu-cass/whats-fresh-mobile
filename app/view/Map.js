//This variable is to avoid issues with the way sencha touch reads variable
//objects. The point of this piece is so that the points of interest are
//removed from the map.
var mystyles =[
	{
		featureType: "administrative",
		elementType: "labels",
		stylers: [
			{ visibility: "off" }
		]
	},{
		featureType: "landscape",
		elementType: "labels",
		stylers: [
			{ visibility: "off" }
		]
	},{
		featureType: "poi",
		elementType: "labels",
		stylers: [
			{ visibility: "off" }
		]
	},{
		featureType: "transit.station.airport",
		elementType: "labels",
		stylers: [
			{ visibility: "off" }
		]
	}

];

Ext.define('WhatsFresh.view.Map', {
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
					styles: mystyles
                }
            }
        ]
    },
    initialize: function(){
        // Need this code, for more info on the process that works for our map so far, go to:
        // http://www.joshmorony.com/integrating-the-google-maps-api-into-a-sencha-touch-application/
        var me = this;
        me.callParent(arguments);
        this.initMap();      
    }, 
    initMap: function(){ 
        var mapPanel = this.down('map');
        WhatsFresh.gMap = mapPanel.getMap();
    }
});
