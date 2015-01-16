describe('WhatsFresh.util.Crossfilter', function() {

    Ext.require('WhatsFresh.util.Crossfilter');

/*
  Should be implemented as a Jasmine Spy

    var SearchUtil;
    var SearchUtilStub = Ext.define('SearchUtilStub',{
            options : {
                product : null
            },
            canFilterByProduct : function(){
                return false;
            }
        });


    beforeEach(function() {
        // Stub out the Search util
        SearchUtil = WhatsFresh.util.Search;
        WhatsFresh.util.Search = Ext.create(SearchUtilStub);
    });

    afterEach(function() {
        // Restore Search util
        WhatsFresh.util.Search.destroy();
        WhatsFresh.util.Search = SearchUtil;
    });

*/

    it('exists as a global singleton', function() {
        expect(WhatsFresh.util.Crossfilter).toBeDefined();
    });

    it('can find search util options from the test harness', function() {
        expect(WhatsFresh.util.Search).toBeDefined();
        expect(WhatsFresh.util.Search.options.product).toBeDefined();
        expect(WhatsFresh.util.Search.options.product).toBeNull();
    });

    it('can create a filter for the product store', function() {
        var Crossfilter = WhatsFresh.util.Crossfilter;
        expect(Crossfilter.buildCrossfilterFunction).toBeDefined();
        var filter = Crossfilter.buildCrossfilterFunction();
        expect(filter).toBeDefined();
    });

    describe('buildFilterFunction', function() {

        var Search      = WhatsFresh.util.Search;
        var Crossfilter = WhatsFresh.util.Crossfilter;
        var filter;

        describe('when product is not set', function() {

            // Before single test:
            Search.options.product = null;
            spyOn(Search, 'canFilterByProduct').and.returnValue(false);
            filter = Crossfilter.buildCrossfilterFunction();

            it('includes any product', function() {
                var anyProduct = TestData.modelify(TestData.ProductArray[0]);
                expect(filter(anyProduct)).toBe(true);
            });

        });

        describe('when product is set', function() {
            
            beforeEach(function() {

                // Set up stub object
                Search.options.product = TestData.modelify(
                    {
                        name : 'One Fish'
                    }
                );
                spyOn(Search, 'canFilterByProduct').and.returnValue(true);

                filter = Crossfilter.buildCrossfilterFunction();
            });

            afterEach(function() {
                // Clean up stub
                Search.options.product = null;
            });

            it('includes products with matching names', function() {
                var model = TestData.modelify(TestData.ProductArray[0]);
                expect(filter(model)).toBe(true);
            });

            it('excludes products without matching names', function() {
                var model = TestData.modelify(TestData.ProductArray[1]);
                expect(filter(TestData.ProductArray[1])).toBe(false);
            });

        });

    });
    
});
