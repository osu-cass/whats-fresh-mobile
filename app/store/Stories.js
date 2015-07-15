Ext.define('OregonsCatch.store.Stories', {
	extend: 'Ext.data.Store',
	config: {
		model: 'OregonsCatch.model.Story',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			reader: {
				type: 'json'
			}
		}
	}
});
