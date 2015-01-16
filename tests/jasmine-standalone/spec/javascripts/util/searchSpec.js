describe('WhatsFresh.util.Search', function () {

    Ext.require('WhatsFresh.util.Search');
    /* global WhatsFresh */

    it('exists as a global singleton', function() {
        expect(WhatsFresh.util.Search).toBeDefined();
    });

    it('has options that are null by default', function() {
        expect(WhatsFresh.util.Search.options).toBeDefined();
        expect(WhatsFresh.util.Search.options.position).toBeNull();
        expect(WhatsFresh.util.Search.options.distance).toBeNull();
        expect(WhatsFresh.util.Search.options.location).toBeNull();
        expect(WhatsFresh.util.Search.options.product).toBeNull();
    });

    it('has filter-by logic functions', function() {
        var Search = WhatsFresh.util.Search;
        expect(Search.canFilterByDistance).toBeDefined();
        expect(Search.canFilterByLocation).toBeDefined();
        expect(Search.canFilterByProduct).toBeDefined();
    });

    it('can create a store-filtering function', function() {
        var Search = WhatsFresh.util.Search;
        expect(Search.buildFilterFunction).toBeDefined();
        var filter = Search.buildFilterFunction();
        expect(filter).toBeDefined();
    });

    describe('buildFilterFunction()', function () {

        var Search = WhatsFresh.util.Search;

        beforeEach(function () {
            // Reset the properties on the singleton.
            // Prevents cross-test pollution.
            Search.options.position = null;
            Search.options.distance = null;
            Search.options.location = null;
            Search.options.product  = null;
            // These may be overridden by testcase beforeEach
        });

        describe('where all options are null', function () {

            it('cannot filter-by distance', function() {
                expect(Search.canFilterByDistance()).toBe(false);
            });

            it('cannot filter-by location', function() {
                expect(Search.canFilterByLocation()).toBe(false);
            });

            it('cannot filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(false);
            });

            it('includes any vendor', function() {
                var filter = Search.buildFilterFunction();
                var anyVendor = TestData.VendorArray[0];
                expect(filter(anyVendor)).toBe(true);
            });

        });

        describe('where position and distance are set and product is not set', function () {

            var filter;

            beforeEach(function () {
                Search.options.position = {
                    coords: {
                        latitude: 44.0,
                        longitude: 120.0
                    }
                };
                Search.options.distance = {
                    value: 50,
                    unit: 'miles'
                };
                filter = Search.buildFilterFunction();
            });

            afterEach(function () {
                filter = null;
            });

            it('can filter-by distance', function () {
                expect(Search.canFilterByDistance()).toBe(true);
            });

            it('cannot filter-by location', function () {
                expect(Search.canFilterByLocation()).toBe(false);
            });

            it('cannot filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(false);
            });

            it('includes a point within 50 miles', function () {
                var model = TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('includes a point still within 50 miles', function () {
                var model = TestData.modelify(TestData.VendorArray[1]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a point beyond 50 miles', function () {
                var model = TestData.modelify(TestData.VendorArray[2]);
                expect(filter(model)).toBe(false);
            });

        });

        describe('where location is set and product is not set', function () {

            var filter;

            beforeEach(function () {
                Search.options.location = TestData.LocationArray[0];
                filter = Search.buildFilterFunction();
            });

            afterEach(function () {
                filter = null;
            });

            it('cannot filter-by distance', function () {
                expect(Search.canFilterByDistance()).toBe(false);
            });

            it('can filter-by location', function () {
                expect(Search.canFilterByLocation()).toBe(true);
            });

            it('cannot filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(false);
            });

            it('includes a point with same city name', function () {
                var model = TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a point with different city name', function () {
                var model = TestData.modelify(TestData.VendorArray[1]);
                expect(filter(model)).toBe(false);
            });

            it('excludes a point with no city name', function () {
                var model = TestData.modelify(TestData.VendorArray[2]);
                expect(filter(model)).toBe(false);
            });

        });

        describe('where position and location are set, but product is not', function () {

            var filter;

            beforeEach(function () {
                Search.options.position = {
                    coords: {
                        latitude: 44.0,
                        longitude: 120.0
                    }
                };
                Search.options.distance = {
                    value: 50,
                    unit: 'miles'
                };
                Search.options.location = TestData.LocationArray[0];
                filter = Search.buildFilterFunction();
            });

            afterEach(function () {
                filter = null;
            });

            it('can filter-by distance', function () {
                expect(Search.canFilterByDistance()).toBe(true);
            });

            it('cannot filter-by location', function () {
                expect(Search.canFilterByLocation()).toBe(false);
            });

            it('cannot filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(false);
            });

            it('includes a point within 50 miles with no city', function () {
                var model = TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a point beyond 50 miles with same city', function () {
                var model = TestData.modelify(TestData.VendorArray[2]);
                expect(filter(model)).toBe(false);
            });

        });

        describe('when only product is set', function () {
            
            var filter;

            beforeEach( function (){
                Search.options.product= TestData.ProductArray[0];
                filter= Search.buildFilterFunction();
            });

            afterEach( function (){
                filter= null;
            });

            it('cannot filter-by distance', function () {
                expect(Search.canFilterByDistance()).toBe(false);
            });

            it('cannot filter-by location', function () {
                expect(Search.canFilterByLocation()).toBe(false);
            });

            it('can filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(true);
            });

            it('includes a vendor with the given product', function () {
                var model= TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a vendor not carrying the given product', function () {
                var model= TestData.modelify(TestData.VendorArray[1]);
                expect(filter(model)).toBe(false);
            });

        });

        describe('when position and distance are set and product is set.', function () {

            var filter;

            beforeEach( function (){
                Search.options.position = {
                    coords: {
                        latitude: 44.0,
                        longitude: 120.0
                    }
                };
                Search.options.distance = {
                    value: 50,
                    unit: 'miles'
                };
                Search.options.product= TestData.ProductArray[0];
                filter= Search.buildFilterFunction();
            });

            afterEach( function (){
                filter= null;
            });

            it('can filter-by distance', function () {
                expect(Search.canFilterByDistance()).toBe(true);
            });

            it('cannot filter-by location', function () {
                expect(Search.canFilterByLocation()).toBe(false);
            });

            it('can filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(true);
            });

            it('includes a point within 50 miles with selected product', function () {
                var model = TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a point beyond 50 miles with selected product', function () {
                var model = TestData.modelify(TestData.VendorArray[2]);
                expect(filter(model)).toBe(false);
            });

            it('excludes a point within 50 miles and different products', function () {
                var model = TestData.modelify(TestData.VendorArray[3]);
                expect(filter(model)).toBe(false);
            });
            
        });

        describe('When location is set and product is set', function () {

            var filter;

            beforeEach( function (){
                Search.options.location = TestData.LocationArray[0];
                Search.options.product= TestData.ProductArray[0];
                filter= Search.buildFilterFunction();
            });

            afterEach( function (){
                filter= null;
            });

            it('cannot filter-by distance', function () {
                expect(Search.canFilterByDistance()).toBe(false);
            });

            it('can filter-by location', function () {
                expect(Search.canFilterByLocation()).toBe(true);
            });

            it('can filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(true);
            });

            it('includes a point with same city name and selected product', function () {
                var model = TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a point with different city name and selected product', function () {
                var model = TestData.modelify(TestData.VendorArray[2]);
                expect(filter(model)).toBe(false);
            });

            it('excludes a point with same city name and different products', function () {
                var model = TestData.modelify(TestData.VendorArray[3]);
                expect(filter(model)).toBe(false);
            });

        });

        describe('When all options are set', function () {

            var filter;

            beforeEach( function (){
                Search.options.position = {
                    coords: {
                        latitude: 44.0,
                        longitude: 120.0
                    }
                };
                Search.options.distance = {
                    value: 50,
                    unit: 'miles'
                };
                Search.options.location = TestData.LocationArray[0];
                Search.options.product= TestData.ProductArray[0];
                filter= Search.buildFilterFunction();
            });

            afterEach( function (){
                filter= null;
            });

            it('filter behaves as though distance and product are set', function() {
                expect(Search.canFilterByDistance()).toBe(true);
                expect(Search.canFilterByLocation()).toBe(false);
                expect(Search.canFilterByProduct()).toBe(true);
            });

            it('includes a point within 50 miles with selected product', function () {
                var model = TestData.modelify(TestData.VendorArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes a point beyond 50 miles with selected product', function () {
                var model = TestData.modelify(TestData.VendorArray[2]);
                expect(filter(model)).toBe(false);
            });

            it('excludes a point within 50 miles and different products', function () {
                var model = TestData.modelify(TestData.VendorArray[3]);
                expect(filter(model)).toBe(false);
            });

        });

    });

});
