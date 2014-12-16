var isPresent;
isPresent = true;


Ext.define('SeaGrant_Proto.controller.List', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.MessageBox', 'Ext.device.Geolocation'],
	alias: 'cont',
	config: {
		refs: {
			homeView: 'home',
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
				viewDetailCommand: 'onViewDetailCommand',
				viewLpageListHighlightCommand: 'onViewLpageListHighlightCommand',
				viewLpageListItemCommand: 'onViewLpageListItemCommand'
			},
			detailView: {
				viewBackListCommand: 'onViewBackListCommand',
				viewBackHomeCommand: 'onViewBackHomeCommand',
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
	onSetUseLocation: function(index, record){
		console.log('In controller(home): User Location toggle');
		console.log(record._component._value[0]);
		console.log(record);
		if(record._component._value[0] === 1){
			// This updates the user's location and how far from their location they would like to search for vendors/products
			Ext.device.Geolocation.watchPosition({
			    frequency: 3000, // Update every 3 seconds
			    callback: function(position) {
			        console.log('Position updated!', position.coords);
			        // console.log(index._items.items[2]._value.data.val);
					var dist = index._items.items[2]._value.data.val;
			    },
			    failure: function() {
			        console.log('something went wrong!');
			    }
			});
			
		}else{
			Ext.device.Geolocation.clearWatch();
		}
	},
	// This function may be unnecessary due to the fact that we set the distance in the callback function above
	onSetDistance: function(index, record){
		console.log("In controller(home): Distance from user chosen");
		// console.log(record._value.data.val);
		SeaGrant_Proto.dist = record._value.data.val;
	},
	onChooseLocation: function(index, record){
		// We first check to see if a location is chosen, if one is we sort by locataion,
		// then we check to see if a product is chosen, if one is we sort by product
		console.log('In controller(home): Drop Down list Location');
		// var loc = this.getHomeView();
		// console.log(record);
		SeaGrant_Proto.location = record._value.data.name;
		console.log('Location is: '+ SeaGrant_Proto.location +'\n'); 
            
		// ALL FILTERS ONLY TAKE STRINGS, NONE WORK WITH VARABLES
		// THAT ARE SELECED USING DROP DOWN TABLES, EVEN TOSTRING()
		// FUNCTION WILL NOT WORK
		var vendorStore = Ext.data.StoreManager.lookup('Vendor');
		var productStore = Ext.data.StoreManager.lookup('ProductList');

            this.filterVendorStore(SeaGrant_Proto.location, SeaGrant_Proto.product);
	    this.numberOfVendors(vendorStore);
	    var homeView = this.getHomeView();
            homeView.getComponent('vendnum').setData(this.buildInventorySummary(SeaGrant_Proto.location, SeaGrant_Proto.product));
	    //Ext.Viewport.setActiveItem(homeView);
	},
	onChooseProduct: function(index, record){
		// We first check to see if a location is chosen, if one is we sort by locataion,
		// then we check to see if a product is chosen, if one is we sort by product
		console.log('In controller(home): Drop Down list Products');
		// console.log(record);
		console.log('Product is: '+ record._value.data.name +'\n'); 
		SeaGrant_Proto.product = record._value.data.name;
		var vendorStore = Ext.data.StoreManager.lookup('Vendor');
		var productStore = Ext.data.StoreManager.lookup('ProductList');
		// console.log(store.data.all);
		// console.log(store);

            this.filterVendorStore(SeaGrant_Proto.location, SeaGrant_Proto.product);
	    this.numberOfVendors(vendorStore);
	    var homeView = this.getHomeView();
            homeView.getComponent('vendnum').setData(this.buildInventorySummary(SeaGrant_Proto.location, SeaGrant_Proto.product));       
	    Ext.Viewport.setActiveItem(homeView);
	},
	numberOfVendors: function(store){
		// NEEDED TO SET MAP MARKERS IN ONGOBUTTONCOMMAND
		SeaGrant_Proto.Litem = new Array();
		SeaGrant_Proto.VstoreLength = store.data.items.length;
		// console.log(store.data.items);
		for (j = 0; j < store.data.items.length; j++){
			SeaGrant_Proto.Litem[j] = store.data.items[j].data;			
			// console.log(SeaGrant_Proto.Litem[j]);
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
			// console.log('store.data.items.length');
			// console.log(store.data.items.length);
			for(j = 0; j < store.data.items[i].data.products.length; j++){
			// console.log('store.data.items[i].data.products.length');
			// console.log(store.data.items[i].data.products.length);
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
				if(((flag === 0) && (store.data.items[i].data.products[j].name === SeaGrant_Proto.product)) | ((flag === 0) && (usekey === 1))){
					var newpro = {
						name: store.data.items[i].data.products[j].name, 
						preparation: store.data.items[i].data.products[j].preparation,
						vendors:[store.data.items[i].data.name],
						PLpos: n
					};
					pstore.add(newpro);
					n = n+1;
					console.log(n);
				}
			}
		}	
	},	
	// Need to reset the store when the check is clicked again, so store is set back to original store
	onSortByVendorCommand: function(){
		console.log('In controller(home): Vendor checkbox');
		var view = this.getListView();
		var store = Ext.data.StoreManager.lookup('Vendor');
		// Note: the code for the functionality of this command is included in the onViewGoCommand,
		// because we want the program to call the function once, and if we put it in the go button
		// command, then we are able to make sure that the correct store is set. If a checkbox is set
		// then the specific list view store will be set by the checkbox in the onViewGoCommand and if 
		// the checkbox is not set, then the list store has already been set.
		console.log(this.getHomeView().items.items[5].items);
		console.log(view.down('list'));
		var homeView = this.getHomeView();
		if(homeView.items.items[5].items.items[0]._checked === true){
			// if vendors is true, then we must set products to false
			homeView.items.items[5].items.items[1]._checked = false;
			homeView.items.items[5].items.items[1]._component._checked = false;
			homeView.items.items[5].items.items[1]._component.input.dom.checked = false;
		}
	},
	onSortByProductCommand: function(){
		console.log('In controller(home): Product checkbox');
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
		console.log('In controller(home): Go to List Page Button');
		var view = this.getListView();
		var store = Ext.data.StoreManager.lookup('Vendor');
		var pstore = Ext.data.StoreManager.lookup('ProductList');
		var homeView = this.getHomeView();	
		SeaGrant_Proto.iconImage = '/images/red.png';	
		this.addMapMarkers();
		setTimeout(function() {
           SeaGrant_Proto.gMap.panTo(SeaGrant_Proto.cent[0]);
           		SeaGrant_Proto.gMap.fitBounds(SeaGrant_Proto.bounds);
           		// these statements make sure that our zoom is not to close or to far away from the marker
           		if(SeaGrant_Proto.gMap.getZoom() > 15){
					SeaGrant_Proto.gMap.setZoom(15);
				}
				if(SeaGrant_Proto.gMap.getZoom() < 6){
					SeaGrant_Proto.gMap.setZoom(6);
				}
        }, 1000);
		if(homeView.items.items[5].items.items[0]._checked === true){
			view.down('list').setStore(store);
		}
		if(homeView.items.items[5].items.items[1]._checked === true){
			console.log('use');
			console.log(SeaGrant_Proto.use);
			this.populatePstore(store, pstore, SeaGrant_Proto.use);
			view.down('list').setStore(pstore);
		}
		// If the checkboxes are both unused again we need to make sure that we set the correct stores for the items being searched
		if((homeView.items.items[5].items.items[0]._checked === false) && (homeView.items.items[5].items.items[1]._checked === false)){
			if(((SeaGrant_Proto.use === 1) && (SeaGrant_Proto.use2 === 1)) | ((SeaGrant_Proto.use === 1) && (SeaGrant_Proto.use2 === 0))){
				view.down('list').setStore(store);
			}
			if(((SeaGrant_Proto.use === 0) && (SeaGrant_Proto.use2 === 1)) | ((SeaGrant_Proto.use === 0) && (SeaGrant_Proto.use2 === 0))){
				view.down('list').setStore(pstore);
			}
		}		
        SeaGrant_Proto.path[SeaGrant_Proto.pcount] = 'list';
        SeaGrant_Proto.pcount = ++SeaGrant_Proto.pcount;
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
    buildInventorySummary: function(locationString, productString){

        var vendors = Ext.data.StoreManager.lookup('Vendor');

        console.log("inside buildInventorySummary");
        var summary = {
            th: "There are ",
            numItems: vendors.getCount(),
            v: " vendors ",
            i: "in ",
            loc: "the database",
            end: "."
        };
        
        // Location/City is specified:
        // "There are <number> vendors near <location>."
        if (locationString !== "Please choose a location"){
            summary.i = "near ";
            summary.loc = locationString;
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
		console.log('In controller(list): Back to Home Page Button');
		// This removes the old markers from the map on the list page
		SeaGrant_Proto.backFlag = 0;
		for(i = 0; i < SeaGrant_Proto.marker.length; i++){
			SeaGrant_Proto.marker[i].setMap(null);
		}
		SeaGrant_Proto.marker.length = 0;		
		var listItems = this.getListView();
		listItems._items.items[2].deselect(listItems._items.items[2].selected.items[0]);		
		Ext.Viewport.animateActiveItem(this.getHomeView(), this.slideRightTransition);
	},
	onViewDetailCommand: function(){
		console.log('In controller(list): View Detail Page Button');
		Ext.Viewport.animateActiveItem(this.getDetailView(), this.slideLeftTransition);
	},		
	// declareMap markers and infowindows as well as functions for the listview map
	addMapMarkers: function(){
		var self = this; // important to get the correct data to the viewport
		SeaGrant_Proto.infoClickSelf = self;
		// Variables for setting marker attributes
		SeaGrant_Proto.lastI = null;
		SeaGrant_Proto.lastNodeSet = new Array();
		SeaGrant_Proto.lastNodeSet[0] = null;
		SeaGrant_Proto.lent = 0;
		SeaGrant_Proto.animation = null;
		// SeaGrant_Proto.opnum = 0.7;
		var lat;
		var lng;
		SeaGrant_Proto.infowindow = new google.maps.InfoWindow();
		SeaGrant_Proto.marker = new Array();
		SeaGrant_Proto.cent = new Array();
		SeaGrant_Proto.bounds = new google.maps.LatLngBounds();
		for (k = 0; k < SeaGrant_Proto.VstoreLength; k++){
			lat = SeaGrant_Proto.Litem[k].lat;
			// console.log(lat);
			lng = SeaGrant_Proto.Litem[k].lng;
			// console.log(lng);
			SeaGrant_Proto.cent[k] = new google.maps.LatLng(lat, lng);
			//THIS IS THE BLOCK OF CODE THAT USES THE MARKER AS AN ARRAY
			// THIS FUNCTION CREATES EACH LIST ITEM MARKER
			this.addAMapMarker(k, SeaGrant_Proto.animation);
        	// This gets the map bounds based on the markers
        	SeaGrant_Proto.bounds.extend(SeaGrant_Proto.marker[k].position);
        	
		}
	},
	addAMapMarker: function(k, animation){
		// I moved all of the code to create a single map marker with an infowindow and listener for that window
		// out of the add map markers function in order to use it in the onViewLpageListHighlightCommand
		SeaGrant_Proto.marker[k] = new google.maps.Marker({
				map: SeaGrant_Proto.gMap,
				animation: animation,
				// opacity: opnum,
				// zIndex: google.maps.Marker.MAX_ZINDEX + 1,
				icon: SeaGrant_Proto.iconImage,
				position: SeaGrant_Proto.cent[k],
				clickable: true
			});			
			// THIS FUNCTION ADDS A CLICKABLE MARKER INFO WINDOW FOR EACH SPECIFIC MARKER
        	SeaGrant_Proto.marker[k].info = new google.maps.InfoWindow({
        		content: '<button onclick=\"javascript:SeaGrant_Proto.infoClickSelf.onInfoWindowClick();\">'+ SeaGrant_Proto.Litem[k].name + '</button>',
        		data: SeaGrant_Proto.Litem[k],
        		Lpos: k // used to index and highlight the correct list item
        	});
        	// NOW WE ADD AN ON CLICK EVENT LISTENER TO EACH MARKER
        	// WE WILL USE THIS LISTENER TO OPEN THE SPECIFIC MARKER INFO THAT WAS CLICKED
        	google.maps.event.addListener(SeaGrant_Proto.marker[k], 'click', function(){
        		SeaGrant_Proto.storeItem = this;
        		// console.log('THIS IN THE EVENT LISTENER');
        		// console.log(this);
        		SeaGrant_Proto.infowindow.setContent(this.info.content); // this makes it so that only one info window is displayed at one time
        		SeaGrant_Proto.infowindow.open(SeaGrant_Proto.gMap, this); // this opens the infowindow defined above
        	});	
	},
	onInfoWindowClick: function(record, list, index){
		var lv = SeaGrant_Proto.infoClickSelf.getListView();
		lv._items.items[2].deselect(lv._items.items[2].selected.items[0]);
		var pstore = Ext.data.StoreManager.lookup('ProductList');
		var selectListItemFlag = 0;
		// console.log(pstore);
		// console.log('SeaGrant_Proto.storeItem');
		// console.log(SeaGrant_Proto.storeItem);
		// If the vendors store is used, we can select a list item in here
		if(lv._items.items[2]._store._storeId === 'Vendor'){
        	// console.log("I shouldn't see this when I'm in the products list");
			lv._items.items[2].select(SeaGrant_Proto.storeItem.info.Lpos);
		}
		// if the productlist store is selected, we need to select the first product and prep in the productlist store
		// that contains our vendor as a seller of that product
		if(lv._items.items[2]._store._storeId === 'ProductList'){
			console.log('PRODUCTS LIST SELECT');
			for(i = 0; i < pstore.data.all.length; i++){
				for(j = 0; j < pstore.data.all[i].data.vendors.length; j++){
					// if vendor exists in the productlist item as carrying that product, then set highlight flag
					// console.log(pstore.data.all[i].data.vendors[j]);
					// console.log(SeaGrant_Proto.storeItem.info.data.name);
					if(SeaGrant_Proto.storeItem.info.data.name === pstore.data.all[i].data.vendors[j]){
						if(selectListItemFlag !== 2){
							selectListItemFlag = 1;
						}
						// console.log('the productlist item contains the vendor');
					}
				}
				// if a productlist item contains the vendor, highlight it
				if(selectListItemFlag === 1){
					// console.log('highlight the correct list item');
					// console.log(pstore.data.all[i].data);
					lv._items.items[2].select(pstore.data.all[i].data.PLpos);
					selectListItemFlag = 2;
				}
			}
			selectListItemFlag = 0;
		}
		SeaGrant_Proto.infowindowFlag = 1;
		// THIS USES THE SAME DETAIL PAGE DATA POPULATING CODE THAT THE ON CLICK LIST ITEM EVENT DOES
		SeaGrant_Proto.infoClickSelf.onViewLpageListItemCommand(this, SeaGrant_Proto.infoClickSelf, SeaGrant_Proto.storeItem.info);
	},
	onViewLpageListHighlightCommand: function(record, list, index){
		var view = this.getListView();
		var t = 0;
		// THIS LOOP OPENS THE INFO PIN THAT CORESPONDS WITH THE SELETED LIST ITEM
		for(i = 0; i < SeaGrant_Proto.marker.length; i++){
			// console.log('SeaGrant_Proto.marker[i].info.data.id   '+ SeaGrant_Proto.marker[i].info.data.id +'   index.id   '+ index.id +'\n');
			// console.log('marker data   ');
			// console.log(SeaGrant_Proto.marker[i].icon);
			// console.log('Index');
			// console.log(index.data);


			// Here we want to set all previous blue nodes to red, then we will navigate into the respective function and turn
			// a node or nodes blue depending on our criteria.
			if((SeaGrant_Proto.lastNodeSet[0] != null) && (t == 0)){
				console.log("removing last set of blue markers");
				// console.log("SeaGrant_Proto.lent = "+ SeaGrant_Proto.lent);
				for(h = 0; h < SeaGrant_Proto.lent; h++){
					// get rid of last blue marker
					SeaGrant_Proto.marker[SeaGrant_Proto.lastNodeSet[h]].setMap(null);
					// console.log('removed');
					// console.log(SeaGrant_Proto.lastNodeSet[h]);
					// reset marker to red
					SeaGrant_Proto.iconImage = '/images/red.png';
					// Setting the animation to null
					SeaGrant_Proto.animation = null;
					// Set the opacity of the pin
					// SeaGrant_Proto.opnum = 0.5;
					// remake the red marker
					this.addAMapMarker(SeaGrant_Proto.lastNodeSet[h], SeaGrant_Proto.animation, SeaGrant_Proto.opnum);
					// console.log('added');
					// reset t so that the new set of nodes for a product are populated
					t = 0;
				}
				SeaGrant_Proto.lent = 0;
	        }
	     //    if(SeaGrant_Proto.lastI != null){
						// // get rid of last blue marker
						// console.log('get rid of last blue marker');
						// SeaGrant_Proto.marker[SeaGrant_Proto.lastI].setMap(null);
						// // reset marker to red
						// SeaGrant_Proto.iconImage = '/images/red.png';
						// SeaGrant_Proto.animation = null;
						// // Set the opacity of the pin
						// // SeaGrant_Proto.opnum = 0.5;
						// // remake the red marker
						// this.addAMapMarker(SeaGrant_Proto.lastI, SeaGrant_Proto.animation, SeaGrant_Proto.opnum);						
			   //      }

			if((view._items.items[2]._store._storeId === 'ProductList') && (SeaGrant_Proto.infowindowFlag !== 1)){
				// Use this for loop to find all the vendors that sell this product
				for(j = 0; j < index.data.vendors.length; j++){					
					// this if statement finds vendors who carry the specific product
					if(SeaGrant_Proto.marker[i].info.data.name === index.data.vendors[j]){
						// check to make sure that we have a previous set of nodes to turn red again
						// also checks that we only reset the nodes once when we search for and change 
						// the new nodes for the new product to blue
						this.blueMapMarkers(t, i);
				        // get rid of red marker for selected list item
				  //       SeaGrant_Proto.marker[i].setMap(null);
				  //       // reset marker to blue
						// SeaGrant_Proto.iconImage = '/images/blue.png';
						// // Setting the animation to drop
						// SeaGrant_Proto.animation = google.maps.Animation.DROP;
						// // Set the opacity of the pin
						// // SeaGrant_Proto.opnum = 1.0;
						// // make the blue marker
						// this.addAMapMarker(i, SeaGrant_Proto.animation, SeaGrant_Proto.opnum);
						// SeaGrant_Proto.marker[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
						// SeaGrant_Proto.lastNodeSet[t] = i;
			   			t = t+1;
			   			// SeaGrant_Proto.lent = t;
					}
				}
			}
			if((view._items.items[2]._store._storeId === 'Vendor') | (SeaGrant_Proto.infowindowFlag === 1)){
				if(SeaGrant_Proto.marker[i].info.data.id === index.data.id){					
					// This is setting the pin of the selected list item to be blue and popping open its infowindow
					this.blueMapMarkers(t, i);
			        // get rid of red marker for selected list item
			  //       SeaGrant_Proto.marker[i].setMap(null);
			  //       // reset marker to blue
					// SeaGrant_Proto.iconImage = '/images/blue.png';
					// SeaGrant_Proto.animation = google.maps.Animation.DROP;
					// // Set the opacity of the pin
					// // SeaGrant_Proto.opnum = 1.0;
					// // make the blue marker
					// this.addAMapMarker(i, SeaGrant_Proto.animation, SeaGrant_Proto.opnum);
					// SeaGrant_Proto.marker[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
					// add data to blue marker info window and open it
					SeaGrant_Proto.infowindow.setContent(SeaGrant_Proto.marker[i].info.content); // sets the infowindow that coresponds to the selected list
			        SeaGrant_Proto.infowindow.open(SeaGrant_Proto.gMap, SeaGrant_Proto.marker[i]); // this opens the infowindow defined above
					
			        // SeaGrant_Proto.lastNodeSet[t] = i;
		   			t = t+1;
		   // 			SeaGrant_Proto.lent = t;

					// SeaGrant_Proto.lastI = i;
			    }
			}
		}
	},
	// having trouble with the passed in value t, when we are removing old map markers
	blueMapMarkers: function(t, i){
		// get rid of red marker for selected list item
        SeaGrant_Proto.marker[i].setMap(null);
        // reset marker to blue
		SeaGrant_Proto.iconImage = '/images/blue.png';
		// Setting the animation to drop
		SeaGrant_Proto.animation = google.maps.Animation.DROP;
		// Set the opacity of the pin
		// SeaGrant_Proto.opnum = 1.0;
		// make the blue marker
		this.addAMapMarker(i, SeaGrant_Proto.animation, SeaGrant_Proto.opnum);
		SeaGrant_Proto.marker[i].setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
		SeaGrant_Proto.lastNodeSet[t] = i;
		t = t+1;
		SeaGrant_Proto.lent = t;
	},		
	onViewLpageListItemCommand: function(record, list, index){
		console.log('In controller(list): Select list item');
		// Ext.Msg.alert(index.data.name, 'This is the selected list item.');
		
		
		var detailView = this.getDetailView();
		var productdetailView = this.getProductdetailView();
		
		detailView.getAt(1).setData(index.data);
		productdetailView.getAt(1).setData(index.data);
		// console.log('data that we need');
		// console.log(productdetailView.getAt(1)._data);
		// console.log(this);
		// console.log(productdetailView._items.items[1]._data);
		// console.log(detailView._items.items[1]._data);
		
		Ext.ComponentQuery.query('toolbar[itemId=productdetailPageToolbar]')[0].setTitle(index.data.name);
		Ext.ComponentQuery.query('toolbar[itemId=detailPageToolbar]')[0].setTitle(index.data.name);
		// Trying to pass product data from selected vendor to new store, so that we
		// can use the new store to correctly use tpl print to make selectable list 
		// items of each unique product.
				
		// Trying to find store so that we can add data to the new store.
		var storeInventory = Ext.data.StoreManager.lookup('VendorInventory');
		var productstore = Ext.data.StoreManager.lookup('Product');
		// console.log(stuff);
		// console.log('storeStuff Items: ');
		// console.log(storeStuff.data.items[0]);
		storeInventory.removeAll();
		// console.log(storeStuff.data.items);
		var view = this.getListView();
		// console.log('list view');
		// console.log(view);

		// THIS LOOP OPENS THE INFO PIN THAT CORESPONDS WITH THE SELECTED LIST ITEM
		// for(i = 0; i < SeaGrant_Proto.marker.length; i++){
		// 	if(SeaGrant_Proto.marker[i].info.data.id === index.id){
		// 		SeaGrant_Proto.infowindow.setContent(SeaGrant_Proto.marker[i].info.content); // sets the infowindow that coresponds to the selected list
		//         SeaGrant_Proto.infowindow.open(SeaGrant_Proto.gMap, SeaGrant_Proto.marker[i]); // this opens the infowindow defined above
		//     }
		// }
		this.onViewLpageListHighlightCommand(record, list, index);
		
		// console.log(index);
		if((view._items.items[2]._store._storeId === 'Vendor') | (SeaGrant_Proto.infowindowFlag === 1)){
			// Store is populated with items from selected vendor
			// console.log(index.data.products.length);
			for(i = 0; i < index.data.products.length; i++){
				var newpro = {
					name: index.data.products[i].name, 
					preparation: index.data.products[i].preparation
				};
				storeInventory.add(newpro);
			}
			// for stack that tracks navigaion
			SeaGrant_Proto.path[SeaGrant_Proto.pcount] = 'detail';
			SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount] = index;
        	SeaGrant_Proto.pcount = ++SeaGrant_Proto.pcount;
        	Ext.Viewport.animateActiveItem(detailView, this.slideLeftTransition);
		}
		if((view._items.items[2]._store._storeId === 'ProductList') && (SeaGrant_Proto.infowindowFlag !== 1)){
			console.log('going to productdetailView');
			// console.log(index);
			for(i = 0; i < index.data.vendors.length; i++){
				var newpro = {
					name: index.data.vendors[i]
				};
				storeInventory.add(newpro);
			}
			for(k = 0; k <  productstore.data.all.length; k++){
				// console.log('in k loop'+ k);
				// console.log(productstore.data.items[k]);
				if(productstore.data.all[k].data.name === index.data.name){
					// console.log(productstore.data.all[k].data.name);
					// console.log(index.data.name);
					// Sets data for the info block on productdetail page
					productdetailView.getAt(1).setData(productstore.data.all[k].data);
					// console.log('NEEDED DISPLAY DATA');
					// console.log(productdetailView.getAt(1)._data);  
				}
			}
			// for stack that tracks navigaion
			SeaGrant_Proto.path[SeaGrant_Proto.pcount] = 'productdetail';
			SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount] = index;
        	SeaGrant_Proto.pcount = ++SeaGrant_Proto.pcount;
			Ext.Viewport.animateActiveItem(productdetailView, this.slideLeftTransition);
		}
		console.log(index);
		//
		SeaGrant_Proto.infowindowFlag = 0;		
	},
	// Functions dealing with 
	// DETAIL
	// stuff	######################################################################################	DETAIL
	onViewBackListCommand: function(record, index){
		console.log('In controller(detail): Back to List Page Button');
		var a, b;
		
		// console.log("this is our path item **************************");

		// console.log('SeaGrant_Proto.pcount - 2');
		// console.log(SeaGrant_Proto.pcount - 2);
		// console.log('SeaGrant_Proto.path[SeaGrant_Proto.pcount - 2]');
		// console.log(SeaGrant_Proto.path[SeaGrant_Proto.pcount - 2]);
		// console.log('SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount- 2]');
		// console.log(SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount-2]);
		if(SeaGrant_Proto.path[SeaGrant_Proto.pcount - 2] === 'list'){
			SeaGrant_Proto.pcount = --SeaGrant_Proto.pcount;
			Ext.Viewport.animateActiveItem(this.getListView(), this.slideRightTransition);
		}
		if((SeaGrant_Proto.path[SeaGrant_Proto.pcount - 2] === 'detail') | (SeaGrant_Proto.path[SeaGrant_Proto.pcount - 2] === 'productdetail')){
			// SeaGrant_Proto.pcount = SeaGrant_Proto.pcount-1;	
			SeaGrant_Proto.backFlag = 1;
			// console.log('PCOUNT');
			// console.log(SeaGrant_Proto.pcount);		
			this.onViewDpageListItemCommand(a, b, SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount-2]);
		}
	},
	onViewInfoCommand: function(){
		console.log('In controller(detail): View Info Page Button');
		Ext.Viewport.animateActiveItem(this.getInfoView(), this.slideLeftTransition);
	},	
	onViewDpageListItemCommand: function(record, list, index){
		console.log('In controller(detail): Select list item');
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
		if(SeaGrant_Proto.path[SeaGrant_Proto.pcount - 1] === 'detail'){
			// Store is populated with items from selected vendor
			console.log('we are going from the detail page to the productsdetail page');
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
				// console.log('in k loop'+ k);
				// console.log(productstore.data.items[k]);
				if(productstore.data.all[k].data.name === index.data.name){
					// console.log(productstore.data.all[k].data.name);
					// console.log(index.data.name);
					// Sets data for the info block on productdetail page
					productdetailView.getAt(1).setData(productstore.data.all[k].data);
					var num = k;
					// console.log('NEEDED DISPLAY DATA');
					// console.log(productdetailView.getAt(1)._data);  
				}
			}
			Ext.ComponentQuery.query('toolbar[itemId=productdetailPageToolbar]')[0].setTitle(index.data.name);
			if(SeaGrant_Proto.backFlag === 0){
				SeaGrant_Proto.path[SeaGrant_Proto.pcount] = 'productdetail';
				SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount] = index;
	        	SeaGrant_Proto.pcount = ++SeaGrant_Proto.pcount;
	        	Ext.Viewport.animateActiveItem(this.getProductdetailView(), this.slideLeftTransition);
	        }
	        if(SeaGrant_Proto.backFlag === 1){
	        	SeaGrant_Proto.pcount = --SeaGrant_Proto.pcount;
	        	SeaGrant_Proto.backFlag = 0;
        	   	for(w = 0; w < storeInventory.data.all.length; w++){
	        		// check to see if list item name is equal to the list item that was previously selected
	        		if(storeInventory.data.all[w].data.name === SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount].data.name){
	        			num2 = w;
	        		}
	        	}
		        productdetailView.items.items[2].select(storeInventory.data.all[num2]);
	        	Ext.Viewport.animateActiveItem(productdetailView, this.slideRightTransition);				
	        }
		}else if(SeaGrant_Proto.path[SeaGrant_Proto.pcount - 1] === 'productdetail'){
			console.log('Leaving the productdetail page to see the detail page');

			// WE ALSO HAVE A PROBLEM WHERE THE TITLE OF THE INFO BLOCK IS NOT INCLUDING THE PROPER PREPARATION.

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
			Ext.ComponentQuery.query('toolbar[itemId=detailPageToolbar]')[0].setTitle(index.data.name);
			if(SeaGrant_Proto.backFlag === 0){
				// adding a log item to the "stack"
				SeaGrant_Proto.path[SeaGrant_Proto.pcount] = 'detail';
				SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount] = index; 
	        	SeaGrant_Proto.pcount = ++SeaGrant_Proto.pcount;
	       		Ext.Viewport.animateActiveItem(detailView, this.slideLeftTransition);
	       	}
	       	if(SeaGrant_Proto.backFlag === 1){
	       		SeaGrant_Proto.pcount = --SeaGrant_Proto.pcount;
	       		SeaGrant_Proto.backFlag = 0;
	       		for(w = 0; w < storeInventory.data.all.length; w++){
	        		// check to see if list item name is equal to the list item that was previously selected
	        		if(storeInventory.data.all[w].data.name === SeaGrant_Proto.pvalue[SeaGrant_Proto.pcount].data.name){
	        			num2 = w;
	        		}
	        	}
	       		detailView.items.items[2].select(storeInventory.data.all[num2]);
	        	Ext.Viewport.animateActiveItem(detailView, this.slideRightTransition);
	        }
		}		
	},
	// Functions dealing with 
	// INFO 
	// stuff	######################################################################################	INFO
	onViewBackDetailCommand: function(){
		console.log('In controller(info): Back to Detail Page Button');
		Ext.Viewport.animateActiveItem(this.getDetailView(), this.slideRightTransition);
	},
	onViewSpecificCommand: function(){
		console.log('In controller(info): View Specific Page Button');
		Ext.Viewport.animateActiveItem(this.getSpecificView(), this.slideLeftTransition);
	},	
	onViewIpageListItemCommand: function(record, list, index){
		console.log('In controller(info): Selected');
		// Ext.Msg.alert(index.data.listItem, 'This is the stuff I selected.');
		Ext.ComponentQuery.query('toolbar[itemId=specificPageToolbar]')[0].setTitle(index.data.listItem);
		Ext.Viewport.animateActiveItem(this.getSpecificView(), this.slideLeftTransition);
	},
	// Functions dealing with
	// SPECIFIC
	// stuff	######################################################################################	SPECIFIC
	onViewBackInfoCommand: function(){
		console.log('In controller(specific): Back to Info Page Button');
		Ext.Viewport.animateActiveItem(this.getInfoView(), this.slideRightTransition);
	},
	// Initialize functions
	launch: function(){
		this.callParent(arguments);
		// console.log("launch");
            Ext.getStore('Location').addListener('refresh', 'onLocationStoreRefresh', this);
            Ext.getStore('Product').addListener('refresh', 'onProductStoreRefresh', this);
            Ext.getStore('Vendor').addListener('load', 'onVendorStoreLoad', this);
	},
    onLocationStoreRefresh: function(){
        console.log("Location store data has changed, selectfield should be updated.");
        this.getHomeView().down('[itemId=selectlocation]').reset();
    },
    onProductStoreRefresh: function (){
        console.log("Product store data has changed, selectfield should be updated.");
        this.getHomeView().down('[itemId=selectproduct]').reset();
    },
    onVendorStoreLoad: function(){
        SeaGrant_Proto.location = "Please choose a location";
        SeaGrant_Proto.product = "Please choose a product";
        this.filterVendorStore(SeaGrant_Proto.location, SeaGrant_Proto.product);
        this.getHomeView().getComponent('vendnum').setData(this.buildInventorySummary(SeaGrant_Proto.location, SeaGrant_Proto.product));
    },
	init: function(){
		this.callParent(arguments);
		SeaGrant_Proto.pvalue = [];
		SeaGrant_Proto.path = [];
		SeaGrant_Proto.pcount = 0;
		SeaGrant_Proto.backFlag = 0;
		SeaGrant_Proto.use = 1;
		SeaGrant_Proto.use2 = 1;
		SeaGrant_Proto.infowindowFlag = 0;
		// console.log("init");
	}
});
