Ext.define('WhatsFresh.util.Geography', {

    // Class should be used statically.
    singleton: true,

    // WolframAlpha
    Reference: {
        Earth: {
            'average radius': 6367444.7,// meters
            'oblateness': 0.0033528197// unitless
        },
        Units: {
            'miles': {
                meters: 1609.344
            },
            'meters': {
                meters: 1.0
            }
        }
    },

    /**
     * Calculates distance between two Earth surface coordinates.
     * Uses haversine formula for great-circle minumum distance.
     * DOES NOT use oblateness.
     * DOES NOT use significant figures.
     * From: http://www.movable-type.co.uk/scripts/latlong.html
     * @param  {number} lat1First point's latitude.
     * @param  {number} lng1First point's longitude.
     * @param  {number} lat2Second point's latitude.
     * @param  {number} lng2Second point's longitude.
     * @return {number}Sphere arc length in meters.
     */
    getDistance: function (lat1, lng1, lat2, lng2) {
        var geo= WhatsFresh.util.Geography;
        var R= geo.Reference.Earth['average radius'];
        var φ1= geo.degreesToRadians(lat1);
        var φ2= geo.degreesToRadians(lat2);
        var Δφ= geo.degreesToRadians(lat2-lat1); // φ is latitude
        var Δλ= geo.degreesToRadians(lng2-lng1); // λ is longitude
        var a= Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c= 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d= R * c;
        return d;
    },

    /**
     * Only accepts what units are defined in Reference above.
     */
    standardizeDistance: function (distanceRecord) {
        var Units = WhatsFresh.util.Geography.Reference.Units;
        return Units[distanceRecord.unit].meters * distanceRecord.value;
    },

    /* ------------------------------------------------------------------------
       Utility and Helper Functions
       ------------------------------------------------------------------------
    */

    // Converts Euclidean degrees into radians.
    degreesToRadians: function (degrees) {
        return degrees * Math.PI / 180;
    },

    // Converts Euclidean radians into degress.
    radiansToDegrees: function (radians) {
        return radians * 180 / Math.PI;
    }

});
