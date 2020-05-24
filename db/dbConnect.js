const { Pool } = require('pg');
// Connection to PostgreSQL on Docker container
// TODO
const pool = new Pool({
    connectionString:process.env.POSTGRES
});

exports.pool = pool;