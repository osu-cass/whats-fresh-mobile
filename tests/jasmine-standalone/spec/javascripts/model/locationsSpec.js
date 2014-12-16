describe('WhatsFresh.model.Locations', function() {

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
        model = Ext.create('WhatsFresh.model.Locations');
        expect(model.$className).toEqual('WhatsFresh.model.Locations');
    });

    it('stores profile data on locations', function() {
        //Test model fields
        model = Ext.create('WhatsFresh.model.Locations',{
           title: 'Test',
           text: 'test',
           value: 1,
           products: 'test prod',
           Latlng: null,
           id: 1,
           address: 'this is a test address',
           desc: 'test description'
        });
        
        //Justin will expect these to be moved into a helper function.
        //Please see Justin if you have questions.
        expect(model.get('title')).toEqual('Test');
        expect(model.get('text')).toEqual('test');
        expect(model.get('value')).toEqual(1);
        expect(model.get('products')).toEqual('test prod');
        expect(model.get('Latlng')).toBeNull();
        expect(model.get('id')).toEqual(1);
        expect(model.get('address')).toEqual('this is a test address');
        expect(model.get('desc')).toEqual('test description');          
    });
});
