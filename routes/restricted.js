const express = require('express');

const router = express.Router();
const verifyToken = async (req, res, next) =>{
    const authorization = req.headers['authorization'];
    console.log(authorization);
    res.end()
}

// verify the token on every request
router.use('/', verifyToken);

// // handle
// router.get('/employees')
// router.post()
// router.delete()
// router.update()

// // handle
// router.get()
// router.post()
// router.delete()
// router.update()


// // handle
// router.get()
// router.post()
// router.delete()
// router.update()


module.exports = router;
