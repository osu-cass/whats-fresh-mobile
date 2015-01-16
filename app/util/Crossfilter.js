// Crossfilter.js is intended to manage any filtering on the Products
// store that is implied by the filtering that is performed by the
// Search util on the Vendor store.
// 
// Therefore:
//
// 1) This util should not be called outside of Search.js
//
// 2) This util does not maintain its own internal state via
//    "options", it uses the products record from Search.js options.

Ext.define('WhatsFresh.util.Crossfilter', {

    singleton: true,

    require: ['WhatsFresh.util.Search'],

    constructor: function() {},

    buildCrossfilterFunction: function() {
        var Search = WhatsFresh.util.Search;
        var selectorRecord = Search.options.product;
        var filterable = Search.canFilterByProduct();

        var filter = function(productStoreRecord) {
            
            if (filterable){
                return productStoreRecord.name === selectorRecord.get('name');
            } else return true;

        };
        return filter;
    },

    applyCrossfilterToStore: function (store) {
        var singleton = WhatsFresh.util.Crossfilter;
        var filterFunction = singleton.buildCrossfilterFunction();
        var criteria = new Ext.util.Filter({
            filterFn : filterFunction,
            root : 'data'            
        });
        store.clearFilter();
        store.filter(criteria);
    }
});
