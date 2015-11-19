Ext.define('OregonsCatch.controller.SimpleTextView', {
	extend: 'Ext.app.Controller',
	requires: [ 'OregonsCatch.util.Back' ],

	config: {
		refs: {
			SimpleTextView		: 'SimpleTextView',
			Title				: 'SimpleTextView #Title',
			Header				: 'SimpleTextView #Header',
			Text				: 'SimpleTextView #Text'
		},
		control: {
			'SimpleTextView #BackButton': { tap: 'onBack' },
			'SimpleTextView #HomeButton': { tap: 'onHome' },
		}
	},

	load: function (item) {
		var ctlr = this;
		ctlr.getTitle().setTitle(item.title);
		ctlr.getHeader().setData(item);
		ctlr.getText().setData(item);
	},

	onBack: function () { OregonsCatch.util.Back.pop(); },
	onHome: function () { OregonsCatch.util.Back.clear(); }

});
