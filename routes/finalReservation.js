const express=require("express")
const route=express.Router()
const {saveReservation}=require('../db/insertQueries')



let datas=null
route.post("/", async(req,res)=>{
    const data= await req.body
    const name =await data.name
    const start= await data.start
    const end = await data.end
    const people = await data.people
    const roomid= await data.roomid
    const phone = await data.phone
    const email= await data.email
    const price = await data.totalPrice
    
    let startDate=start.toString().slice(0,10)
    let endDate=end.toString().slice(0,10)
    console.log(typeof(name))
    console.log(typeof(startDate))
    console.log(typeof(endDate))
    console.log(phone)
    console.log(email)
    console.log(roomid)
    console.log(typeof(people))
    console.log(typeof(price))
    let answer= await saveReservation(name , startDate, endDate , phone, email , roomid , price , people)
    console.log(answer)
    res.send({answers:answer})

})



route.get('/' , (req, res)=>{
    res.send(datas)
})

module.exports=route;
