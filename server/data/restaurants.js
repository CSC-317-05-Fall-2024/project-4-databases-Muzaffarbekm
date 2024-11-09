// data/restaurants.js

const restaurantData = [
    {
        id: 0,
        name: "The Fish Express",
        phone: "(808) 245-9918",
        address: "3343 Kuhio Hwy, Lihue, HI 96766",
        photo: "/images/fish-express.png"
    },
    {
        id: 1,
        name: "Hanalei Dolphin Restaurant",
        phone: "(808) 826-6113",
        address: "5-5016 Kuhio Hwy, Hanalei, HI 96714",
        photo: "/images/hanalei-market.jpg"
    },
    {
        id: 2,
        name: "Keoki's Paradise",
        phone: "(808) 742-7534",
        address: "2360 Kiahuna Plantation Dr, Koloa, HI 96756",
        photo: "/images/keokis-paradise-exterior.jpg"
    },
    {
        id: 3,
        name: "Beach House Restaurant",
        phone: "(808) 742-1424",
        address: "5022 Lawai Rd, Koloa, HI 96756",
        photo: "/images/beach-house.jpg"
    },
    {
        id: 4,
        name: "Hukilau Lanai",
        phone: "(808) 822-0600",
        address: "520 Aleka Loop, Kapaa, HI 96746",
        photo: "/images/hukilau-lanai.jpg"
    },
    {
        id: 5,
        name: "Kalypso Island Bar & Grill",
        phone: "(808) 826-9700",
        address: "5-5156 Kuhio Hwy, Hanalei, HI 96714",
        photo: "/images/kalypso.jpeg"
    }
];

let lastId = restaurantData.length - 1; // Adjusted to match the highest current ID

const getNextId = () => {
    lastId += 1;
    return lastId;
};

// Get a list of restaurants
const getRestaurants = () => {
    return restaurantData;
};

// Get a restaurant by id
const getRestaurant = (id) => {
    return restaurantData.find(restaurant => restaurant.id === parseInt(id));
};

// Create a new restaurant entry
const createRestaurant = (newRestaurant) => {
    console.log('New Restaurant:', newRestaurant);
    const id = getNextId();
    const restaurant = { id, ...newRestaurant };
    restaurantData.push(restaurant);
    return restaurant;
};

// Delete a restaurant by id
const deleteRestaurant = (id) => {
    const index = restaurantData.findIndex(restaurant => restaurant.id === parseInt(id));
    if (index !== -1) {
        restaurantData.splice(index, 1);
        return true; // Successfully deleted
    }
    return false; // Restaurant not found
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };
