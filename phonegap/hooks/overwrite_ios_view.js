#!/usr/bin/env node

// Adapted from:
// http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/

var filestocopy = [{
	'hooks/MainViewController.m':
		'platforms/ios/Waterfronts/Classes/MainViewController.m'
}];

var fs = require('fs');
var path = require('path');

filestocopy.forEach(function(obj) {
	Object.keys(obj).forEach(function(key) {
		var val = obj[key];
		var srcfile = path.join(key);
		var destfile = path.join(val);
		console.log('copying '+srcfile+' to '+destfile);
		if (!fs.existsSync(srcfile)) {
			throw new Error('file does not exist: ' + srcfile);
		}
		var destdir = path.dirname(destfile);
		if (!fs.existsSync(destdir)) {
			console.log('destination folder missing');
			return;
		}
		fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
	});
});