Ext.define('OregonsCatch.util.Link', {
  singleton: true,

  openNavigation: function (lat, lng) {
    var data = 'daddr=' + lat + ',' + lng;
    if (window.device && window.device.platform === 'iOS') {
      this.openLink('https://maps.apple.com/?' + data);
    } else {
      this.openLink('https://maps.google.com/?' + data);
    }
  },

  openAddressNavigation: function (street, city, state, zip) {
		// http://stackoverflow.com/questions/1300838/how-to-convert-an-address-into-a-google-maps-link-not-map
    var data = [street, city, state, zip].join('+');
    if (window.device && window.device.platform === 'iOS') {
      this.openLink('https://maps.apple.com/?daddr=' + data);
    } else {
      this.openLink('https://www.google.com/maps/place/' + data);
    }
  },

  openVideo: function (id) {
    this.openLink('https://www.youtube.com/watch?v=' + id);
  },

  openLink: function (link) {
		// Requires inAppBrowser plugin to work correctly on mobile devices.
    if (typeof cordova !== 'undefined') {
      cordova.InAppBrowser.open(link, '_system');
    } else {
      open(link, '_blank');
    }
  },

  getYoutubeIdFromLink: function (link) {
    var id = '';
    if (link.indexOf('youtu.be') > -1) {
      id = link.split('/')[3];
    } else {
      id = link.split('v=')[1];
      var ampersandPosition = id.indexOf('&');
      if (ampersandPosition !== -1) {
        id = id.substring(0, ampersandPosition);
      }
    }
    return id;
  },

  getYoutubeImageFromLink: function (link) {
    var id = this.getYoutubeIdFromLink(link);
    return 'http://img.youtube.com/vi/' + id + '/0.jpg';
  },

  getGoogleMapImageFromRecord: function (record) {
    return 'http://maps.googleapis.com/maps/api/staticmap?center=' +
            record.get('lat') + ',' + record.get('lng') +
            '&zoom=14&size=200x200&maptype=roadmap&markers=color:blue%7Clabel:%7C' +
            record.get('lat') + ',' + record.get('lng');
  }

});
