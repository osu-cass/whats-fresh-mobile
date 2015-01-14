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
		link="daddr="+lat+","+lng;
		if(navigator.userAgent.match(/(Android)/)){
			navigator.app.loadUrl("https://maps.google.com/?"+link, {openExternal: true});
		}else if(navigator.userAgent.match(/(ios)/)){
			window.open("maps:"+link);
		}else{
			window.open("https://maps.google.com/?"+link);
		}
	},

	openVideo: function(link){
		if(navigator.userAgent.match(/(Android)/)){
			navigator.app.loadUrl(link, {openExternal: true});
		}else if(navigator.userAgent.match(/(ios)/)){
			window.open(link);
		}else{
			window.open(link);
		}
	}

});
