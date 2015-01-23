describe('WhatsFresh.util.Link', function(){

	Ext.require('WhatsFresh.util.Link');

	it('exists', function(){
		expect(WhatsFresh.util.Link).toBeDefined();
	});

	it('Navigation function exists', function(){
		Link = WhatsFresh.util.Link;
		expect(Link.openNavigation).toBeDefined();
	});
});
