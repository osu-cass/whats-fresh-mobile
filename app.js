/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.Loader.setConfig({
    enabled:true,
    disableCaching: false,
    paths: {
        "Ext": 'touch/src'
    }
});
 
Ext.application({
    name: 'WhatsFresh',

    controllers: ["List"],
    models: ["Vendors", "Products", "Locations", "VendorInventories", "ProductLists", "Stories"],
    stores: ["Education", "Vendor", "Product", "Location", "Distance", "VendorInventory", "ProductList", "Story"],
    views: ["Home", "Detail", "ListView", "Map", "Info", "Specific", "ProductDetail"],


    launch: function() {

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('WhatsFresh.view.Home'));
        Ext.Viewport.add(Ext.create('WhatsFresh.view.Map'));
        Ext.Viewport.add(Ext.create('WhatsFresh.view.ListView'));
        Ext.Viewport.add(Ext.create('WhatsFresh.view.Detail')); 
        Ext.Viewport.add(Ext.create('WhatsFresh.view.ProductDetail')); 
        Ext.Viewport.add(Ext.create('WhatsFresh.view.Info'));
        Ext.Viewport.add(Ext.create('WhatsFresh.view.Specific'));

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }

});
