const express=require("express")
const route=express.Router()


let datas=null
route.post("/",async(req,res)=>{
    const data= await req.body
    datas=data
    console.log(data);
})


route.get("/" , (req,res)=>{
    res.send(datas)

})


module.exports=route