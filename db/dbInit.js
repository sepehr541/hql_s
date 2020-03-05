const { Pool } = require('pg');

// Connection to PostgreSQL on Docker container
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'docker',
    port: 5432,
})

/**
 * TESTING CONNECTION
 */

// pool.query('SELECT $1::text as name', ['brianc'], (err, result) => {
//   if (err) {
//     return console.error('Error executing query', err.stack)
//   }
//   console.log(result.rows[0].name) // brianc
// })

// pool.query(`CREATE TABLE test (
//             id INTEGER, name CHAR(20))`,
//           (err, result) => {
//             if (err) {
//               return console.error('Error executing query', err.stack)
//             }
//             else {
//               console.log("Table should be made");
//             }
// });


// pool.query(`INSERT INTO test(id, name) VALUES (20, 'Tom')`, (err, result) => {
//   if (err) {
//     return console.error('Error executing query', err.stack)
//   }
//   else {
//     console.log("Tom should now be in the table");
//   }
// })

// pool.query(`SELECT * FROM pg_stat_activity`, (err, result) => {
//     if (err) {
//       return console.log(err.stack);
//     } 
//     else {
//       console.log(result.rows);
//     }
// })

exports.pool = pool;