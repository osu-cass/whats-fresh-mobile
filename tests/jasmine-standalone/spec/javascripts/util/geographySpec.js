describe('WhatsFresh.util.Geography', function () {

    Ext.require('WhatsFresh.util.Geography');
    /* global WhatsFresh */

    it('exists as a global singleton', function() {
        expect(WhatsFresh.util.Geography).toBeDefined();
        });

    describe('getDistance()', function () {

        it('calculates distance between points accurate to 100m', function () {
            var φ1= 44.0;
            var λ1= 120.0;
            var φ2= 44.0;
            var λ2= 121.0;
            var d = WhatsFresh.util.Geography.getDistance(φ1,λ1,φ2,λ2);
            expect(Math.abs(79990 - d)).toBeLessThan(100);
            });

        });

});
