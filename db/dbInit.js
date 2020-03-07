const { Pool } = require('pg');
const auth=require("../public/auth/auth")
// Connection to PostgreSQL on Docker container
// TODO

const pool = new Pool(auth);


exports.pool = pool;