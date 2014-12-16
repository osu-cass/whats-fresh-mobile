Ext.define('SeaGrant_Proto.model.Locations', {
    extend: 'Ext.data.Model',
    config: {
        fields:[
            'location',
            'title',
            'text',
            'value',
            'products',
            'Latlng',
            'id',
            'address',
            'desc',
            'name'
        ]
    }
});
