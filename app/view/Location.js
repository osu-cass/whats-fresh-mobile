// Ext.define('WhatsFresh.view.Location', {
// 	extend: 'Ext.Map',
// 	xtype: 'location',
// 	// monitorResize: true,
// 	config: {
// 		layout: 'fit',
//         // items: [
//         //     {
//         //         xtype: 'map',
// 				mapOptions: {
// 					center: new google.maps.LatLng(44.634115, -124.062796),
// 					mapTypeId: google.maps.MapTypeId.ROADMAP,
// 					zoom: 17
// 				}
// 		// 		listeners: {
// 		// 			delay: 500,
// 		// 			// This is the marker that works after the items and xtype are included
// 		// 			maprender: function(extMapComponent, googleMapComp){
// 		// 				var marker = new google.maps.Marker({
// 		// 					map: this.getMap(),
// 		// 					animation: google.maps.Animation.DROP,
// 		// 					position: new google.maps.LatLng(44.634115, -124.062796)
// 		// 				});
// 		// 			}
// 		// 		}
// 		// 	}
// 		// ]
// 	},
// 	initialize: function(){
// 		var gMap = this.getMap();

// 		// var marker = new google.maps.Marker({
// 		// 	map:gMap,
// 		// 	animation: google.maps.Animation.DROP,
// 		// 	position: new google.maps.LatLng(44.634115, -124.062796)
// 		// });
// 	}
// 	// onResize: function(w, h){
// 	// 	Ext.Map.superclass.onResize.apply(this, arguments);
// 	// 	if(this.map){
// 	// 		google.maps.event.trigger(this.map, 'resize');
// 	// 	}
// 	// }
// });

Ext.define('WhatsFresh.view.Location', {
	extend: 'Ext.Container',
	// requires: 'WhatsFresh.view.Map',
	alias: 'widget.location',
	config: {
		layout: {
			type: 'fit'
		},
		items: [
			{
				xtype: 'toolbar',
				title: 'Location',
				docked: 'top'
			},
			// {
			// 	xtype:'SeaGrantMap'
			// },
			{
				xtype: 'toolbar',
				docked: 'bottom',
				items: [
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'Home',
						itemId: 'homeButton'
					},
					{
						xtype: 'spacer'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'Detail View',
						itemId: 'detailButton'
					},
					{
						xtype: 'spacer'
					}
				]
			}
		],
		listeners: [
			// Bottom button listeners
			{
				delegate: '#homeButton',
				event: 'tap',
				fn: 'onHomeButtonTap'
			},
			{
				delegate: '#detailButton',
				event: 'tap',
				fn: 'onDetailButtonTap'
			}
		]
	},
	onHomeButtonTap: function(list, record, target, index, evt, options){
		console.log('viewHomeCommand');
		this.fireEvent('viewHomeCommand', this, record);
	},
	onDetailButtonTap: function(list, record, target, index, evt, options){
		// We use viewListItemCommand instead of viewDesignCommand because both
		// point to the same view page and we already have a function onViewListItemCommand
		// written to navigate to this page in our controller.
		console.log('viewDetailCommand');
		this.fireEvent('viewDetailCommand', this, record);
	}
});

// Ext.define('WhatsFresh.view.Location', {
// 	extend: 'Ext.Carousel',
// 	alias: 'widget.location',
// 	fullscreen: true,
// 	config: {
// 		defaults: {
// 			styleHtmlContent: true,
// 			//cls: 'card'
// 		},
// 		items: [
//             {
//                 html: 'red',
//                 style: 'background-color:#f00;'
//             }, {
//                 html: 'orange',
//                 style: 'background-color:#ffb600;'
//             }, {
//                 html: 'yellow',
//                 style: 'background-color:#ff0;'
//             }, {
//                 html: 'green',
//                 style: 'background-color:#80ff4d;'
//             }, {
//                 html: 'blue',
//                 style: 'background-color:#009dff;'
//             },
//  //        ] // items
// 	// },
// 		// This declairs a bottom toolbar and buttons
// 			{
// 				xtype: 'toolbar',
// 				docked: 'bottom',
// 				items: [
// 					{
// 						xtype: 'spacer'
// 					},
// 					{
// 						xtype: 'button',
// 						ui: 'action',
// 						text: 'Home',
// 						itemId: 'homeButton'
// 					},
// 					{
// 						xtype: 'spacer'
// 					},
// 					{
// 						xtype: 'button',
// 						ui: 'action',
// 						text: 'Location View',
// 						itemId: 'locationButton'
// 					},
// 					{
// 						xtype: 'spacer'
// 					}
// 				]
// 			}
// 		],
// 		listeners: [
// 			// Bottom button listeners
// 			{
// 				delegate: '#homeButton',
// 				event: 'tap',
// 				fn: 'onHomeButtonTap'
// 			},
// 			{
// 				delegate: '#locationButton',
// 				event: 'tap',
// 				fn: 'onLocationButtonTap'
// 			}
// 		]
// 	},
// 	onHomeButtonTap: function(list, record, target, index, evt, options){
// 		console.log('viewHomeCommand');
// 		this.fireEvent('viewHomeCommand', this, record);
// 	},
// 	onLocationButtonTap: function(list, record, target, index, evt, options){
// 		console.log('viewLocationCommand');
// 		this.fireEvent('viewLocationCommand', this, record);
// 	}
// });