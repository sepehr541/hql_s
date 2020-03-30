const express = require('express');
const { authenticate } = require('../db/dbUserAuth');
const jwt = require('jsonwebtoken');
const jwtKey = require('../public/auth/jwtkey');
const router = express.Router();


const jwtExpiry = 7200;

router.post('/', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await authenticate(username, password);
        const token = jwt.sign({username}, jwtKey, {
            algorithm: 'HS256',
            expiresIn: jwtExpiry
        })
        res.json(token); 
    } catch (error) {
        console.log(error);
        res.status(401);
        if (error.message == 'USER') {
            res.send('USER')
        } else {
            res.send('PASS')
        }
    }
});

// router.post('/forgotPassword' , async(req,res)=>{
//     const username=req.body.username
//     const password=req.body.password
//     try{
//         await forgotPassword(username , password)
//         res.send('Success')
//     }catch (e){
//         res.status(401)
//         if(e.message=='User Not Found') res.send("no user found")
//         else{
//             res.send(e)
//         }
//     }
// })

module.exports = router;