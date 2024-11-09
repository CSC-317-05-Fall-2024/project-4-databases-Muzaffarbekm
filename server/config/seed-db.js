import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE restaurants (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                phone VARCHAR(20),
                address TEXT,
                photo TEXT
            );
        `;
        await pool.query(createTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {
    try {
        const insertDataQuery = `
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES 
                ('Burger King', '(555) 555-5555', '123 Burger Lane', 'https://picsum.photos/200/300'),
                ('Pizza Palace', '(555) 123-4567', '456 Pizza Road', 'https://picsum.photos/200/300'),
                ('Taco Time', '(555) 987-6543', '789 Taco Street', 'https://picsum.photos/200/300');
        `;
        await pool.query(insertDataQuery);
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();