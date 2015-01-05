describe('WhatsFresh.store.Distance',function() {

    // Ext.require('WhatsFresh.store.Distance');

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
        expect(store.data.items[0].data.val).toEqual(200);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[1].data.val).toEqual(175);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[2].data.val).toEqual(150);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[3].data.val).toEqual(125);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[4].data.val).toEqual(100);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[5].data.val).toEqual(75);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[6].data.val).toEqual(50);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[7].data.val).toEqual(25);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[8].data.val).toEqual(20);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[9].data.val).toEqual(15);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[10].data.val).toEqual(10);
    });
    it('Is populated with distance data', function(){
        expect(store.data.items[11].data.val).toEqual(5);
    });

});
