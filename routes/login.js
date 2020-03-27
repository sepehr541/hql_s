const express = require('express');
const { authenticate } = require('../db/dbUserAuth');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const user = req.body.username;
    const pass = req.body.password;
    if (await authenticate(user, pass)) {
        res.send('SUCCESS');
    } else {
        res.send('FAILURE')
    }
})

module.exports = router;