const express=require('express');
const router=express.Router();
const QR= require('../utils/qrprototype/qroperation')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { clear } = require('../database/mongodb/operations/operation');


// const QRCode = require('qrcode')

router.get("/genqr",async (req,res)=>{
    // console.log('QR',QR.QR.generator());
    // res.send()
    // assuming i get class name in data
    const tokenId = req.headers['authorization'];
    const teachId = jwt.verify(tokenId,process.env.TEACHER_TOKEN);
    const QRgen=await QR.generator(teachId.password);
    // console.log('QR',QRgen);
    res.header("Access-Control-Allow-Origin","https://hwmdeploy.netlify.app");
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Methods","GET,POST");
    res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization");
    res.status(202).json({message:QRgen});
})

router.get("/clearqr",async(req,res)=>{
    console.log('inclear');
    const tokenId = req.headers['authorization'];
    const teachId = jwt.verify(tokenId,process.env.TEACHER_TOKEN);
    clear(teachId.password);
})

router.post('/getclass',(req,res)=>{ 
    //need to fetch class of teacher according to criteria mentioned in discord notes 
    // also mention what all details need to be passed to get required data
    // send array of class as written below
    res.header("Access-Control-Allow-Origin","https://hwmdeploy.netlify.app");
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Methods","GET,POST");
    res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization");
    res.status(202).json({message:['C1','C2','C3','C4','C1','C2','C3','C4','C1','C2','C3','C4']})
})

module.exports=router

// rajatlink/jwt