Ext.define('OregonsCatch.controller.SimpleImagesView', {
	extend: 'Ext.app.Controller',
	requires: [
		'OregonsCatch.util.API',
		'OregonsCatch.util.Back'
	],
	config: {
		refs: {
			SimpleImagesView	: 'SimpleImagesView',
			ImagesPanel			: 'SimpleImagesView #ImagesPanel'
		},
		control: {
			'SimpleImagesView #BackButton': { tap: 'onBack' },
			'SimpleImagesView #HomeButton': { tap: 'onHome' },
		}
	},

	load: function (images) {
		var ctlr = this, image = null, i = 0;
		ctlr.getImagesPanel().removeAll();
		for (i = 0; i < images.length; i++) {
			image = Ext.create('Ext.Img', {
				src: OregonsCatch.util.API.url + images[i].link,
				maxWidth: '100%',
				height: '240px',
				margin: '8px'
			});
			ctlr.getImagesPanel().add(image);
		}
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); }

});
