Ext.define('WhatsFresh.util.Search', {

    singleton: true,

    requires: ['WhatsFresh.util.Geography'],
    // Each of these options are of type record,
    // Thus we must send in a record from the controller
    options: {
        position: null,
        distance: null,
        location: null,
        product: null
    },

    constructor: function() {},

    /* ------------------------------------------------------------------------
       Filter Definition
       ------------------------------------------------------------------------
    */

    buildFilterFunction: function () {
        var singleton = WhatsFresh.util.Search;
        var Geo = WhatsFresh.util.Geography;
        var filter = function (vendorStoreRecord) {
            var pos= singleton.options.position;
            var dist= singleton.options.distance;
            var loc= singleton.options.location;
            var prod= singleton.options.product;
           
            // Composable filters
            var hasProduct, isNear, isInCity;

            // Discard placeholders
            if (vendorStoreRecord.is_not_filterable) return false;

            // If position and distance are set, filter on those. If
            // not, include everything.
            if (singleton.canFilterByDistance()) {
                var φ1= pos.coords.latitude;
                var λ1= pos.coords.longitude;
                var φ2= vendorStoreRecord.get('lat');
                var λ2= vendorStoreRecord.get('lng');
                var dMax= Geo.standardizeDistance(dist);
                var dCurr= Geo.getDistance(φ1,λ1,φ2,λ2);
                isNear= dMax - dCurr >= 0;
            } else {
                isNear= true;
            }

            // If location is set, filter on that. If not, include everything.
            if (singleton.canFilterByLocation()) {
                isInCity= loc.name === vendorStoreRecord.get('city');
            } else {
                isInCity= true;
            }

            // If the product is set, filter. If not, include everything.
            if (singleton.canFilterByProduct()) {
                var vendorProducts= vendorStoreRecord.get('products');
                hasProduct= false;
                for (var i = 0; i < vendorProducts.length; i++){
                    if (prod.name === vendorProducts[i].name){
                        hasProduct = true;
                        break;
                    }
                }
            } else {
                hasProduct= true;
            }
            // Return all filters
            return isNear && isInCity && hasProduct;
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
    applyFilterToStore: function (store) {
        console.log('$ filtering Vendors');
        var singleton= WhatsFresh.util.Search;
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

    canFilterByDistance: function () {
        var opt = this.options;
        var hasPosition = !!opt.position && !!opt.position.coords;
        var hasDistance = !!opt.distance && !!opt.distance.value;
        return hasPosition && hasDistance;
    },

    canFilterByLocation: function () {
        var opt = this.options;
        var isValidLocation = !!opt.location && !opt.location.is_not_filterable;
        return !this.canFilterByDistance() && isValidLocation;
    },
    
    canFilterByProduct: function () {
        var opt = this.options;
        return !!opt.product && !opt.product.is_not_filterable;
    }
});