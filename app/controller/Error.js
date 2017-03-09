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
      if (typeof google === 'undefined') { return true; }
      if (typeof ga === 'undefined') { return true; }
    }

    function isShowingError () {
      return Ext.Viewport.getActiveItem() === ctlr.getErrorView();
    }

    function handleErrors (storeName) {
      Ext.getStore(storeName)
      .addListener('load', function (store, records, successful, operation, eOpts) {
        goods[storeName] = successful;
        if (hasErrors() && !isShowingError()) ctlr.goto();
      });
    }

    // Actually attach to the stores.

    handleErrors('Locations');
    handleErrors('Products');
    handleErrors('Vendors');
    handleErrors('Stories');
  },

  goto: function () {
    const _this = this;
    console.log('Displaying error screen.');
    OregonsCatch.util.Back.push(null, null); // null values prevent the util from trying to load data
    Ext.Viewport.animateActiveItem(_this.getErrorView(), {type: 'fade'});
    ga.trackView('Error');
    ga.trackException('Load Error', true);
  }

});
