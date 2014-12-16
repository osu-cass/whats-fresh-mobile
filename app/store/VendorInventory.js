Ext.define('WhatsFresh.store.VendorInventory', {
    extend: 'Ext.data.Store',
    storeId: 'VendorInventory',
 
    config: {
        model: 'WhatsFresh.model.VendorInventories',
        data: [
            {
                "name": "test Fish",
                "preparation": "Skewered"
            },
            {
                "name": "other Fish",
                "preparation": "new"
            }
        ]
    }
});
