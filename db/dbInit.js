const { Pool } = require('pg');
const USERNAME = 'postgres';
const HOST = 'localhost';
const DB = 'postgres';
const PWD = 'docker';
const PORT = 5432;

// Connection to PostgreSQL on Docker container
// TODO
const pool = new Pool({
    user: USERNAME,
    host: HOST,
    database: DB,
    password: PWD,
    port: PORT,
})


exports.pool = pool;