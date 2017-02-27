Ext.define('OregonsCatch.controller.SimpleVideosView', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.API',
		'OregonsCatch.util.Back',
		'OregonsCatch.util.Link'
	],
	config: {
		refs: {
			SimpleVideosView	: 'SimpleVideosView',
			VideosPanel			: 'SimpleVideosView #VideosPanel'
		},
		control: {
			'SimpleVideosView #BackButton': { tap: 'onBack' },
			'SimpleVideosView #HomeButton': { tap: 'onHome' }
		}
	},

	load: function (videos) {
		var ctlr = this, image, panel, i = 0;
		var Link = OregonsCatch.util.Link;
		ctlr.getVideosPanel().removeAll();

		function handleTap (i) {
			return function () { Link.openLink(videos[i].link); };
		}

		for (i = 0; i < videos.length; i++) {

			image = Ext.create('Ext.Img', {
				src: 'resources/images/play.png',
				height: '100%',
				html: '<a href="' + videos[i].link + '" target="_system"></a>'
			});

			image.on('tap', handleTap(i));

			panel = Ext.create('Ext.Panel', {
				maxWidth: '100%',
				height: '240px',
				margin: '8px',
				style: {
					'background-image': 'url(' + Link.getYoutubeImageFromLink(videos[i].link) + ')',
					'background-repeat': 'no-repeat',
					'background-position': 'center',
					'background-size': 'cover'
				},
				items: [image]
			});
			ctlr.getVideosPanel().add(panel);
		}
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); }

});
