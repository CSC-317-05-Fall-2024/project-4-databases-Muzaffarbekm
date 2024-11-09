// data/restaurants.js
import { pool } from '../config/database.js';

// Get a list of restaurants
const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants ORDER BY id');
        return result.rows;
    } catch (error) {
        console.error('Error getting restaurants:', error);
        throw error;
    }
};

// Get a restaurant by id
const getRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        return result.rows[0]; // Return first match or undefined if not found
    } catch (error) {
        console.error('Error getting restaurant:', error);
        throw error;
    }
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
    try {
        const { name, phone, address, photo } = newRestaurant;
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, address, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        return result.rowCount > 0; // Returns true if a row was deleted, false if no match found
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
};

// Get reviews for a specific restaurant
const getReviewsForRestaurant = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY id',
            [id]
        );
        return result.rows;
    } catch (error) {
        console.error('Error getting reviews for restaurant:', error);
        throw error;
    }
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant };
