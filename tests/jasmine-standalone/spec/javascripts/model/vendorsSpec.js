describe('WhatsFresh.model.Vendors', function() {

    var model;

    beforeEach(function() {
        //Set up globals
        expect(model).toBeUndefined();
    });

    afterEach(function() {
        //Take down globals
        model = model.destroy();
    });

    it('exists', function() {
        model = Ext.create('WhatsFresh.model.Vendors');
        expect(model.$className).toEqual('WhatsFresh.model.Vendors');
    });

    it('stores profile data on vendors', function() {
        //Write vendor model field tests and then implement them such
        //that they pass.
		model = Ext.create('WhatsFresh.model.Vendors',{
			city: 'Newport',
			updated: true,
			description: 'a place with stuff',
			zip: '97523',
			created: true,
			ext: false,
			location_description: 'its a place with a thing',
			lng: '45',
			lat: '45',
			email: 'user@email.com',
			website: 'site.com',
			phone: '555-555-5555',
			state: 'OR',
			street: 'corner street',
			products: ['fish', 'shellfish', 'more fish'],
			contact_name: 'John Doe',
			story: 'see other side',
			name: 'fish place'
		});
		//Make sure that the model was properly assigned
		expect(model.get('city')).toEqual('Newport');
		expect(model.get('updated')).toEqual(true);
		expect(model.get('description')).toEqual('a place with stuff');
		expect(model.get('zip')).toEqual('97523');
		expect(model.get('created')).toEqual(true);
		expect(model.get('ext')).toEqual(false);
		expect(model.get('location_description')).toEqual('its a place with a thing');
		expect(model.get('lng')).toEqual('45');
		expect(model.get('lat')).toEqual('45');
		expect(model.get('email')).toEqual('user@email.com');
		expect(model.get('website')).toEqual('site.com');
		expect(model.get('phone')).toEqual('555-555-5555');
		expect(model.get('state')).toEqual('OR');
		expect(model.get('street')).toEqual('corner street');
		expect(model.get('products')).toEqual(['fish', 'shellfish', 'more fish']);
		expect(model.get('contact_name')).toEqual('John Doe');
		expect(model.get('story')).toEqual('see other side');
		expect(model.get('name')).toEqual('fish place');
    });
});
