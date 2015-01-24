xdescribe('WhatsFresh.controller.List',function() {

    Ext.require('WhatsFresh.controller.List');

    var controller, app;
 
    beforeEach(function() {
        //Set up globals
        app = Ext.create('Ext.app.Application', {name: 'WhatsFresh'});
        // this checks that the controller is sourced correctly, see the top of List.js
        if(isPresent === true){
            // Do nothing
        }
        // We are not loading our store correctly here
        controller = Ext.create('WhatsFresh.controller.List', {application: app});
        controller.launch();
    });

    afterEach(function() {
        app.destroy();
    });
});
