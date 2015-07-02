Ext.define('WhatsFresh.util.Link',{

    /**
       The Link util defines a set of functions that navigate the user
       out of the current app context an into either a navigation app
       or a video app.

       Each function is responsible for correctly rerouting the user
       depending on their platform.
     */

	singleton: true,

	openNavigation: function(lat, lng){
		var data = 'daddr=' + lat + ',' + lng;
		if (window.device && window.device.platform === 'iOS') {
			this.openLink('maps:' + data);
		} else {
			this.openLink('https://maps.google.com/?' + data);
		}
	},

	openVideo: function (id) {
		this.openLink('https://www.youtube.com/watch?v=' + id);
	},

	openLink: function (link) {
		// Requires inAppBrowser plugin to work correctly on mobile devices.
		window.open(link, '_system');
	},

	getYoutubeIdFromLink: function (link) {
		var id = '';
		if (link.indexOf('youtu.be') > -1) {
			id = link.split('/')[3];
		} else {
			id = link.split('v=')[1];
			var ampersandPosition = id.indexOf('&');
			if (ampersandPosition !== -1) {
				id = id.substring(0, ampersandPosition);
			}
		}
		return id;
	},

	// Legacy name is being forwarded.
	formatVideoLink: function (link) { return this.getYoutubeIdFromLink(link); }

});
