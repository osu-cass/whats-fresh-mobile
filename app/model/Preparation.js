Ext.define('OregonsCatch.model.Preparation', {
	extend: 'Ext.data.Model',
	config: {
		fields:[
			'id',
			'name',
			'description',
			'additional_info',
			'is_not_filterable'
		]
	}
});
