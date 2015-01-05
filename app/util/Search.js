Ext.define('WhatsFresh.util.Search', {

    singleton: true,

    requires: [],
    
    options: {
        position: null,
        distance: null,
        location: null,
    },

    constructor: function() {},

    /* ------------------------------------------------------------------------
       Filter Definition
       ------------------------------------------------------------------------
    */

    buildFilterFunction: function () {
        var singleton = WhatsFresh.util.Search;
        var Geo = WhatsFresh.util.Geography;
        var filter = function (pointOfInterestRecord) {
            var pos= singleton.options.position;
            var dist= singleton.options.distance;
            var loc= singleton.options.location;
            var poi= pointOfInterestRecord;

            // If position and distance are set, filter on those.
            if (singleton.canFilterByDistance()) {
                var φ1= pos.coords.latitude;
                var λ1= pos.coords.longitude;
                var φ2= poi.get('lat');
                var λ2= poi.get('lng');
                var dMax= Geo.standardizeDistance(dist);
                var dCurr= Geo.getDistance(φ1,λ1,φ2,λ2);
                var isNear= dMax - dCurr >= 0;
                return isNear;
            }

            // If location is set, filter on that instead.
            if (singleton.canFilterByLocation()) {
                return loc.name === poi.get('city');
            }

            // Otherwise, include everything.
            return true;
        };
        return filter;
    },

    applyFilterToStore: function () {
        
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
    }
});
