Ext.define('SeaGrant_Proto.model.Products', {
    extend: 'Ext.data.Model',
    config: {
        fields:[
            'origin',
            'available',
            'description',
            'variety',
            'season',
            'image',
            'created',
            'modified',
            'market_price',
            'link',
            'alt_name',
            'story_id',
            'name',
            'id'
        ]
    }
});
