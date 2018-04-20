require('dotenv').config();
import * as knex from 'knex';
import Controllers from './controllers';

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST || '127.0.0.1',
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : 'kojo'
    }
});

const controllers = new Controllers(db);
const { initialize } = controllers;

// initialize.createUserTable();
// initialize.dropTableIfExists('user');
// initialize.dropAllTables();
initialize.initDatabase()