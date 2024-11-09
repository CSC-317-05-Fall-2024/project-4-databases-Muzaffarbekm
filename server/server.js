import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant } from './data/restaurants.js'; // Import both functions
import { backendRouter } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse URL-encoded form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mount the API router
app.use('/api', backendRouter);

// Route for the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the attractions page
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// Serve the restaurants page
app.get('/restaurants', (req, res) => {
    res.render('restaurants'); // No need to pass any data
});


// Route for a specific restaurant by ID
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id;
    const restaurant = getRestaurant(id);
    if (restaurant) {
        res.render('restaurant-details', restaurant); // Spread the restaurant object
    } else {
        res.status(404).send('Restaurant not found');
    }
});

// Handle form submission (if needed)
app.post('/add-restaurant', (req, res) => {
    const { name, phone, address, photo } = req.body;
    console.log('New Restaurant Data:', { name, phone, address, photo });
    res.send('Restaurant added successfully!'); // For now, just send a simple response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
