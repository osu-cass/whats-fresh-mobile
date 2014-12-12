Ext.define('WhatsFresh.model.Products', {
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
            'story',
            'name',
            'id'
        ]
    }
});
