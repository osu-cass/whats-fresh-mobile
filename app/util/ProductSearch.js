Ext.define('WhatsFresh.util.ProductSearch', {

    singleton: true,

    requires: ['WhatsFresh.util.Geography', 'WhatsFresh.util.Search'],
    
    constructor: function() {},

    /* ------------------------------------------------------------------------
       Filter Definition
       ------------------------------------------------------------------------
    */

    buildFilterFunction: function () {
        var singleton = WhatsFresh.util.ProductSearch;
        var Geo = WhatsFresh.util.Geography;
        var filter = function (productStoreRecord) {
            var prod= WhatsFresh.util.Search.options.product;
           
            // Composable filters
            var hasProduct;

            // Discard placeholders
            if (productStoreRecord.is_not_filterable) return false;

            // If the product is set, filter. If not, include everything.
            if (WhatsFresh.util.Search.canFilterByProduct()) {
                var product= productStoreRecord.get('name');                
                hasProduct= prod.name === product;
            } else {
                hasProduct= true;
            }
            // Return all filters
            return hasProduct;
        };
        return filter;
    },

    /*
     * This function assembles and applies the Search util's filter
     * to a store. 
     *
     * Because Sencha stores persist applied filters, we only need to
     * call this function once on startup. Once the filter is applied,
     * we can call the store's filter function to update the filtered set.
     */
    applyFilterToPStore: function (store) {
        console.log('% filtering products');
        var singleton= WhatsFresh.util.ProductSearch;
        var filterFunction = singleton.buildFilterFunction();
        var criteria = new Ext.util.Filter({
            filterFn : filterFunction,
            root     : 'data'
        });
        store.clearFilter();
        store.filter(criteria);
    }
});