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
const authenticate=async(username, password)=> {
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
            const passwordHash = await queryResult.rows[0].passwordhash.toString();
         
            //compare hash and plaintext and return the result
            if (!await bcrypt.compare(password, passwordHash)){
                throw new Error('PASS');
            }
       
       
}

// authenticate('amir2211' , 'sex221177')

/**
 * insert a username and password into verifyuser
 * @param {String} username 
 * @param {String} password will be hashed
 */
 const insertUsernamePassword=async(username, password)=>{
    try {
    const hash = await bcrypt.hash(password, SALTROUNDS);
    console.log(hash);
    pool.query(`INSERT INTO verifyuser VALUES ('${username}', '${hash}')`, defaultCallback)
    } catch(error) {
        console.log(error);
    }
}


const forgotPassword= async(username , password)=>{
    console.log('im here')
    console.log(username)
    console.log(password)
     const hash= await bcrypt.hash(password,SALTROUNDS)
     const tryresp=await pool.query(`select * from verifyuser where username = '${username}'`)
     if(tryresp.rows.length===0) throw new Error("No user")
     const response= await pool.query(`UPDATE verifyuser SET passwordhash = '${hash}'  WHERE username = '${username}' `)
    console.log(response)
 
}
// insertUsernamePassword('amir2211' , 'sex221177')

/* TESTING */

// const user = 'test';
// const pass = 'test';

// authenticate(user, pass)
//     .then((res, err) => console.log(res))
// forgotPassword('amir2211' , 'negddsada 221177')

module.exports = {
    authenticate,
    insertUsernamePassword,
    forgotPassword
}