Ext.define('OregonsCatch.model.Story', {
	extend: 'Ext.data.Model',
	config: {
		fields:[
			'id',
			'name',
			'videos',
			'created',
			'season',
			'modified',
			'facts',
			'ext',
			'products',
			'preparing',
			'error',
			'images',
			'buying',
			'history'
		]
	}
});
