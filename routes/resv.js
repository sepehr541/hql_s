const express=require("express")
const { pool } = require('../db/dbConnect');
const moment = require('moment');
const {FindingAvailableRooms} =require('../db/insertQueries')
const chalk=require('chalk')
const route=express.Router()


let datas=[]
route.post("/",async(req,res)=>{
  const data = await req.body
  const start = await data.start.slice(0,10)
  const end =await data.end.slice(0,10)
  const people=  parseInt(data.people)
  datas=await FindingAvailableRooms(start,end,people)
  res.send(datas)

})

route.get("/" , (req,res)=>{
    res.send({datas})

});





module.exports=route