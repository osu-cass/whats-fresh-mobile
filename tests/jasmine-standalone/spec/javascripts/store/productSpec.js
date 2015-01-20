describe('WhatsFresh.store.Product',function() {

    var store;

    beforeEach(function() {
	jasmine.Ajax.install();
	store = Ext.create('WhatsFresh.store.Product');
    });

    afterEach(function() {
	jasmine.Ajax.uninstall();
        store = null;
    });


    it('exists', function() {
        expect(store.$className).toEqual('WhatsFresh.store.Product');
    });

    it('calls out to the proper url', function() {
	store.load();
	var request = jasmine.Ajax.requests.mostRecent();
	expect(request.url).toEqual('http://seagrant-staging.osuosl.org/1/products');
    });

    it('loads data from an api', function(){
	store.load();
	var mockedRequest = jasmine.Ajax.requests.mostRecent();
	mockedRequest.response({
	    status: 200,
	    responseText:[
		{
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
		}
	    ]
        });
	expect(store.getCount()).toEqual(1);
	expect(store.getAt(0).get('origin')).toEqual('TEST');
	expect(store.getAt(0).get('available')).toEqual(false);
	expect(store.getAt(0).get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
	expect(store.getAt(0).get('variety')).toEqual('testing');
	expect(store.getAt(0).get('season')).toEqual('year-round');
	expect(store.getAt(0).get('image')).toEqual(null);
	expect(store.getAt(0).get('created')).toEqual('at testing time');
	expect(store.getAt(0).get('modified')).toEqual('never');
	expect(store.getAt(0).get('market_price')).toEqual(0);
	expect(store.getAt(0).get('link')).toEqual(null);
	expect(store.getAt(0).get('alt_name')).toEqual('Pretend Product, Elaborate Ruse');
        expect(store.getAt(0).get('story')).toEqual(null);
	expect(store.getAt(0).get('name')).toEqual('Test Product Instance');
    });

    it('loads multiple datas from an api', function(){
	store.load();
	var mockedRequest = jasmine.Ajax.requests.mostRecent();
	mockedRequest.response({
	    status: 200,
	    responseText:[
		{
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
		},
		{
		    origin: 'TEST2',
                    available: true,
                    description: 'This product is merely conceptual in nature and cannot be purchased.',
                    variety: 'testing2',
                    season: 'year-round2',
                    image: null,
                    created: 'at testing time2',
                    modified: 'never2',
                    market_price: 10.55,
                    link: null,
                    alt_name: 'Pretend Product, Elaborate Ruse2',
                    story: null,
                    name: 'Test Product Instance2'
		}
	    ]
        });
	expect(store.getCount()).toEqual(2);
	expect(store.getAt(0).get('origin')).toEqual('TEST');
	expect(store.getAt(0).get('available')).toEqual(false);
	expect(store.getAt(0).get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
	expect(store.getAt(0).get('variety')).toEqual('testing');
	expect(store.getAt(0).get('season')).toEqual('year-round');
	expect(store.getAt(0).get('image')).toEqual(null);
	expect(store.getAt(0).get('created')).toEqual('at testing time');
	expect(store.getAt(0).get('modified')).toEqual('never');
	expect(store.getAt(0).get('market_price')).toEqual(0);
	expect(store.getAt(0).get('link')).toEqual(null);
        expect(store.getAt(0).get('alt_name')).toEqual('Pretend Product, Elaborate Ruse');
        expect(store.getAt(0).get('story')).toEqual(null);
        expect(store.getAt(0).get('name')).toEqual('Test Product Instance');

	//data store 2
	expect(store.getAt(1).get('origin')).toEqual('TEST2');
        expect(store.getAt(1).get('available')).toEqual(true);
        expect(store.getAt(1).get('description')).toEqual('This product is merely conceptual in nature and cannot be purchased.');
        expect(store.getAt(1).get('variety')).toEqual('testing2');
        expect(store.getAt(1).get('season')).toEqual('year-round2');
        expect(store.getAt(1).get('image')).toEqual(null);
        expect(store.getAt(1).get('created')).toEqual('at testing time2');
        expect(store.getAt(1).get('modified')).toEqual('never2');
        expect(store.getAt(1).get('market_price')).toEqual(10.55);
        expect(store.getAt(1).get('link')).toEqual(null);
        expect(store.getAt(1).get('alt_name')).toEqual('Pretend Product, Elaborate Ruse2');
        expect(store.getAt(1).get('story')).toEqual(null);
        expect(store.getAt(1).get('name')).toEqual('Test Product Instance2');
    });

    it('automatically populates itself with API data', function() {

        pending(); // Feature not yet implemented.

        store = Ext.create('WhatsFresh.store.Product');
        //Let's test this with sample data.
        expect(store.data.length).toBeGreaterThan(0);
    });
});
