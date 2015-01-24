describe('WhatsFresh.util.ProductSearch', function () {

    Ext.require('WhatsFresh.util.ProductSearch');
    /* global WhatsFresh */

    it('exists as a global singleton', function() {
        expect(WhatsFresh.util.ProductSearch).toBeDefined();
    });

    it('can create a store-filtering function', function() {
        var Search = WhatsFresh.util.ProductSearch;
        expect(Search.buildFilterFunction).toBeDefined();
        var filter = Search.buildFilterFunction();
        expect(filter).toBeDefined();
    });

    describe('buildFilterFunction()', function () {

        var Search = WhatsFresh.util.ProductSearch;
        var firstSearch = WhatsFresh.util.Search;

        var filter;

        beforeEach( function (){
            firstSearch.options.product= TestData.ProductArray[0];
            filter= Search.buildFilterFunction();
        });

        afterEach( function (){
            filter= null;
        });

        it('includes a vendor with the given product', function () {
            var model= TestData.modelify(TestData.ProductArray[0]);
            console.log(model);
            expect(filter(model)).toBe(true);
        });

        it('excludes a vendor not carrying the given product', function () {
            var model= TestData.modelify(TestData.ProductArray[1]);
            expect(filter(model)).toBe(false);
        });
    });

});