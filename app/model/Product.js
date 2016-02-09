Ext.define('OregonsCatch.model.Product', {
	extend: 'Ext.data.Model',
	config: {
		fields:[
			'id',
			'origin',
			'description',
			'variety',
			'season',
			'image',
			'created',
			'modified',
			'market_price',
			'link',
			'alt_name',
			'story',
			'name',
			'is_not_filterable'
		]
	}
});
