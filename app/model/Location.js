Ext.define('OregonsCatch.model.Location', {
	extend: 'Ext.data.Model',
	config: {
		fields:[
			'id',
			'location',
			'title',
			'text',
			'value',
			'products',
			'Latlng',
			'id',
			'address',
			'desc',
			'name',
			'is_not_filterable'
		]
	}
});
