const express=require('express');
const { generateLoginToken, decodeLoginToken } = require('../utils/jwt/jwtoperations');
const router=express.Router();
require('dotenv').config()

// const QRCode = require('qrcode')

router.post("/login",(req,res)=>{
    // obj.password is unique id while obj.userName is userid of teacher
    // need to validate if credentials match
    // if(obj.password===obj.userName) is the condition used now which will be replaced by true return if credentials are valid
    const obj=req.body;
    console.log(obj);
    if(obj.type){
        if(obj.type==='teacher'){
            if(obj.password===obj.userName){
                const token=generateLoginToken(obj.userName,obj.password);
                res.header("Access-Control-Allow-Origin","https://hwmdeploy.netlify.app");
                res.header('Access-Control-Allow-Credentials', 'true')
                res.header("Access-Control-Allow-Methods","GET,POST");
                res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization");
                res.status(202).json({message:token});
            }
            else{
                res.header("Access-Control-Allow-Origin","https://hwmdeploy.netlify.app");
                res.header('Access-Control-Allow-Credentials', 'true')
                res.header("Access-Control-Allow-Methods","GET,POST");
                res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization");
                res.sendStatus(401).json({message:'UnAuthorized User'});
            }
        }
        else if(obj.type==='student'){
            
        }
    }
})

router.post("/verify",(req,res)=>{
    const tokenId = req.headers['authorization']; 
    console.log('Token Rec ', tokenId);
     const isVerified = decodeLoginToken(tokenId); 
     if(isVerified){
        res.header("Access-Control-Allow-Origin","https://hwmdeploy.netlify.app");
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header("Access-Control-Allow-Methods","GET,POST");
        res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization");
        res.status(202).json({message:'Authorized'});
        
     }
     else{
        res.header("Access-Control-Allow-Origin","https://hwmdeploy.netlify.app");
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header("Access-Control-Allow-Methods","GET,POST");
        res.header("Access-Control-Allow-Headers","Origin,Content-Type,Authorization");
        res.status(401).json({message:'UnAuthorized User'});
     }
})



module.exports=router