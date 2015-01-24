describe('WhatsFresh.store.Distance',function() {

    var store;
 
    beforeEach(function() {
    	jasmine.Ajax.install();
    	store = Ext.create('WhatsFresh.store.Distance');
    });

    afterEach(function() {
	    jasmine.Ajax.uninstall();
        store = null;
    });

    it('exists', function() {
        expect(store.$className).toEqual('WhatsFresh.store.Distance');
    });

    it('Is populated with distance data', function(){
        expect(store.data.items[0].data.value).toEqual(200);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[1].data.value).toEqual(175);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[2].data.value).toEqual(150);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[3].data.value).toEqual(125);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[4].data.value).toEqual(100);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[5].data.value).toEqual(75);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[6].data.value).toEqual(50);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[7].data.value).toEqual(25);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[8].data.value).toEqual(20);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[9].data.value).toEqual(15);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[10].data.value).toEqual(10);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[11].data.value).toEqual(5);
    });

});
