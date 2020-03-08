const express=require("express")
const route=express.Router()


let datas=null
route.post("/",async(req,res)=>{
    let {start, end, people}=req.query
    
    
})


route.get("/" , (req,res)=>{
    res.send(datas)

})


module.exports=route