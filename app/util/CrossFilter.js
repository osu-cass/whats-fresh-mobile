Ext.define('OregonsCatch.util.CrossFilter', {

	singleton: true,

	requires: ['OregonsCatch.util.Geography'],

	parameters: {
		product		: null,
		location	: null,
		vendor		: null,
		distance	: null,
		position	: null,
		allprod		: true
	},

	filtered: {
		products	: null,
		vendors		: null
	},

	delayed_constructor: function () {
		var util = OregonsCatch.util.CrossFilter;

		// Duplicate the Product store.

		util.filtered.products = new Ext.data.Store({
			model: OregonsCatch.model.Product
		});

		var productCriteria = new Ext.util.Filter({
			filterFn	: util.filterProductsFn(),
			root		: 'data'
		});

		util.filtered.products.clearFilter();
		util.filtered.products.filter(productCriteria);

		// Duplicate the Vendor store.

		util.filtered.vendors = new Ext.data.Store({
			model: OregonsCatch.model.Vendor
		});

		var vendorCriteria = new Ext.util.Filter({
			filterFn	: util.filterVendorsFn(),
			root		: 'data'
		});

		util.filtered.vendors.clearFilter();
		util.filtered.vendors.filter(vendorCriteria);
	},

	filterVendorsFn: function () {
		var util = OregonsCatch.util.CrossFilter;
		var Geo = OregonsCatch.util.Geography;

		return function (vendor) {
			var p = (util.parameters.product) ? util.parameters.product.data : null;
			var l = (util.parameters.location) ? util.parameters.location.data : null;
			var v = (util.parameters.vendor) ? util.parameters.vendor.data : null;
			var d = (util.parameters.distance) ? util.parameters.distance.data : null;
			var a = util.parameters.position;

			// Filter vendors that aren't The Chosen Vendor.
			if (v && v.id !== vendor.get('id')) return false;

			// Filter vendors not within the chosen location.
			if (l && !l.is_not_filterable) {
				if (vendor.get('city') !== l.name) return false;
			}

			// Filter vendors that have chosen product.
			if (p && !p.is_not_filterable) {
				var ok = false;
				for (var i = 0; i < vendor.get('products').length; i++) {
					if (vendor.get('products')[i].product_id === p.id) {
						ok = true;
						break;
					}
				}
				if (!ok) return false;
			}

			// Filter vendors too far away.
			if (a && d) {
				var φ1		= a.coords.latitude;
				var λ1		= a.coords.longitude;
				var φ2		= vendor.get('lat');
				var λ2		= vendor.get('lng');
				var dMax	= Geo.standardizeDistance(d);
				var dCurr	= Geo.getDistance(φ1,λ1,φ2,λ2);
				var isNear	= dMax - dCurr >= 0;
				return isNear;
			}

			return true;
		};
	},

	filterProductsFn: function () {
		var util = OregonsCatch.util.CrossFilter;

		return function (product) {
			product = product.data;
			var p = (util.parameters.product) ? util.parameters.product.data : null;

			if (p && !p.is_not_filterable) {
				// Filter products by product if one is selected.
				if (product.id !== p.id) {
					return false;
				}
			} else if (!util.parameters.allprod) {
				// Filter products not within filtered vendors.
				// only if product isn't selected
				// only if buymode is enabled
				var ok = false;
				util.filtered.vendors.each(function (item, index, length) {
					item = item.data;
					for (var i = 0; i < item.products.length; i++) {
						if (product.id === item.products[i].product_id) {
							ok = true;
							break;
						}
					}
				});
				if (!ok) return false;
			}

			return true;
		};
	},

	refilter: function () {
		var util = OregonsCatch.util.CrossFilter;
		util.filtered.vendors.filter();
		util.filtered.products.filter();
		console.log('Filtered ' + util.filtered.products.getCount() + ' products.');
		console.log('Filtered ' + util.filtered.vendors.getCount() + ' vendors.');
	},

	toString: function () {
		var util = OregonsCatch.util.CrossFilter;
		if (util.parameters.allprod) {
			var p = util.filtered.products.getCount();
			if (p == 1) return 'Learn about ' + util.filtered.products.first().data.name + '.';
			return 'Learn about ' + p + ' types of seafood.';
		} else {
			var v = util.filtered.vendors.getCount();
			if (util.parameters.location && !util.parameters.location.data.is_not_filterable) {
				return 'Buy from ' + v + ' vendor(s) in ' + util.parameters.location.data.name + '.';
			}
			return 'Buy from ' + v + ' vendor(s) in Oregon.';
		}

	}

});
