/* GET rooms */
const express = require('express');
const router = express.Router();
const { FindingAvailableRooms } = require('../db/selectQueries')

router.post("/", async (req, res, next) => {
    const start = req.query.start;
    const end = req.query.end;
    const people = parseInt(req.query.people);
    let rooms = await FindingAvailableRooms(start, end, people);
    console.log('rooms',rooms)
    console.log(start)
    console.log(end)
    console.log(people)
    res.send(rooms);
});


router.get("/", (req,res)=>{
    res.send(datas)
})


module.exports = router;