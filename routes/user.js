const router=require('express').Router();
const User=require('../models/User')
router.get('/userTest',(req,res)=>{
    res.send('user test is completed successfully')
})
router.post('/postTest',(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    res.send('the username is :'+username+'\n email is :'+email+'\n the password is :'+password)
    
}) 

module.exports=router