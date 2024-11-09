// config/seed-db.js
import { pool } from './database.js';

const dropTables = async () => {
    try {
        console.log('Dropping reviews table...');
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
        `;
        await pool.query(dropTablesQuery);
        console.log('Reviews table dropped successfully');
    } catch (error) {
        console.error('Error dropping tables:', error);
        throw error;
    }
};

const createTables = async () => {
    try {
        console.log('Creating reviews table...');
        const createTablesQuery = `
            CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                content TEXT NOT NULL
            );
        `;
        await pool.query(createTablesQuery);
        console.log('Reviews table created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
};

const insertData = async () => {
    try {
        // First get some existing restaurant IDs
        const restaurantResult = await pool.query('SELECT id FROM restaurants LIMIT 2');
        const restaurants = restaurantResult.rows;
        
        console.log('Inserting reviews...');
        if (restaurants.length >= 2) {
            const reviews = [
                [restaurants[0].id, 5, 'Excellent food and service!'],
                [restaurants[0].id, 4, 'Great atmosphere, slightly pricey'],
                [restaurants[1].id, 5, 'Best restaurant in town!'],
                [restaurants[1].id, 4, 'Really enjoyed the experience']
            ];

            for (const [restaurantId, rating, content] of reviews) {
                await pool.query(
                    'INSERT INTO reviews (restaurant_id, rating, content) VALUES ($1, $2, $3)',
                    [restaurantId, rating, content]
                );
            }
            console.log('Reviews inserted successfully');
        } else {
            console.log('Not enough restaurants found to add reviews');
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
};

const setup = async () => {
    try {
        await dropTables();
        await createTables();
        await insertData();
        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Error during database setup:', error);
    } finally {
        await pool.end();
    }
};

setup();