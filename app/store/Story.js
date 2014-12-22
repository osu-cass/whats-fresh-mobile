Ext.define('WhatsFresh.store.Story', {
	extend: 'Ext.data.Store',
	config: {
		model: 'WhatsFresh.model.Stories',
		autoLoad: true,
		proxy: {
			type: 'ajax',
			url: 'http://seagrant-staging-api.osuosl.org/1/stories/1',
			reader: {
				type: 'json'
			}
		}
	}
});
