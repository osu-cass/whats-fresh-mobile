StartTest(function(t) {
	t.diag("My simple test page");
	t.requireOk( ['WhatsFresh.view.Home'], function(){
		t.chain(
		{
			waitFor: 'CQ',
			args: '#goButton',
			desc: 'Should find home screen on app start'
		},
		function(next){
			t.ok(t.cq1('#goButton'), 'Should find a Go button');
		}


		// {
		// 	waitFor: 'componentVisible',
		// 	args: '#goButton'
		// }
	);
	});
	
});