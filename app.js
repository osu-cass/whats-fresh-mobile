Ext.application({
  name: 'OregonsCatch',

  requires: [
    'Ext.MessageBox',
    'OregonsCatch.util.API',
    'OregonsCatch.util.CrossFilter'
  ],

  views: [
    'Error',
    'Home',
    'ProductMapList',
    'ProductInfo',
    'SimpleImagesView',
    'SimpleVideosView',
    'VendorMapList',
    'VendorInfo'
  ],

  controllers: [
    'Error',
    'Home',
    'ProductMapList',
    'ProductInfo',
    'SimpleImagesView',
    'SimpleVideosView',
    'VendorMapList',
    'VendorInfo'
  ],

  models: [
    'Location',
    'Product',
    'Story',
    'Vendor',
    'Preparation',
    'ProductPreparation'
  ],

  stores: [
    'Distances',
    'Locations',
    'Products',
    'Stories',
    'Vendors'
  ],

  launch: function () {
    var _this = this;

    // Load the API into the millions of stores.
    OregonsCatch.util.CrossFilter.appStart();

    // Views must be manually instantiated.
    // Add home view first to show it.
    Ext.Viewport.add(Ext.create('OregonsCatch.view.Home'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductMapList'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.ProductInfo'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleImagesView'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.SimpleVideosView'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.VendorMapList'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.VendorInfo'));
    Ext.Viewport.add(Ext.create('OregonsCatch.view.Error'));

    // Android back button functionality.

    function onBackKeyDown (e) {
      e.preventDefault();
      if (OregonsCatch.util.Back.history.length) {
        OregonsCatch.util.Back.pop();
      } else {
        navigator.app.exitApp();
      }
    }

    if (Ext.os.is('Android')) {
      document.addEventListener('backButton', Ext.bind(onBackKeyDown, _this), false);
    }

    // This is a hacky solution to the problem:
    // Cordova cannot handle inline hrefs to external pages.
    // This forces links to open with JS instead.
    Ext.Viewport.element.dom.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() !== 'a') { return; }
      var url = e.target.getAttribute('href');
      e.preventDefault();
      ga.trackEvent('Open Link', url);
      OregonsCatch.util.Link.openLink(url);
    }, false);

    // Finally, bring the user into the app.
    setTimeout(function () {
      try {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Splashscreen auto-hide is disabled
        navigator.splashscreen.hide();
        // Google Analytics: What's Fresh Beta
        ga.startTrackerWithId('UA-92638695-2');
        // Send initial load event
        _this.getController('Home').load();
      } catch (err) {
        console.error(err);
        _this.getController('Error').goto();
      }
    }, 2000);
  }
});
