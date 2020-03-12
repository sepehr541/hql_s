const express=require("express")
const { pool } = require('../db/dbConnect');
const route=express.Router()


let datas
route.post("/",async(req,res)=>{
    const data=await req.body
    datas=JSON.parse(data)
    let {start ,end , people}= datas
    console.log(start);
   pool.query( 'select ')    
})

// route.get("/" , (req,res)=>{
//     res.send(datas)

// });





module.exports=route