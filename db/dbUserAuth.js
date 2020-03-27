const { pool } = require('./dbConnect');
const { defaultCallback } = require('./dbConstants');
const bcrypt = require('bcrypt');

const SALTROUNDS = 10;

/**
 * verify user with user/pass
 * @param {String} username 
 * @param {String} password 
 * 
 * @returns {Promise} resolves to result of authentication
 */
async function authenticate(username, password) {
        // get hashed password from DB
        const queryResult = await pool.query(`
        SELECT passwordHash
        FROM verifyuser
        WHERE username = '${username}'
        `)
        if (queryResult.rows.length == 0){
            throw new Error('USER');
        }
        // extract hash from the query result
        const passwordHash = queryResult.rows[0].passwordhash.toString();

        //compare hash and plaintext and return the result
        if (!await bcrypt.compare(password, passwordHash)){
            throw new Error('PASS');
        }
}


/**
 * insert a username and password into verifyuser
 * @param {String} username 
 * @param {String} password will be hashed
 */
async function insertUsernamePassword(username, password) {
    try {
    const hash = await bcrypt.hash(password, SALTROUNDS);
    console.log(hash);
    pool.query(`INSERT INTO verifyuser VALUES ('${username}', '${hash}')`, defaultCallback)
    } catch(error) {
        console.log(error);
    }
}


/* TESTING */

// const user = 'test';
// const pass = 'test';

// authenticate(user, pass)
//     .then((res, err) => console.log(res))

module.exports = {
    authenticate,
    insertUsernamePassword,
}