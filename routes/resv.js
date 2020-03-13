const express=require("express")
const { pool } = require('../db/dbConnect');
const route=express.Router()


let datas
route.post("/",async(req,res)=>{
    try{
        const data=await req.body
        let {start ,end , people}= data
        
    }catch(e){
        console.log(e);
    }

})

// route.get("/" , (req,res)=>{
//     res.send(datas)

// });





module.exports=route