const express=require("express")
const moment = require('moment');
const { FindingAvailableRooms } = require('../db/insertQueries');
const route = express.Router();


let datas
route.post("/", async(req,res) => {
    const data=req.body
    datas=data
    res.send('salam')
})

route.get("/" , (req,res)=>{
    res.send({datas})

});

module.exports = route;