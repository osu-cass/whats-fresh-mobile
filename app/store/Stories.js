Ext.define('OregonsCatch.store.Stories', {
	extend: 'Ext.data.Store',
	config: {
		model: 'OregonsCatch.model.Story',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: 'http://seagrant-staging-api.osuosl.org/1/stories/1',
			reader: {
				type: 'json'
			}
		}
	}
});
