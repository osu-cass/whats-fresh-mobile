describe('WhatsFresh.util.Link', function(){

	Ext.require('WhatsFresh.util.Link');

	it('exists', function(){
		expect(WhatsFresh.util.Link).toBeDefined();
	});

	it('Navigation function exists', function(){
		Link = WhatsFresh.util.Link;
		expect(Link.openNavigation).toBeDefined();
	});

	describe('WhatsFresh.util.Link.formatVideoLink', function(){
		it('Format function exists',function(){
			Link = WhatsFresh.util.Link;
			expect(Link.formatVideoLink).toBeDefined();
		});

		it('Formats a video link properly', function(){
			Link = WhatsFresh.util.Link;
			var videoLink = TestData.StoryArray[0].videos[0].link;
			videoLink = Link.formatVideoLink(videoLink);
			expect(videoLink).toBe('efgDdSWDg0g');
		});

		it('Formats a video link with options properly', function(){
			Link = WhatsFresh.util.Link;
			var videoLink = "http://youtube.com/watch?v=somevalue&time=someoption";
			videoLink = Link.formatVideoLink(videoLink);
			expect(videoLink).toBe('somevalue');
		});
	});
});
