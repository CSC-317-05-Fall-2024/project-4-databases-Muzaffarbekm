// routes/api.js
import express from 'express';
const router = express.Router();

// Import necessary functions
import { getRestaurants, createRestaurant, deleteRestaurant } from '../data/restaurants.js';

// Get all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        console.error('Error getting restaurants:', error);
        res.status(500).json({ error: 'Failed to get restaurants' });
    }
});

// Create a new restaurant
router.post('/restaurants', async (req, res) => {
    try {
        const newRestaurant = req.body;
        console.log('Received New Restaurant Data:', newRestaurant);
        const createdRestaurant = await createRestaurant(newRestaurant);
        res.status(201).json(createdRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

// Delete a restaurant by ID
router.delete('/restaurants/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const success = await deleteRestaurant(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
});

export { router as backendRouter };