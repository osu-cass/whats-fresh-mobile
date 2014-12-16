describe('WhatsFresh.store.Location',function() {

    var store;

    beforeEach(function() {
	jasmine.Ajax.install();
	store = Ext.create('WhatsFresh.store.Location');
    });

    afterEach(function() {
	jasmine.Ajax.uninstall();
        store = null;
    });


    it('exists', function() {
        expect(store.$className).toEqual('WhatsFresh.store.Location');
    });

    it('calls out to the proper url', function() {
	store.load();
	var request = jasmine.Ajax.requests.mostRecent();
	expect(request.url).toEqual('http://seagrant-staging.osuosl.org/1/locations');
    });

    it('loads data from an api', function(){
	store.load();
	var mockedRequest = jasmine.Ajax.requests.mostRecent();
	mockedRequest.response({
	    status: 200,
	    responseText:[
		{
		    title: 'Test',
		    text: 'New test stuff',
		    value: 1,
		    products: 'test prod',
		    Latlng: null,
		    id: 1,
		    address: 'new test address',
		    desc: 'test description'
		}
	    ]
        });
	expect(store.getCount()).toEqual(1);
	expect(store.getAt(0).get('title')).toEqual('Test');
	expect(store.getAt(0).get('text')).toEqual('New test stuff');
	expect(store.getAt(0).get('value')).toEqual(1);
	expect(store.getAt(0).get('products')).toEqual('test prod');
	expect(store.getAt(0).get('Latlng')).toEqual(null);
	expect(store.getAt(0).get('id')).toEqual(1);
	expect(store.getAt(0).get('address')).toEqual('new test address');
	expect(store.getAt(0).get('desc')).toEqual('test description');
    });

    it('loads multiple datas from an api', function(){
	store.load();
	var mockedRequest = jasmine.Ajax.requests.mostRecent();
	mockedRequest.response({
	    status: 200,
	    responseText:[
		{
		    title: 'Test1',
		    text: 'New test stuff1',
		    value: 1,
		    products: 'test prod1',
		    Latlng: null,
		    id: 1,
		    address: 'new test address1',
		    desc: 'test description1'
		},
		{
		    title: 'Test2',
		    text: 'New test stuff2',
		    value: 2,
		    products: 'test prod2',
		    Latlng: null,
		    id: 2,
		    address: 'new test address2',
		    desc: 'test description2'
		}
	    ]
        });
	expect(store.getCount()).toEqual(2);
	expect(store.getAt(0).get('title')).toEqual('Test1');
	expect(store.getAt(0).get('text')).toEqual('New test stuff1');
	expect(store.getAt(0).get('value')).toEqual(1);
	expect(store.getAt(0).get('products')).toEqual('test prod1');
	expect(store.getAt(0).get('Latlng')).toEqual(null);
	expect(store.getAt(0).get('id')).toEqual(1);
	expect(store.getAt(0).get('address')).toEqual('new test address1');
	expect(store.getAt(0).get('desc')).toEqual('test description1');
	//data store 2
	expect(store.getAt(1).get('title')).toEqual('Test2');
	expect(store.getAt(1).get('text')).toEqual('New test stuff2');
	expect(store.getAt(1).get('value')).toEqual(2);
	expect(store.getAt(1).get('products')).toEqual('test prod2');
	expect(store.getAt(1).get('Latlng')).toEqual(null);
	expect(store.getAt(1).get('id')).toEqual(2);
	expect(store.getAt(1).get('address')).toEqual('new test address2');
	expect(store.getAt(1).get('desc')).toEqual('test description2');
    });

    it('automatically populates itself with API data', function() {

        pending(); // Feature not  yet implemented.

        store = Ext.create('WhatsFresh.store.Location');
        //Let's test this with sample data.
        console.log(store);
        expect(store.data.length).toBeGreaterThan(0);
    });
});
