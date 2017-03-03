Ext.define('OregonsCatch.controller.Error', {
  extend: 'Ext.app.Controller',
  requires: [
    'OregonsCatch.util.Back'
  ],

  config: {
    refs: {
      ErrorView: 'ErrorView'
    }
  },

  launch: function () {
    var ctlr = this;

    var goods = ctlr.goods = {};

    function hasErrors () {
      for (var k in goods) {
        if (!goods[k]) {
          return true;
        }
      }
    }

    function isShowingError () {
      return Ext.Viewport.getActiveItem() === ctlr.getErrorView();
    }

    function handleErrors (storeName) {
      Ext.getStore(storeName)
      .addListener('load', function (store, records, successful, operation, eOpts) {
        goods[storeName] = successful;
        if (!window.google || hasErrors() && !isShowingError()) {
          console.log('Displaying error screen.');
					// null values prevent the util from trying to load data
          OregonsCatch.util.Back.push(null, null);
          Ext.Viewport.animateActiveItem(ctlr.getErrorView(), {type: 'fade'});
          ga('send', 'screenview', { 'screenName': 'Error' });
        }
      });
    }

    // Actually attach to the stores.

    handleErrors('Locations');
    handleErrors('Products');
    handleErrors('Vendors');
    handleErrors('Stories');
  }

});
