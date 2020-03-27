/* GET rooms */
const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const moment = require('moment');
const { FindingAvailableRooms } = require('../db/selectQueries')


let datas
router.post("/", async (req, res, next) => {
    console.log('start')
    const start = req.query.start;
    const end = req.query.end;
    const people = parseInt(req.query.people);
    let rooms = await FindingAvailableRooms(start, end, people)
    datas=rooms

    res.send(rooms);
});


router.get("/", (req,res)=>{
    res.send(datas)
})




module.exports = router;