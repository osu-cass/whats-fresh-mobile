describe('WhatsFresh.util.ProductSearch', function () {

    Ext.require('WhatsFresh.util.ProductSearch');
    /* global WhatsFresh */

    it('exists as a global singleton', function() {
        expect(WhatsFresh.util.ProductSearch).toBeDefined();
    });

    it('has options that are null by default', function() {
        expect(WhatsFresh.util.ProductSearch.options).toBeDefined();
        expect(WhatsFresh.util.ProductSearch.options.product).toBeNull();
    });

    it('has filter-by logic functions', function() {
        var Search = WhatsFresh.util.ProductSearch;
        expect(Search.canFilterByProduct).toBeDefined();
    });

    it('can create a store-filtering function', function() {
        var Search = WhatsFresh.util.ProductSearch;
        expect(Search.buildFilterFunction).toBeDefined();
        var filter = Search.buildFilterFunction();
        expect(filter).toBeDefined();
    });

    describe('buildFilterFunction()', function () {

        var Search = WhatsFresh.util.ProductSearch;

        beforeEach(function () {
            // Reset the properties on the singleton.
            // Prevents cross-test pollution.
            Search.options.product  = null;
            // These may be overridden by testcase beforeEach
        });

        describe('when product is not set', function () {

            it('cannot filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(false);
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

            it('can filter-by product', function() {
                expect(Search.canFilterByProduct()).toBe(true);
            });
        });

    });

});