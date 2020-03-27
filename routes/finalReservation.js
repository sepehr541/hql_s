const express = require('express');
const router = express.Router();



router.post('/' , async(req,res)=>{
    const data =await req.body
    console.log(data)
    res.send('negro')
})


router.get('/',(req ,res)=>{
res.send('kos')
})


module.exports=router

