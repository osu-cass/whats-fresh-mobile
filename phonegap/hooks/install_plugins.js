#!/usr/bin/env node

// Adapted from:
// http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

var sys		= require('sys');
var exec	= require('child_process').exec;

var pluginlist = [
    'org.apache.cordova.geolocation'
];

pluginlist.forEach(function(plug) {
    exec('cordova plugin add ' + plug,
    	function (error, stdout) {
    		sys.puts(stdout);
		}
	);
});