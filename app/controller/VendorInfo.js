Ext.define('OregonsCatch.controller.VendorInfo', {
  extend: 'Ext.app.Controller',
  requires: [
    'OregonsCatch.util.API',
    'OregonsCatch.util.Back',
    'OregonsCatch.util.CrossFilter',
    'Ext.MessageBox'
  ],

  config: {
    refs: {
      HomeView: 'HomeView',
      VendorMapList: 'VendorMapListView',
      ProductInfo: 'ProductInfoView',
      View: 'VendorInfoView',
      Title: 'VendorInfoView #Title',
      Description: 'VendorInfoView #Description',
      LocationDescription: 'VendorInfoView #LocationDescription',
      Contact: 'VendorInfoView #Contact',
      Address: 'VendorInfoView #Address',
      MapImage: 'VendorInfoView #MapImage',
      List: 'VendorInfoView #List'
    },
    control: {
      'VendorInfoView #BackButton': { tap: 'onBack' },
      'VendorInfoView #HomeButton': { tap: 'onHome' },
      MapImage: { tap: 'onNavigate' },
      List: {
        disclose: 'onDisclose',
        itemdoubletap: 'onListDoubleTap'
      }
    }
  },

  launch: function () {
    var ctlr = this;
    var CF = OregonsCatch.util.CrossFilter;
    ctlr.getList().setStore(CF.filtered.prodpreps);
  },

  onBack: function () { OregonsCatch.util.Back.pop(); },
  onHome: function () { OregonsCatch.util.Back.clear(); },

  load: function (vendor) {
    var ctlr = this;
    ctlr._vendor = vendor;

    var CF = OregonsCatch.util.CrossFilter;
    var Link = OregonsCatch.util.Link;
    CF.parameters.product = null;
    CF.parameters.preparation = null;
    CF.parameters.vendor = vendor;
    CF.refilter();

    CF.filtered.prodpreps.removeAll();
    for (var i = 0; i < vendor.get('products').length; i++) {
      CF.filtered.prodpreps.add(vendor.get('products')[i]);
    }

		// Population
    ctlr.getTitle().setTitle(vendor.get('name'));
    if (vendor.get('name').length > 14) { ctlr.getTitle().setTitle('Vendor Info'); }
    ctlr.getDescription().setData(vendor.data);

    var ifShow = function (data, element) {
      if (data) {
        element.show();
      } else {
        element.hide();
      }
    };

    ctlr.getLocationDescription().setData(vendor.data);
    ifShow(vendor.get('location_description'), ctlr.getLocationDescription());

    ctlr.getContact().setData(vendor.data);

    ctlr.getAddress().setData(vendor.data);
    ctlr.getMapImage().setSrc(Link.getGoogleMapImageFromRecord(vendor));

    ga('send', 'screenview', { 'screenName': 'VendorInfo: ' + vendor.get('name') });
  },

  onListDoubleTap: function (p1, p2, p3, prodprep) {
    this.onDisclose(null, prodprep);
  },

  onDisclose: function (p1, prodprep) {
    var ctlr = this;
    ctlr.getList().select(prodprep);
    OregonsCatch.util.Back.push(ctlr, ctlr._vendor);
    var product = OregonsCatch.util.CrossFilter.getProductByProdPrep(prodprep);
    ctlr.getApplication().getController('ProductInfo').load(product);
    var transition = { type: 'slide', direction: 'left' };
    Ext.Viewport.animateActiveItem(ctlr.getProductInfo(), transition);
  },

  onNavigate: function () {
    var ctlr = this;
    var Link = OregonsCatch.util.Link;
    var street = ctlr._vendor.get('street');
    var city = ctlr._vendor.get('city');
    var state = ctlr._vendor.get('state');
    var zip = ctlr._vendor.get('zip');
    var lat = ctlr._vendor.get('lat');
    var lng = ctlr._vendor.get('lng');
    if (street) {
      Link.openAddressNavigation(street, city, state, zip);
    } else {
      Link.openNavigation(lat, lng);
    }
    ga('send', 'event', 'Open Map', ctlr._vendor.get('name'));
  }

});
