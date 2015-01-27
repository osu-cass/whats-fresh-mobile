// Creates global objects that contain test data.
// This is to be kept up-to-date with the API

// Assign the Global Variable
window.TestData = {};

// Please don't judge me.
// This function adds a get() method to the object to
// make it look like a store model/record.
TestData.modelify = function (obj) {
    obj = JSON.parse(JSON.stringify(obj));
    obj.get = function (key) { return this[key]; };
    return obj;
};

TestData.StoryArray = [
	{
	name: "Starfish Enterblub", 
	videos: [
		{caption: "A Starship", 
		link: "http://www.youtube.com/watch?v=efgDdSWDg0g", 
		name: "Starship!"}
	],
	created: "2014-08-08T23:27:05.568Z",
   	season: "All of them", 
	modified: "2014-12-04T18:31:27.319Z", 
	facts: "The Starfish Enterblub is a spaceship", 
	ext: {}, 
	products: "This is a product", 
	preparing: "Spaceships are usually well prepared for you", 
	error: {
		status: false, 
		text: null, 
		name: null, 
		debug: null, 
		level: null}, 
	images: [
		{
			caption: "Meow!", 
			link: "/media/images/163.gif", 
			name: "Not a cat"
		}, 
		{
			caption: "Put a smile on!", 
			link: "/media/images/smile.jpg", 
			name: "Happy"
		}], 
		id: 1, 
		buying: "Buying a spaceship is an expensive proposition.", 
		history: "These are the voyages of the Starfish Enterblub; her five year mission -- to seek out new fish and new fishilizations..."}
]

TestData.VendorArray = [
    {
        city: 'Newport',
        updated: true,
        description: 'a place with stuff',
        zip: '97523',
        created: true,
        ext: false,
        location_description: 'its a place with a thing',
        lat: '44.0',
        lng: '120.0',
        email: 'user@email.com',
        website: 'site.com',
        phone: '555-555-5555',
        state: 'OR',
        street: 'corner street',
        products: [
            {
                name : 'One Fish',
                preparation : 'Live',
            },
            {
                name : 'Two Fish',
                preparation : 'Filet'
            }            
        ],
        contact_name: 'John Doe',
        story: 'see other side',
        name: 'fish place',
        is_not_filterable: false
        },
    {
        city: 'Coos Bay',
        updated: false,
        description: 'stuff',
        zip: '97420',
        created: true,
        ext: false,
        location_description: 'its a place with a thing2',
        lat: '44.0',
        lng: '121.0',
        email: 'user@email.com2',
        website: 'site.com2',
        phone: '555-555-2222',
        state: 'OR',
        street: 'corner street2',
        products: [
            {
                name : 'Red Fish',
                preparation : 'Dried'        
            },
            {
                name : 'Blue Fish',
                preparation : 'Frozen'        
            }
        ],
        contact_name: 'J.D. Smith',
        story: 'none',
        name: 'fishy',
        is_not_filterable: false
        },
    {
        city: 'Coos Bay',
        updated: false,
        description: 'stuff',
        zip: '97420',
        created: true,
        ext: false,
        location_description: 'its a place with a thing2',
        lat: '45.0',
        lng: '121.0',
        email: 'user@email.com2',
        website: 'site.com2',
        phone: '555-555-2222',
        state: 'OR',
        street: 'corner street2',
        products: [
            {
                name : 'One Fish',
                preparation : 'Live',
            },
            {
                name : 'Two Fish',
                preparation : 'Filet'
            },
            {
                name : 'Red Fish',
                preparation : 'Dried'        
            },
            {
                name : 'Blue Fish',
                preparation : 'Frozen'        
            }
        ],
        contact_name: 'J.D. Smith',
        story: 'none',
        name: 'Test Store',
        is_not_filterable: false
        },
    {
        city: 'Newport',
        updated: false,
        description: 'stuff',
        zip: '97420',
        created: true,
        ext: false,
        location_description: 'A test store with no inventory with the name: Newport',
        lat: '45.0',
        lng: '121.0',
        email: 'user@email.com2',
        website: 'site.com2',
        phone: '555-555-2222',
        state: 'OR',
        street: 'corner street2',
        products: [
            {
                name : 'Blue Fish',
                preparation : 'Frozen'        
            }
        ],
        contact_name: 'J.D. Smith',
        story: 'none',
        name: 'Not Actually In Newport',
        is_not_filterable: false
        },
    {
        name: '--Not Filterable--',
        description: 'A test datum simulating a label/placeholder',
        is_not_filterable: true
    }
];

TestData.LocationArray = [
    {
        location: 1,
        name: 'Newport'
        },
    {
        location: 2,
        name: 'Coos Bay'
        }
];

TestData.ProductArray = [
    {
        name : 'One Fish',
        preparation : 'Live',
    },
    {
        name : 'Two Fish',
        preparation : 'Filet'
    },
    {
        name : 'Red Fish',
        preparation : 'Dried'        
    },
    {
        name : 'Blue Fish',
        preparation : 'Frozen'        
    }
];
