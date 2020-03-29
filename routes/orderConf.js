const express=require('express')
const route =express.Router()
const {FindingOrderConfirmation} = require('../db/selectQueries')


let datas=null
route.post('/', async(req,res)=>{
    const data= await req.body
    console.log(data)
    let orderNum=parseInt(data.orderNum)
    console.log(orderNum)
    let results= await FindingOrderConfirmation(orderNum)
    datas=results
    console.log(datas)
    res.send(results)

})


route.get('/',(req,res)=>{
    res.send(datas)
})




module.exports=route;