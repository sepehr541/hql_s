const express = require('express');
const jwt = require('jsonwebtoken');
const jwtKey = require('../auth/jwtkey');
const { getEmployees, getReservations, getRooms, getEvents, getSearchFromDB, getStats, getRoomWithEssentials, projectEmp } = require('../db/selectQueries');
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
        console.log(userToken)
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

router.get('/essentials', async (req, res) => {
    try {
        const allrooms = await getRoomWithEssentials()
        res.send(allrooms)
    } catch (e) {
        res.status(404)
        console.log(e)
        res.send('No data available right now')
    }

})



router.get('/stats', async (req, res, next) => {
    try {
        res.send(await getStats());
    } catch (error) {
        console.log('im here')
        console.log(error);
        if (error.message == 'No data found') {
            res.status(404).send('No data found')
        }
        next(error)
    }
})

// general database search with query
router.post('/search', async (req, res, next) => {
    console.log(req.body);
    try {
        res.send(await getSearchFromDB(req.body.table, req.body.columns))
    } catch (error) {
        // console.log(error);
        next(error)
    }
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
});

router.delete('/employees', async (req, res, next) => {
    console.log(req.body.id);
    try {
        await deleteEmployee(req.body.id);
        res.end();
    } catch (error) {
        next(error);
    }
});

router.patch('/employees', async (req, res, next) => {
    const id = req.body.id;
    const data = {
        position: req.body.empPosition,
        salary: req.body.empSalary,
        service: req.body.empSection
    }
    try {
        await updateEmployee(id, data);
        res.end();
    } catch (error) {
        next(error)
    }
});

// handle resv
router.get('/resv', async (req, res, next) => {
    try {
        const reservations = await getReservations();
        res.json(reservations);
    } catch (error) {
        next(error)
    }

});


router.delete('/resv', async (req, res, next) => {
    try {
        await deleteResv(req.body.id, req.body.data);
        res.end();
    } catch (error) {
        next(error)
    }
});


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

        next(error)
    }
});

router.delete('/rooms', async (req, res, next) => {
    try {
        await deleteRoom(req.body.id);
        res.end();
    } catch (error) {
        next(error)
    }
});


// handle events
router.get('/events', async (req, res) => {
    try {
        const queryResult = await getEvents();
        res.json(queryResult);
    } catch (error) {
        next(error);
    }
});

router.post('/events', async (req, res, next) => {
    console.log(req.body);
    try {
        await insertEvent(req.body.eventName,
            req.body.eventStart[0], req.body.eventEnd[0]);
        res.json(await getEvents());
    } catch (error) {
        next(error);
    }
});

router.delete('/events', async (req, res, next) => {
    try {
        await deleteEvent(req.body.id);
        res.end();
    } catch (error) {
        console.log(error)
        next(error)
    }
});

router.get('/visitors', async (req, res, next) => {
    try {
        res.send(await getVisitors());
    } catch (error) {
        next(error);
    }
});

router.patch('/visitors', async (req, res, next) => {
    const id = req.body.id;
    const data = {
        email: req.body.visitorEmail,
        phone: req.body.phone
    }
    try {
        await updateVisitor(req.body);
        res.end();
    } catch (error) {
        next(error)
    }
});

router.delete('/visitors', async (req, res, next) => {

});

router.post('/proj', async (req, res, next) => {
    const data = [...req.body]
    try {
        res.send(await projectEmp([...data]))
    } catch (error) {
        next(error)
    }
})

module.exports = {
    router,
    verifyToken
}
