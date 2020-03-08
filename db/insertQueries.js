const { pool } = require('./dbConnect');

const insertIntoTable = (table, data) => {
    pool.query(`INSERT INTO ${table} VALUES ${data}`)
    .then()
    .catch((e)=>{
        console.log(e);
    })
}