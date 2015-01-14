Ext.define('WhatsFresh.util.ProductSearch', {

    singleton: true,

    requires: ['WhatsFresh.util.Geography'],
    // Each of these options are of type record,
    // Thus we must send in a record from the controller
    options: { 
        product: null
    },

    constructor: function() {},

    /* ------------------------------------------------------------------------
       Filter Definition
       ------------------------------------------------------------------------
    */

    buildFilterFunction: function () {
        var singleton = WhatsFresh.util.ProductSearch;
        var Geo = WhatsFresh.util.Geography;
        var filter = function (productStoreRecord) {
            var prod= singleton.options.product;
           
            // Composable filters
            var hasProduct;

            // Discard placeholders
            if (productStoreRecord.is_not_filterable) return false;

            // If the product is set, filter. If not, include everything.
            if (singleton.canFilterByProduct()) {
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
    },

    /* ------------------------------------------------------------------------
       Utility and Helper Functions
       ------------------------------------------------------------------------
    */
  
    canFilterByProduct: function () {
        var opt = this.options;
        return !!opt.product && !opt.product.is_not_filterable;
    }
});