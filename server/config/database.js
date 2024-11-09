/* Establish the DB connection pool here. */
import pg from 'pg';
import 'dotenv/config';

const config = {
    connectionString: process.env.CONNECTION_STRING
};

export const pool = new pg.Pool(config);