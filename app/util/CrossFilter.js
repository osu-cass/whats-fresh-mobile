Ext.define('OregonsCatch.util.CrossFilter', {

	singleton: true,

	requires: ['OregonsCatch.util.Geography'],

	parameters: {
		product		: null,
		location	: null,
		vendor		: null,
		distance	: null,
		position	: null,
		preparation	: null,
		allprod		: true
	},

	unfiltered: {
		preparations: null
	},

	filtered: {
		products	: null,
		vendors		: null,
		prodpreps	: null
	},

	/*

	This cross-filtering works by avoiding the cyclic nature of the data.

	Vendors can be filtered on vendor, product, preparation, location, distance, position.
	Vendors are listed under a product.
	Vendors are listed in search results.

	Products do not have preparation info, so they must be filtered after vendors.
	Products can be filtered by existance in vendors, if allprod is false.

	Product-Preparations must be manually populated.
	Product-Preparations can be filtered by existance in products.
	Product-Preparations are listed under a vendor.

	Preparations can be filtered by existance in product-preparations.
	Preparations are only shown on Home screen.

	 */

	createMillionsOfStores: function () {

		var util = OregonsCatch.util.CrossFilter;

		var setFilter = function (store, config) {
			var criteria = new Ext.util.Filter(config);
			store.clearFilter();
			store.filter(criteria);
		};

		// Filtered Product Store

		util.filtered.products = new Ext.data.Store({
			model: OregonsCatch.model.Product
		});

		setFilter(util.filtered.products, {
			filterFn	: util.filterProductsFn(),
			root		: 'data'
		});

		// Filtered Vendor Store

		util.filtered.vendors = new Ext.data.Store({
			model: OregonsCatch.model.Vendor
		});

		setFilter(util.filtered.vendors, {
			filterFn	: util.filterVendorsFn(),
			root		: 'data'
		});

		// Filtered Product-Preparation Store

		util.filtered.prodpreps = new Ext.data.Store({
			model: OregonsCatch.model.ProductPreparation
		});

		// Filtered Preparation Store

		util.filtered.preparations = new Ext.data.Store({
			model: OregonsCatch.model.Preparation
		});

	},

	attachHandlers: function () {
		var util		= this;
		var Locations	= Ext.getStore('Locations');
		var Products	= Ext.getStore('Products');
		var Vendors		= Ext.getStore('Vendors');

		// Add non-filterable references.

		Locations.addListener('load', function () {
			Ext.getStore('Locations').insert(0, {
				is_not_filterable: true,
				name: 'All cities...',
				id: -999
			});
		});

		Products.addListener('load', function () {
			Ext.getStore('Products').insert(0, {
				is_not_filterable: true,
				name: 'All types...',
				id: -999
			});
		});

		// Copy data into utility stores.

		Products.addListener('load', function () {
			util.filtered.products.removeAll();
			for (var i = 0; i < Products.getAllCount(); i++) {
				if (!Products.getAt(i).get('is_not_filterable')) {
					util.filtered.products.add(Products.getAt(i));
				}
			}
			console.log('Copied %s products.', util.filtered.products.getAllCount());
		});

		Vendors.addListener('load', function () {
			util.filtered.vendors.removeAll();
			for (var i = 0; i < Vendors.getAllCount(); i++) {
				var vendor = Vendors.getAt(i);
				util.filtered.vendors.add(vendor);
				var prods = vendor.get('products');
				for (var j = 0; j < prods.length; j++) {
					var prod = prods[j];
					var added = false;
					for (var k = 0; k < util.filtered.preparations.getCount(); k++) {
						var preparation = util.filtered.preparations.getAt(k).getData();
						if (preparation.id === prod.preparation_id) {
							added = true;
							break;
						}
					}
					if (!added) {
						util.filtered.preparations.add({
							id: prod.preparation_id,
							name: prod.preparation
						});
					}
				}
			}
			util.filtered.preparations.insert(0, {
				id: -999,
				name: 'All types...',
				is_not_filterable: true
			});
			console.log('Copied ' + util.filtered.vendors.getAllCount() + ' vendors.');
			console.log('Copied ' + util.filtered.preparations.getAllCount() + ' preparations.');
		});

	},

	appStart: function () {
		var util = this;
		util.createMillionsOfStores();
		util.attachHandlers();
		Ext.getStore('Locations').load();
		Ext.getStore('Products').load();
		Ext.getStore('Vendors').load();
	},

	getProductByProdPrep: function (prodpred) {
		var util = this;
		var foundproduct = null;
		Ext.getStore('Products').each(function (product) {
			if (product.get('id') === prodpred.get('product_id')) {
				foundproduct = product;
			}
		});
		if (!foundproduct) throw new Error('no matching product');
		return foundproduct;
	},

	filterVendorsFn: function () {
		var util = OregonsCatch.util.CrossFilter;
		var Geo = OregonsCatch.util.Geography;

		return function (vendor) {
			var p = (util.parameters.product) ? util.parameters.product.data : null;
			var r = (util.parameters.preparation) ? util.parameters.preparation.data : null;
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

			// Filter vendors that have chosen product and preparation.
			if (p && !p.is_not_filterable) {
				var ok = false;
				var prods = vendor.get('products');
				for (var i = 0; i < prods.length; i++) {
					var prod = prods[i];
					if (prod.product_id === p.id) {
						if (r && !r.is_not_filterable) {
							if (prod.preparation_id === r.id) {
								ok = true;
								break;
							}
						} else {
							ok = true;
							break;
						}
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
		console.log('Filtered %s vendors.', util.filtered.vendors.getCount());
		util.filtered.products.filter();
		console.log('Filtered %s products.', util.filtered.products.getCount());
	},

	toString: function () {
		var util = OregonsCatch.util.CrossFilter;
		if (util.parameters.allprod) {
			var p = util.filtered.products.getCount();
			if (p == 1) return 'Learn about ' + util.filtered.products.first().get('name') + '.';
			return 'Learn about ' + p + ' types of seafood.';
		} else {
			var v = util.filtered.vendors.getCount();
			if (util.parameters.location && !util.parameters.location.get('is_not_filterable')) {
				return v + ' vendor(s) in ' + util.parameters.location.get('name') + '.';
			}
			if (util.parameters.position) {
				return v + ' vendor(s) within ' + util.parameters.distance.get('distance') + '.';
			}
			return v + ' vendor(s) in Oregon.';
		}

	}

});
