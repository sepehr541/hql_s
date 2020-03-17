/* GET rooms */
const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const moment = require('moment');
const { FindingAvailableRooms } = require('../db/selectQueries')

router.get("/", async (req, res, next) => {
    const start = req.query.start;
    const end = req.query.end;
    const people = parseInt(req.query.people);
    let rooms = await FindingAvailableRooms(start, end, people)
    res.send(rooms);
});

module.exports = router;