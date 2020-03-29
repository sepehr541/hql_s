const express = require('express');
const jwt = require('jsonwebtoken');
const jwtKey = require('../auth/jwtKey');
const { getEmployees, getReservations, getRooms, getEvents } = require('../db/selectQueries');
const { insertEvent, insertEmployee, insertRoom } = require('../db/insertQueries');
const { deleteEmployee, deleteResv, deleteEvent, deleteRoom } = require('../db/deleteQueries');
const router = express.Router();

/**
 * verify user's token
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next called after the middleware 
 */
const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        const userToken = authorization.split(' ')[1];
        jwt.verify(userToken, jwtKey);
        next();
    } catch (error) {
        res.status(403).send('UNATHORIZED')
    }
}

// verify the token on every request
router.get('/', async (req, res) => {
    res.send('Token valid')
})

// handle employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await getEmployees();
        res.json(employees);
    } catch (error) {
        console.log(error);
        res.end('error')
    }
})
router.post('/employees', async (req, res, next) => {
    console.log(req.body);
    try {
        await insertEmployee(req.body.empName, req.body.empPos, req.body.empSection, req.body.empSalary);
        res.end();
    } catch (error) {
        next(error)
    }
})


router.delete('/employees', async (req, res, next) => {
    console.log(req.body.id);
    try {
        await deleteEmployee(req.body.id);
        res.end();
    } catch (error) {
        next(error);
        console.log(error);
    }
})
// router.update()

// handle resv
router.get('/resv', async (req, res) => {
    try {
        const reservations = await getReservations();
        console.log(reservations);
        res.json(reservations);
    } catch (error) {
        console.log(error);
    }

});
// router.post()
router.delete('/resv', async (req, res, next) => {
    try {
        await deleteResv(req.body.id);
        res.end();
    } catch (error) {
        next(error)
    }
})
// router.update()


// handle rooms
router.get('/rooms', async (req, res, next) => {
    try {
        const rooms = await getRooms();
        res.json(rooms);
    } catch (error) {
        next(error)
    }
});

router.post('/rooms', async (req, res, next) => {
    try {
        await insertRoom(req.body.roomNum, req.body.roomCap, req.body.roomBed);
        res.end();
    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.delete('/rooms', async (req, res, next) => {
    try {
        await deleteRoom(req.body.id);
        res.end();
    } catch (error) {
        console.log(error);
        next(error)
    }
})
// router.update('/rooms', async (req, res, next) => {
//     try {
//         await updateRoom(req.body.id, req.body.price, req.body.bedtype)
//     } catch (error) {
//         next(error)
//     }
// })

// handle events
router.get('/events', async (req, res) => {
    try {
        const queryResult = await getEvents();
        res.json(queryResult);
    } catch (error) {
        next(error);
    }
})


router.post('/events', async (req, res, next) => {
    console.log(req.body);
    try {
        await insertEvent(req.body.eventName,
            req.body.eventStart[0], req.body.eventEnd[0]);
        res.json(await getEvents());
    } catch (error) {
        next(error);
    }
})


router.delete('/events', async (req, res, next) => {
    try {
        await deleteEvent(req.body.id);
        res.end();
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = {
    router,
    verifyToken
}
