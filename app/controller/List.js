var isPresent;
isPresent = true;


Ext.define('WhatsFresh.controller.List', {
	extend: 'Ext.app.Controller',
	requires: [
            'Ext.MessageBox',
            'Ext.device.Geolocation',
            'WhatsFresh.util.Link',
            'WhatsFresh.util.Messages',
            'WhatsFresh.util.Geography',
            'WhatsFresh.util.Search',
            'WhatsFresh.util.ProductSearch'],
	alias: 'cont',
	config: {
		refs: {
			homeView: 'home',
            useLocationToggle: '#userlocation',
            distanceSelect: '#distance',
            locationSelect: '#selectlocation',
			listView: 'listview',
			detailView: 'detail',
			productdetailView: 'productdetail',
			infoView: 'info',
			specificView: 'specific'
		},
		control: {
			homeView: {
				setUseLocation: 'onSetUseLocation',
				setDistance: 'onSetDistance',
				chosenLocation: 'onChooseLocation',
				chosenProduct: 'onChooseProduct',
				sortByVendorCommand: 'onSortByVendorCommand',
				sortByProductCommand: 'onSortByProductCommand',
				viewGoCommand: 'onViewGoCommand'
			},
			listView: {
				viewBackHomeCommand: 'onViewBackHomeCommand',
				viewLpageListHighlightCommand: 'onViewLpageListHighlightCommand',
				viewLpageListItemCommand: 'onViewLpageListItemCommand'
			},
			detailView: {
				viewBackListCommand: 'onViewBackListCommand',
				viewBackHomeCommand: 'onViewBackHomeCommand',
				navigationFunction: 'onNavigationFunction',
				viewInfoCommand: 'onViewInfoCommand',
				viewDpageListItemCommand: 'onViewDpageListItemCommand'
			},
			productdetailView: {
				viewBackListCommand: 'onViewBackListCommand',
				viewBackHomeCommand: 'onViewBackHomeCommand',
				viewInfoCommand: 'onViewInfoCommand',
				viewDpageListItemCommand: 'onViewDpageListItemCommand'
			},
			infoView: {
				viewBackDetailCommand: 'onViewBackDetailCommand',
				viewBackHomeCommand: 'onViewBackHomeCommand',
				viewSpecificCommand: 'onViewSpecificCommand',
				viewIpageListItemCommand: 'onViewIpageListItemCommand'
			},
			specificView: {
				videoTapFunction: 'onVideoTapFunction',
				viewBackInfoCommand: 'onViewBackInfoCommand',
				viewBackHomeCommand: 'onViewBackHomeCommand'
			}
		}
	},
	slideLeftTransition: {
		type: 'slide',
		direction: 'left'
	},
	slideRightTransition: {
		type: 'slide',
		direction: 'right'
	},
	// Functions dealing with
	// HOME
	// stuff	######################################################################################	HOME
    onSetUseLocation: function(newToggleValue){
        var ctrl = this;
		if(newToggleValue){
			ctrl.getDistanceSelect().enable();
			ctrl.getLocationSelect().disable();
			WhatsFresh.userLoc = 1;
		    // This updates the user's location and how far from their location they would like to search for vendors/products
		    Ext.device.Geolocation.watchPosition({
	            scope : ctrl,
				frequency : 10000, // Update every 10 seconds
				callback: ctrl.devicePositionCallback,
				failure: ctrl.devicePositionFailure
		    });
		}else{
			ctrl.getDistanceSelect().disable();
			ctrl.getLocationSelect().enable();
		    Ext.device.Geolocation.clearWatch();
		    WhatsFresh.util.Search.options.position = null;
		    WhatsFresh.position = null;
		    WhatsFresh.userLoc = 0;
		    this.onChooseLocation(WhatsFresh.locInd, WhatsFresh.locRec);
		}
    },
    devicePositionCallback: function(position) {
        WhatsFresh.position = position;
        WhatsFresh.util.Search.options.position = position;
        WhatsFresh.util.Search.options.distance = WhatsFresh.dist;
        WhatsFresh.util.Search.applyFilterToStore(WhatsFresh.VendorStore);
        WhatsFresh.util.ProductSearch.applyFilterToPStore(WhatsFresh.ProductListStore);
        this.populatePstore(WhatsFresh.VendorStore, WhatsFresh.ProductListStore);
        WhatsFresh.homeView.getComponent('vendnum').setData(this.buildInventorySummary(WhatsFresh.location, WhatsFresh.product, WhatsFresh.userLoc));
    },
    devicePositionFailure: function() {
        var ctrl = this;
        WhatsFresh.util.Messages.showLocationError();
        ctrl.getUseLocationToggle().setValue(0);
    },
	onSetDistance: function(index, record){
		WhatsFresh.dist = record._value.data;
		this.devicePositionCallback(WhatsFresh.position);
	},
	onChooseLocation: function(index, record){
		WhatsFresh.locInd = index;
		WhatsFresh.locRec = record;
		WhatsFresh.location = record._value.data.name;

		var vendorStore = Ext.data.StoreManager.lookup('Vendor');
		var productStore = Ext.data.StoreManager.lookup('ProductList');

		WhatsFresh.util.Search.options.location = record._value.data;
		WhatsFresh.util.Search.applyFilterToStore(WhatsFresh.VendorStore);
		WhatsFresh.util.ProductSearch.applyFilterToPStore(WhatsFresh.ProductListStore);
        this.populatePstore(WhatsFresh.VendorStore, WhatsFresh.ProductListStore);

        WhatsFresh.homeView.getComponent('vendnum').setData(this.buildInventorySummary(WhatsFresh.location, WhatsFresh.product, WhatsFresh.userLoc));
	},
	onChooseProduct: function(index, record){
		WhatsFresh.product = record._value.data.name;
		var vendorStore = Ext.data.StoreManager.lookup('Vendor');
		var productStore = Ext.data.StoreManager.lookup('ProductList');

		if(WhatsFresh.product !== 'Please choose a product'){
			WhatsFresh.use2 = 0;
		}else{
			WhatsFresh.use2 = 1;
		}
		WhatsFresh.util.Search.options.product = record._value.data;
        WhatsFresh.util.Search.applyFilterToStore(WhatsFresh.VendorStore);
        WhatsFresh.util.ProductSearch.applyFilterToPStore(WhatsFresh.ProductListStore);
        this.populatePstore(WhatsFresh.VendorStore, WhatsFresh.ProductListStore);

	    var homeView = this.getHomeView();
        homeView.getComponent('vendnum').setData(this.buildInventorySummary(WhatsFresh.location, WhatsFresh.product, WhatsFresh.userLoc));
	    Ext.Viewport.setActiveItem(homeView);
	},
	numberOfVendors: function(store){
		// NEEDED TO SET MAP MARKERS IN ONGOBUTTONCOMMAND
		WhatsFresh.Litem = new Array();
		WhatsFresh.VstoreLength = store.data.items.length;
		for (j = 0; j < store.data.items.length; j++){
			WhatsFresh.Litem[j] = store.data.items[j].data;
		}
	},
	populatePstore: function(store, pstore, usekey){
		// pstore is populated with items from selected vendors
		var countLen = 0;
		var flag = 0;
		var addVendor;
		var newNum = 0;
		// n is used to set PLpos or ProductList position when adding new products
		// to the productlist, PLpos is used to select a list item
		var n = 0;
		pstore.removeAll();
		for(i = 0; i < store.data.items.length; i++){
			for(j = 0; j < store.data.items[i].data.products.length; j++){
				flag = 0;
				for(k = 0; k < pstore.data.length; k++){
					// check to see if product and prep already exist
					if((store.data.items[i].data.products[j].name === pstore.data.items[k].data.name) && (store.data.items[i].data.products[j].preparation === pstore.data.items[k].data.preparation)){
						addVendor = store.data.items[i].data.name;
						newNum = k;
						flag = 1;
					}
				}
				// if prod/prep exist, add a new vendor to the vendors list
				if(flag === 1){
					pstore.data.items[newNum].data.vendors.push(addVendor);
				}
				// if the prod/prep DNE, then creat a new product from the current vendor as long as its name is same as chosen product name
				if(((flag === 0) && (store.data.items[i].data.products[j].name === WhatsFresh.product)) | ((flag === 0) && (usekey === 1))){
					var newpro = {
						name: store.data.items[i].data.products[j].name,
						preparation: store.data.items[i].data.products[j].preparation,
						vendors:[store.data.items[i].data.name],
						PLpos: n
					};
					pstore.add(newpro);
					n = n+1;
				}
			}
		}
	},
	// Need to reset the store when the check is clicked again, so store is set back to original store
	onSortByVendorCommand: function(){
		var view = this.getListView();
		var store = Ext.data.StoreManager.lookup('Vendor');
		// Note: the code for the functionality of this command is included in the onViewGoCommand,
		// because we want the program to call the function once, and if we put it in the go button
		// command, then we are able to make sure that the correct store is set. If a checkbox is set
		// then the specific list view store will be set by the checkbox in the onViewGoCommand and if
		// the checkbox is not set, then the list store has already been set.
		var homeView = this.getHomeView();
		if(homeView.items.items[5].items.items[0]._checked === true){
			// if vendors is true, then we must set products to false
			homeView.items.items[5].items.items[1]._checked = false;
			homeView.items.items[5].items.items[1]._component._checked = false;
			homeView.items.items[5].items.items[1]._component.input.dom.checked = false;
		}
	},
	onSortByProductCommand: function(){
		var view = this.getListView();
		var store = Ext.data.StoreManager.lookup('Vendor');
		var pstore = Ext.data.StoreManager.lookup('ProductList');
		var homeView = this.getHomeView();
		if(homeView.items.items[5].items.items[1]._checked === true){
			// if products is true, then we must set vendors to false
			homeView.items.items[5].items.items[0]._checked = false;
			homeView.items.items[5].items.items[0]._component._checked = false;
			homeView.items.items[5].items.items[0]._component.input.dom.checked = false;
		}
	},
	onViewGoCommand: function(){
		var view = this.getListView();
		var store = Ext.data.StoreManager.lookup('Vendor');
		var pstore = Ext.data.StoreManager.lookup('ProductList');
		var homeView = this.getHomeView();
		WhatsFresh.iconImage = 'resources/images/red.png';
		this.addMapMarkers();

	    setTimeout(function() {
            WhatsFresh.gMap.panTo(WhatsFresh.cent[0]);
           	WhatsFresh.gMap.fitBounds(WhatsFresh.bounds);
           	// these statements make sure that our zoom is not to close or to far away from the marker
           	if(WhatsFresh.gMap.getZoom() > 15){
		    	WhatsFresh.gMap.setZoom(15);
			}
			if(WhatsFresh.gMap.getZoom() < 6){
			    WhatsFresh.gMap.setZoom(6);
			}
        }, 1000);

		if(homeView.items.items[5].items.items[0]._checked === true){
			view.down('list').setStore(store);
			Ext.ComponentQuery.query('toolbar[itemId=listPageToolbar]')[0].setTitle("Vendors");
		}
		if(homeView.items.items[5].items.items[1]._checked === true){
			this.populatePstore(store, pstore, WhatsFresh.use);
			view.down('list').setStore(pstore);
			Ext.ComponentQuery.query('toolbar[itemId=listPageToolbar]')[0].setTitle("Products");
		}
		// If the checkboxes are both unused again we need to make sure that we set the correct stores for the items being searched
		if((homeView.items.items[5].items.items[0]._checked === false) && (homeView.items.items[5].items.items[1]._checked === false)){
			if(WhatsFresh.use2 === 1){
				view.down('list').setStore(store);
				Ext.ComponentQuery.query('toolbar[itemId=listPageToolbar]')[0].setTitle("Vendors");
			}
			if(WhatsFresh.use2 === 0){
				view.down('list').setStore(pstore);
				Ext.ComponentQuery.query('toolbar[itemId=listPageToolbar]')[0].setTitle("Products");
			}
		}
        WhatsFresh.path[WhatsFresh.pcount] = 'list';
        WhatsFresh.pcount = ++WhatsFresh.pcount;
        Ext.Viewport.animateActiveItem(this.getListView(), this.slideLeftTransition);
	},
    // Home Screen Helper Functions
    filterVendorStore: function(selectedLocationName, selectedProductName) {

        //Function Variables
        var self = this;
        var vendorStore = Ext.data.StoreManager.lookup('Vendor');
        var criteria;

        vendorStore.clearFilter();

        criteria = new Ext.util.Filter({
            filterFn: function(item){
                return (self.matchesLocation(item, selectedLocationName)) && (self.matchesProduct(item, selectedProductName));
            },
            root: 'data'
        });

        vendorStore.filter(criteria);
    },
    matchesLocation: function(storeItem, comparator){
        if (comparator !== "Please choose a location"){
            return storeItem.get('city') === comparator;
        }else{
            return true;
        }
    },
    matchesProduct: function(storeItem, comparator){
        if (comparator !== "Please choose a product"){
            for(b = 0; b < storeItem.data.products.length; b++){
		if(storeItem.data.products[b].name === comparator){
		    return true;
		}
	    }
	    return false;
        }else{
            return true;
        }
    },
    buildInventorySummary: function(locationString, productString, userLoc){
        var vendors = Ext.data.StoreManager.lookup('Vendor');
        var summary = {
            th: "There are ",
            numItems: vendors.getCount(),
            v: " vendors ",
            i: "in ",
            loc: "the database",
            end: "."
        };

        // User Location specified:
        // "There are <number> vendors near you."
        if(userLoc === 1){
        	summary.i = "near ";
        	summary.loc = "you";
        }else{
	        // Location/City is specified:
	        // "There are <number> vendors near <location>."
	        if (locationString !== "Please choose a location"){
	            summary.i = "near ";
	            summary.loc = locationString;
	        }
	    }

        // Product is specified:
        // "There are <number> vendors ... with <product>."
        if (productString !== "Please choose a product"){
            summary.w = " with ";
            summary.prod = productString;
        }
        return summary;
    },
	// Functions dealing with
	// LIST
	// stuff	######################################################################################	LIST
	onViewBackHomeCommand: function(){
		// This removes the old markers from the map on the list page
		WhatsFresh.backFlag = 0;
		for(i = 0; i < WhatsFresh.marker.length; i++){
			WhatsFresh.marker[i].setMap(null);
		}
		WhatsFresh.marker.length = 0;
		var listItems = this.getListView();
		listItems._items.items[2].deselect(listItems._items.items[2].selected.items[0]);
		// Hide video on specific page
		if(WhatsFresh.IListItem === "Videos"){
				WhatsFresh.SVvideo.hide();
		};
		// remove caption
		var caption = {
			cap: null
		};
		WhatsFresh.SVcaption.setData(caption);
		Ext.Viewport.animateActiveItem(this.getHomeView(), this.slideRightTransition);
	},
	// declareMap markers and infowindows as well as functions for the listview map
	addMapMarkers: function(){
		var self = this; // important to get the correct data to the viewport
		WhatsFresh.infoClickSelf = self;
		// Variables for setting marker attributes
		WhatsFresh.lastI = null;
		WhatsFresh.lastNodeSet = new Array();
		WhatsFresh.lastNodeSet[0] = null;
		WhatsFresh.lent = 0;
		WhatsFresh.animation = null;
		var lat;
		var lng;
		WhatsFresh.infowindow = new google.maps.InfoWindow();
		WhatsFresh.marker = new Array();
		WhatsFresh.cent = new Array();
		WhatsFresh.bounds = new google.maps.LatLngBounds();

            var vendorStore = Ext.data.StoreManager.lookup('Vendor');

		for (k = 0; k < vendorStore.getCount(); k++){
			lat = vendorStore.data.items[k].data.lat;
			lng = vendorStore.data.items[k].data.lng;
			WhatsFresh.cent[k] = new google.maps.LatLng(lat, lng);

			//THIS IS THE BLOCK OF CODE THAT USES THE MARKER AS AN ARRAY
			// THIS FUNCTION CREATES EACH LIST ITEM MARKER
			this.addAMapMarker(k, WhatsFresh.animation);
        	// This gets the map bounds based on the markers
        	WhatsFresh.bounds.extend(WhatsFresh.marker[k].position);

		}
	},
	addAMapMarker: function(k, animation){
		// I moved all of the code to create a single map marker with an infowindow and listener for that window
		// out of the add map markers function in order to use it in the onViewLpageListHighlightCommand
        var vendorStore = Ext.data.StoreManager.lookup('Vendor');

		WhatsFresh.marker[k] = new google.maps.Marker({
				map: WhatsFresh.gMap,
				animation: animation,
				icon: WhatsFresh.iconImage,
				position: WhatsFresh.cent[k],
				clickable: true
			});

			// THIS FUNCTION ADDS A CLICKABLE MARKER INFO WINDOW FOR EACH SPECIFIC MARKER
        	WhatsFresh.marker[k].info = new google.maps.InfoWindow({
        		content: '<button onclick=\"javascript:WhatsFresh.infoClickSelf.onInfoWindowClick();\">'+ vendorStore.data.items[k].data.name + '</button>',
        		data: vendorStore.data.items[k].data,
        		Lpos: k // used to index and highlight the correct list item
        	});

        	WhatsFresh.storeItem = WhatsFresh.marker[k];
        	// NOW WE ADD AN ON CLICK EVENT LISTENER TO EACH MARKER
        	// WE WILL USE THIS LISTENER TO OPEN THE SPECIFIC MARKER INFO THAT WAS CLICKED
        	google.maps.event.addListener(WhatsFresh.marker[k], 'click', function(){
        		WhatsFresh.storeItem = this;
        		WhatsFresh.infowindow.setContent(this.info.content); // this makes it so that only one info window is displayed at one time
        		WhatsFresh.infowindow.open(WhatsFresh.gMap, this); // this opens the infowindow defined above
        	});
	},
	onInfoWindowClick: function(record, list, index){
		var lv = WhatsFresh.infoClickSelf.getListView();
		lv._items.items[2].deselect(lv._items.items[2].selected.items[0]);
		var pstore = Ext.data.StoreManager.lookup('ProductList');
		var selectListItemFlag = 0;
		// If the vendors store is used, we can select a list item in here
		if(lv._items.items[2]._store._storeId === 'Vendor'){
			lv._items.items[2].select(WhatsFresh.storeItem.info.Lpos);
		}
		// if the productlist store is selected, we need to select the first product and prep in the productlist store
		// that contains our vendor as a seller of that product
		if(lv._items.items[2]._store._storeId === 'ProductList'){
			for(i = 0; i < pstore.data.all.length; i++){
				for(j = 0; j < pstore.data.all[i].data.vendors.length; j++){
					// if vendor exists in the productlist item as carrying that product, then set highlight flag
					if(WhatsFresh.storeItem.info.data.name === pstore.data.all[i].data.vendors[j]){
						if(selectListItemFlag !== 2){
							selectListItemFlag = 1;
						}
					}
				}
				// if a productlist item contains the vendor, highlight it
				if(selectListItemFlag === 1){
					lv._items.items[2].select(pstore.data.all[i].data.PLpos);
					selectListItemFlag = 2;
				}
			}
			selectListItemFlag = 0;
		}
		WhatsFresh.infowindowFlag = 1;
		// THIS USES THE SAME DETAIL PAGE DATA POPULATING CODE THAT THE ON CLICK LIST ITEM EVENT DOES
		WhatsFresh.infoClickSelf.onViewLpageListItemCommand(this, WhatsFresh.infoClickSelf, WhatsFresh.storeItem.info);
	},
	onViewLpageListHighlightCommand: function(record, list, index){
		var view = this.getListView();
		var t = 0;
		// THIS LOOP OPENS THE INFO PIN THAT CORESPONDS WITH THE SELETED LIST ITEM
		for(i = 0; i < WhatsFresh.marker.length; i++){
			// Here we want to set all previous blue nodes to red, then we will navigate into the respective function and turn
			// a node or nodes blue depending on our criteria.
			if((WhatsFresh.lastNodeSet[0] != null) && (t == 0)){
				for(h = 0; h < WhatsFresh.lent; h++){
					// get rid of last blue marker
					WhatsFresh.marker[WhatsFresh.lastNodeSet[h]].setMap(null);
					// reset marker to red
					WhatsFresh.iconImage = 'resources/images/red.png';
					// Setting the animation to null
					WhatsFresh.animation = null;
					// remake the red marker
					this.addAMapMarker(WhatsFresh.lastNodeSet[h], WhatsFresh.animation, WhatsFresh.opnum);
					// reset t so that the new set of nodes for a product are populated
					t = 0;
				}
				WhatsFresh.lent = 0;
	        }
			if((view._items.items[2]._store._storeId === 'ProductList') && (WhatsFresh.infowindowFlag !== 1)){
				// Use this for loop to find all the vendors that sell this product
				for(j = 0; j < index.data.vendors.length; j++){
					// this if statement finds vendors who carry the specific product
					if(WhatsFresh.marker[i].info.data.name === index.data.vendors[j]){
						// check to make sure that we have a previous set of nodes to turn red again
						// also checks that we only reset the nodes once when we search for and change
						// the new nodes for the new product to blue
						this.blueMapMarkers(t, i);
			   			t = t+1;
					}
				}
			}
			if((view._items.items[2]._store._storeId === 'Vendor') | (WhatsFresh.infowindowFlag === 1)){
				if(WhatsFresh.marker[i].info.data.id === index.data.id){
					// This is setting the pin of the selected list item to be blue and popping open its infowindow
					this.blueMapMarkers(t, i);
					// add data to blue marker info window and open it
					WhatsFresh.infowindow.setContent(WhatsFresh.marker[i].info.content); // sets the infowindow that coresponds to the selected list
			        WhatsFresh.infowindow.open(WhatsFresh.gMap, WhatsFresh.marker[i]); // this opens the infowindow defined above
		   			t = t+1;
			    }
			}
		}
	},
	blueMapMarkers: function(t, i){
		// get rid of red marker for selected list item
        WhatsFresh.marker[i].setMap(null);
        // reset marker to blue
		WhatsFresh.iconImage = 'resources/images/blue.png';
		// Setting the animation to drop
		WhatsFresh.animation = google.maps.Animation.DROP;
		// make the blue marker
		this.addAMapMarker(i, WhatsFresh.animation, WhatsFresh.opnum);
		WhatsFresh.marker[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		WhatsFresh.lastNodeSet[t] = i;
		t = t+1;
		WhatsFresh.lent = t;
	},
	onViewLpageListItemCommand: function(record, list, index){
		var detailView = this.getDetailView();
		var productdetailView = this.getProductdetailView();

		detailView.getAt(1).setData(index.data);
		productdetailView.getAt(1).setData(index.data);
		// Pass product data from selected vendor to new store, so that we
		// can use the new store to correctly use tpl print to make selectable list
		// items of each unique product.

		// Find store so that we can add data to the new store.
		var storeInventory = Ext.data.StoreManager.lookup('VendorInventory');
		var productstore = Ext.data.StoreManager.lookup('Product');
		storeInventory.removeAll();
		var view = this.getListView();
		this.onViewLpageListHighlightCommand(record, list, index);

		if((view._items.items[2]._store._storeId === 'Vendor') | (WhatsFresh.infowindowFlag === 1)){
			// Store is populated with items from selected vendor
			for(i = 0; i < index.data.products.length; i++){
				var newpro = {
					name: index.data.products[i].name,
					preparation: index.data.products[i].preparation
				};
				storeInventory.add(newpro);
			}
			// set src for static map
			WhatsFresh.statmap.setSrc( this.buildStaticMap( index.data ) );
			// for stack that tracks navigaion
			WhatsFresh.path[WhatsFresh.pcount] = 'detail';
			WhatsFresh.pvalue[WhatsFresh.pcount] = index;
        	WhatsFresh.pcount = ++WhatsFresh.pcount;
        	Ext.Viewport.animateActiveItem(detailView, this.slideLeftTransition);
		}
		if((view._items.items[2]._store._storeId === 'ProductList') && (WhatsFresh.infowindowFlag !== 1)){
			for(i = 0; i < index.data.vendors.length; i++){
				var newpro = {
					name: index.data.vendors[i]
				};
				storeInventory.add(newpro);
			}
			for(k = 0; k <  productstore.data.all.length; k++){
				if(productstore.data.all[k].data.name === index.data.name){
					// Sets data for the info block on productdetail page
					productdetailView.getAt(1).setData(productstore.data.all[k].data);
				}
			}
			// for stack that tracks navigaion
			WhatsFresh.path[WhatsFresh.pcount] = 'productdetail';
			WhatsFresh.pvalue[WhatsFresh.pcount] = index;
			WhatsFresh.pname = index.data.name;
        	WhatsFresh.pcount = ++WhatsFresh.pcount;
			Ext.Viewport.animateActiveItem(productdetailView, this.slideLeftTransition);
		}
		WhatsFresh.infowindowFlag = 0;
	},
	// Functions dealing with
	// DETAIL
	// stuff	######################################################################################	DETAIL
	onViewBackListCommand: function(record, index){
		var a, b;
		WhatsFresh.previousListItem = null;
		if(WhatsFresh.path[WhatsFresh.pcount - 2] === 'list'){
			WhatsFresh.pcount = --WhatsFresh.pcount;
			Ext.Viewport.animateActiveItem(this.getListView(), this.slideRightTransition);
		}
		if((WhatsFresh.path[WhatsFresh.pcount - 2] === 'detail') | (WhatsFresh.path[WhatsFresh.pcount - 2] === 'productdetail')){
			WhatsFresh.backFlag = 1;
			this.onViewDpageListItemCommand(a, b, WhatsFresh.pvalue[WhatsFresh.pcount-2]);
		}
	},
	onViewInfoCommand: function(index){
		// need to then get the index data item from the product store, so that we can populate the story store correctly
		for(i = 0; i < WhatsFresh.ProductStore.data.items.length; i++){
			if(WhatsFresh.pname === WhatsFresh.ProductStore.data.items[i].data.name){
				WhatsFresh.pnameData = WhatsFresh.ProductStore.data.items[i].data;
				if(WhatsFresh.ProductStore.data.items[i].data.story === null){
					var histr = {
						hist: "Sorry, no educational data exists for this product at this time"
					};
					WhatsFresh.INhistory.setData(histr);
					// remove caption
					var caption = {
						cap: null
					};
					WhatsFresh.SVcaption.setData(caption);
					WhatsFresh.INimage.hide();
					WhatsFresh.INlist.hide();
					Ext.Viewport.animateActiveItem(WhatsFresh.infoView, WhatsFresh.slideLeft);
				}else{
					WhatsFresh.INimage.show();
					WhatsFresh.INlist.show();
					WhatsFresh.StoryStore._proxy._url = 'http://seagrant-staging-api.osuosl.org/1/stories/'+WhatsFresh.ProductStore.data.items[i].data.story;
					WhatsFresh.StoryStore.load();
					WhatsFresh.StoryStore.on('load', function(){
						if(WhatsFresh.StoryStore.data.items[0].data.images.length > 0){
							WhatsFresh.INimage.setSrc('http://seagrant-staging.osuosl.org'+ WhatsFresh.StoryStore.data.items[0].data.images[0].link);
							var caption = {
								cap: WhatsFresh.StoryStore.data.items[0].data.images[0].caption
							};
						}else{
							// Set caption
							var avail = {
								avalible: "No image avalible"
							};
							WhatsFresh.INimage.hide();
						}

					    var histr = {
					    	hist: WhatsFresh.StoryStore.data.items[0].data.history
					    };
					    WhatsFresh.INhistory.setData(histr);
						Ext.Viewport.animateActiveItem(WhatsFresh.infoView, WhatsFresh.slideLeft);
					})
				}
			}
		}
		if(WhatsFresh.path[WhatsFresh.pcount - 1] === 'detail'){
			WhatsFresh.path[WhatsFresh.pcount] = 'productdetail';
	    }
	    if(WhatsFresh.path[WhatsFresh.pcount - 1] === 'productdetail'){
	    	WhatsFresh.path[WhatsFresh.pcount] = 'detail';
	    }
	    WhatsFresh.pvalue[WhatsFresh.pcount] = "info";
	    WhatsFresh.pcount = ++WhatsFresh.pcount;
	},
	onViewDpageListItemCommand: function(record, list, index){
		var num2;
	    var w;
		var view = this.getListView();
		var detailView = this.getDetailView();
		var productdetailView = this.getProductdetailView();
		var storeInventory = Ext.data.StoreManager.lookup('VendorInventory');
		storeInventory.removeAll();
		var vendorstore = Ext.data.StoreManager.lookup('Vendor');

		// Check to see if we are currently on the detail page or productdetail page, so that we know how to deal
		// with our data selection
		if(WhatsFresh.path[WhatsFresh.pcount - 1] === 'detail'){
			// Store is populated with items from selected vendor
			var productstore = Ext.data.StoreManager.lookup('Product');
			// search through the vendors to find the vendors who carry the product we are selecting,
			// so that we can display the vendors that carry that product
			for(i = 0; i < vendorstore.data.all.length; i++){
				for(j = 0; j < vendorstore.data.all[i].data.products.length; j++){
					// populating the storeInventory with the vendors who sell the chosen product
					if((vendorstore.data.all[i].data.products[j].name === index.data.name) && (vendorstore.data.all[i].data.products[j].preparation === index.data.preparation)){

						var newpro = {
							name: vendorstore.data.all[i].data.name
						};
						storeInventory.add(newpro);
					}
				}
			}
			for(k = 0; k <  productstore.data.all.length; k++){
				if(productstore.data.all[k].data.name === index.data.name){
					// Sets data for the info block on productdetail page
					productdetailView.getAt(1).setData(productstore.data.all[k].data);
					var num = k;
				}
			}
			if(WhatsFresh.backFlag === 0){
				WhatsFresh.path[WhatsFresh.pcount] = 'productdetail';
				WhatsFresh.pvalue[WhatsFresh.pcount] = index;
				WhatsFresh.pname = index.data.name;
	        	WhatsFresh.pcount = ++WhatsFresh.pcount;
	        	Ext.Viewport.animateActiveItem(this.getProductdetailView(), this.slideLeftTransition);
	        }
	        if(WhatsFresh.backFlag === 1){
	        	WhatsFresh.pcount = --WhatsFresh.pcount;
	        	WhatsFresh.backFlag = 0;
	        	if(WhatsFresh.pvalue[WhatsFresh.pcount] !== 'info'){
	        	   	for(w = 0; w < storeInventory.data.all.length; w++){
		        		// check to see if list item name is equal to the list item that was previously selected
		        		if(storeInventory.data.all[w].data.name === WhatsFresh.pvalue[WhatsFresh.pcount].data.name){
		        			num2 = w;
		        		}
		        	}
		        	productdetailView.items.items[3].select(storeInventory.data.all[num2]);
		        }
	        	Ext.Viewport.animateActiveItem(this.getProductdetailView(), this.slideRightTransition);
	        }
		}else if(WhatsFresh.path[WhatsFresh.pcount - 1] === 'productdetail'){
			// search through the vendors that carry the item and find the one we are selecting,
			// so that we can use the data from the selected vendor
			for(i = 0; i < vendorstore.data.all.length; i++){
				if(vendorstore.data.all[i].data.name === index.data.name){
					// populating the storeInventory with the vendor's products
					for(j = 0; j < vendorstore.data.all[i].data.products.length; j++){
						var newpro = {
							name: vendorstore.data.all[i].data.products[j].name,
							preparation: vendorstore.data.all[i].data.products[j].preparation
						};
						storeInventory.add(newpro);
					}
					// Sets data for the info block on detail page
					detailView.getAt(1).setData(vendorstore.data.all[i].data);
				}
			}
			// Sets the title of the header on detail page
			WhatsFresh.statmap.setSrc( this.buildStaticMap(detailView.items.items[1]._data) );
			if(WhatsFresh.backFlag === 0){
				// adding a log item to the "stack"
				WhatsFresh.path[WhatsFresh.pcount] = 'detail';
				WhatsFresh.pvalue[WhatsFresh.pcount] = index;
	        	WhatsFresh.pcount = ++WhatsFresh.pcount;
	       		Ext.Viewport.animateActiveItem(detailView, this.slideLeftTransition);
	       	}
	       	if(WhatsFresh.backFlag === 1){
	       		WhatsFresh.pcount = --WhatsFresh.pcount;
	       		WhatsFresh.backFlag = 0;
	       		if(WhatsFresh.pvalue[WhatsFresh.pcount] !== 'info'){
	        	   for(w = 0; w < storeInventory.data.all.length; w++){
		        		// check to see if list item name is equal to the list item that was previously selected
		        		if(storeInventory.data.all[w].data.name === WhatsFresh.pvalue[WhatsFresh.pcount].data.name){
		        			num2 = w;
		        		}
		        	}
		       		detailView.items.items[3].select(storeInventory.data.all[num2]);
		        }
	        	Ext.Viewport.animateActiveItem(detailView, this.slideRightTransition);
	        }
		}
	},
	onNavigationFunction: function(index){
		WhatsFresh.util.Link.openNavigation(index.lat, index.lng);
	},
    buildStaticMap: function(vendor){
		WhatsFresh.statmap.coords = vendor;
        var destination = 'http://maps.googleapis.com/maps/api/staticmap?center=' +
            vendor.lat +','+ vendor.lng +
            '&zoom=14&size=200x200&maptype=roadmap&markers=color:blue%7Clabel:%7C' +
            vendor.lat +','+ vendor.lng;

        return destination;
    },
	// Functions dealing with
	// INFO
	// stuff	######################################################################################	INFO
	onViewBackDetailCommand: function(){
		var a, b;
		if((WhatsFresh.path[WhatsFresh.pcount - 2] === 'detail') | (WhatsFresh.path[WhatsFresh.pcount - 2] === 'productdetail')){
			// WhatsFresh.pcount = WhatsFresh.pcount-1;
			WhatsFresh.backFlag = 1;
			this.onViewDpageListItemCommand(a, b, WhatsFresh.pvalue[WhatsFresh.pcount-2]);
		}
	},
	onViewSpecificCommand: function(){
		Ext.Viewport.animateActiveItem(this.getSpecificView(), this.slideLeftTransition);
	},
	onVideoTapFunction: function(link){
		WhatsFresh.util.Link.openVideo(link);
	},
	onViewIpageListItemCommand: function(record, list, index){
		Ext.ComponentQuery.query('toolbar[itemId=specificPageToolbar]')[0].setTitle(index.data.listItem);

		if(WhatsFresh.pnameData.story === null){
			// Do nothing, because we have already set all data to null
		}else{
			switch(index.data.listItem){
				case "Season":
					var caption = {
						cap: WhatsFresh.StoryStore.data.items[0].data.season
					};
					break;
				case "Products":
					var caption = {
						cap: WhatsFresh.StoryStore.data.items[0].data.products
					};
					break;
				case "Buying":
					var caption = {
						cap: WhatsFresh.StoryStore.data.items[0].data.buying
					};
					break;
				case "History":
					if(WhatsFresh.StoryStore.data.items[0].data.images.length > 0){
						// Here we set the image source
						WhatsFresh.SVimage.show();
						// OSL will send us a full string, so we won't have to apend part of the url
						WhatsFresh.SVimage.setSrc('http://seagrant-staging.osuosl.org'+ WhatsFresh.StoryStore.data.items[0].data.images[0].link);
						// Set caption
						var caption = {
							cap: WhatsFresh.StoryStore.data.items[0].data.images[0].caption
						};
						// We can later deal with multiple images, by using a for loop to set all of the images
						// to show and to populate their specific image and caption. In the back command, we will
						// just use a for loop to set their images to hide and their captions to null.
					}else{
						// Set caption
						var caption = {
							cap: "No image avalible"
						};
					}
					break;
				case "Preparation":
					// use tpl to print out the prepataion text/data
					// Set caption
					var caption = {
						cap: WhatsFresh.StoryStore.data.items[0].data.preparing
					};
					break;
				case "Videos":
					if(WhatsFresh.StoryStore.data.items[0].data.videos.length > 0){
						//Pull out the video id ie www.youtube.com/v?=blablabla
						//this pulls out the "blablabla" bit which is what we
						//will use for most other stuff.
						var link = WhatsFresh.util.Link.formatVideoLink(WhatsFresh.StoryStore.data.items[0].data.videos[0].link);

						//Grab the link created so the view can use it
						WhatsFresh.SVvideo.link = link;
						WhatsFresh.SVvideo.setSrc('http://img.youtube.com/vi/'+ link +'/0.jpg');
						WhatsFresh.SVvideo.show();
						var caption = {
							cap: WhatsFresh.StoryStore.data.items[0].data.videos[0].caption
						};
					}else{
						// Set caption
						var caption = {
							cap: "No video avalible"
						};
					}
					break;
			}
			WhatsFresh.SVcaption.setData(caption);
		}
		WhatsFresh.IListItem = index.data.listItem;
		Ext.Viewport.animateActiveItem(this.getSpecificView(), this.slideLeftTransition);
	},
	// Functions dealing with
	// SPECIFIC
	// stuff	######################################################################################	SPECIFIC
	onViewBackInfoCommand: function(){

		if(WhatsFresh.IListItem === "Videos"){
				WhatsFresh.SVvideo.hide();
		};
		// remove caption
		var caption = {
			cap: null
		};
		WhatsFresh.SVcaption.setData(caption);
		Ext.Viewport.animateActiveItem(this.getInfoView(), this.slideRightTransition);
	},
	// Initialize functions
	launch: function(){
		this.callParent(arguments);
		this.getDistanceSelect().disable();

		// Transitions
		WhatsFresh.slideLeft = this.slideLeftTransition;
		WhatsFresh.slideRight = this.slideRightTransition;

		// View references to use in the controller
		WhatsFresh.detailView = this.getDetailView();
		WhatsFresh.homeView = this.getHomeView();
		WhatsFresh.infoView = this.getInfoView();
		WhatsFresh.listView = this.getListView();
		WhatsFresh.productDetailView = this.getProductdetailView();
		WhatsFresh.specificView = this.getSpecificView();

        // Store references for use in the controller
		WhatsFresh.LocationStore = Ext.getStore('Location');
		WhatsFresh.ProductStore = Ext.getStore('Product');
		WhatsFresh.ProductListStore = Ext.getStore('ProductList');
		WhatsFresh.StoryStore = Ext.getStore('Story');
		WhatsFresh.VendorStore = Ext.getStore('Vendor');
		WhatsFresh.VendorInventoryStore = Ext.getStore('VendorInventory');

		// Applying filters to stores
		WhatsFresh.util.Search.applyFilterToStore(WhatsFresh.VendorStore);

		// Components
			// ON: List page
			WhatsFresh.statmap = WhatsFresh.detailView.getComponent('staticmap');
			// ON: Info page
			WhatsFresh.INimage = WhatsFresh.infoView.getComponent('infoimage');
			WhatsFresh.INlist = WhatsFresh.infoView.getComponent('Ipagelist');
			WhatsFresh.INhistory = WhatsFresh.infoView.getComponent('history');

			// ON: Specific page
			WhatsFresh.SVcaption = WhatsFresh.specificView.getComponent('caption');
			WhatsFresh.SVimage = WhatsFresh.specificView.getComponent('specimage');
			WhatsFresh.SVvideo = WhatsFresh.specificView.getComponent('video1');
			WhatsFresh.SVimage.hide();
			WhatsFresh.SVvideo.hide();

		// Get store vars
		Ext.getStore('Location').addListener('refresh', 'onLocationStoreRefresh', this);
        Ext.getStore('Product').addListener('refresh', 'onProductStoreRefresh', this);
        Ext.getStore('Vendor').addListener('load', 'onVendorStoreLoad', this);

		// Variables
			// FOR: back button functionality
			WhatsFresh.pvalue = [];
			WhatsFresh.path = [];
			WhatsFresh.pcount = 0;
			WhatsFresh.backFlag = 0;
			// FOR: checkboxes
			WhatsFresh.use = 1;
			WhatsFresh.use2 = 1;
			WhatsFresh.infowindowFlag = 0;
			// FOR: user location printout
			WhatsFresh.userLoc = 0;
			WhatsFresh.dist = Ext.getStore('Distance').getData().all[0].data;
	},
    onLocationStoreRefresh: function(){
        this.getHomeView().down('[itemId=selectlocation]').reset();
    },
    onProductStoreRefresh: function (){
        this.getHomeView().down('[itemId=selectproduct]').reset();
    },
    onVendorStoreLoad: function(){
        WhatsFresh.location = "Please choose a location";
        WhatsFresh.product = "Please choose a product";
        this.filterVendorStore(WhatsFresh.location, WhatsFresh.product);
        this.getHomeView().getComponent('vendnum').setData(this.buildInventorySummary(WhatsFresh.location, WhatsFresh.product));
    },
	init: function(){
		this.callParent(arguments);
	}
});
