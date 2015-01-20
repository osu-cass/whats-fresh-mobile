describe('WhatsFresh.model.Products', function() {

    var model;

    beforeEach(function() {
        //Set up test resources
        expect(model).toBeUndefined();
    });

    afterEach(function() {
        //Dispose of test resources
        model = model.destroy();
    });

    it('exists', function() {
        model = Ext.create('WhatsFresh.model.Products');
        expect(model.$className).toEqual('WhatsFresh.model.Products');
    });

    it('stores profile data on products', function() {
        //Test model fields
        model = Ext.create('WhatsFresh.model.Products',{
            origin: 'TEST',
            available: false,
            description: 'This product is merely conceptual in nature and cannot be purchased.',
            variety: 'testing',
            season: 'year-round',
            image: null,
            created: 'at testing time',
            modified: 'never',
            market_price: 0,
            link: null,
            alt_name: 'Pretend Product, Elaborate Ruse',
            story: null,
            name: 'Test Product Instance'
        });
        
        //Justin will expect these to be moved into a helper function.
        //Please see Justin if you have questions.
        expect(model.get('name')).toEqual('Test Product Instance');
        expect(model.get('story')).toBeNull();
        expect(model.get('alt_name')).toEqual('Pretend Product, Elaborate Ruse');
        expect(model.get('link')).toBeNull();
        expect(model.get('market_price')).toEqual(0);
        expect(model.get('modified')).toEqual('never');
        expect(model.get('created')).toEqual('at testing time');
        expect(model.get('image')).toBeNull();
        expect(model.get('season')).toEqual('year-round');
        expect(model.get('variety')).toEqual('testing');
        expect(model.get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
        expect(model.get('available')).toBe(false);
        expect(model.get('origin')).toEqual('TEST');                
    });
});
