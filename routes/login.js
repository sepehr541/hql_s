const express = require('express');
const { authenticate } = require('../db/dbUserAuth');
const jwt = require('jsonwebtoken');
const jwtKey = require('../auth/jwtKey');
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

module.exports = router;