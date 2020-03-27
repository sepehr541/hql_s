const express=require("express")
const route=express.Router()



let datas=null
route.post("/", async(req,res)=>{
    const data= await req.body
    const name =await data.name
    const start= await data.start
    const end = await data.end
    let  people = await data.people
    const roomid= await data.roomid
    const phone = await data.phone
    const email= data.email
    people= parseInt(people)
    console.log(name)
    console.log(start)
    console.log(end)
    console.log(phone)
    console.log(email)
    console.log(roomid)
    console.log(people)
    


})



route.get('/' , (req, res)=>{
    res.send(datas)
})

module.exports=route;