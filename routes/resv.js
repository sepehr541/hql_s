const express=require("express")
const moment = require('moment');
const { FindingAvailableRooms } = require('../db/insertQueries');
const route = express.Router();


let datas=[]
route.post("/", async(req,res) => {
  const start = moment(req.body.start.slice(0,10))
  const end = moment(req.body.end.slice(0,10))
  const people = parseInt(req.body.people)
  datas = await FindingAvailableRooms(start, end, people)
  res.send(datas)
})

route.get("/" , (req,res)=>{
    res.send({datas})

});





module.exports = route;