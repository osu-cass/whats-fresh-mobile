Ext.define('OregonsCatch.view.Error', {
	extend: 'Ext.Panel',
	requires: [],
	xtype: 'ErrorView',
	config: {
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				title: 'Oregon\'s Catch'
			},
			{
  			xtype: 'fieldset',
  			itemId: 'ErrorMessage',
  			styleHtmlContent: true,
  			tpl: '{error}',
  			data: {
  				error: 'Instead, we caught an error! Restart the app to try again.'
  			}
  		}
		]
	}
});
