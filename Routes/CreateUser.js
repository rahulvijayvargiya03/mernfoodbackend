const express= require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User  = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret="myNameisRahulVijayvargiya";
router.post("/createUser",[
body('email').isEmail(),
// password must be at least 5 chars long
// body('name').isLength({ min: 3 }),
body('password','Wrong Password').isLength({ min: 5 })],
async(req,res)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
   try{
      await User.create({
         name:req.body.name,
         location:req.body.location,
         email:req.body.email,
         password:secPassword
      })
       res.json({success:true});
   } catch (error){
      console.log(err);
      res.json({success:false});
   }
})
router.post("/loginUser",[
body('email','wrong email').isEmail(),
body('password','Wrong Password').isLength({ min: 5})],
async (req,res)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email =req.body.email;
   try{
    let userData= await User.findOne({email});
   //  console.log("user data",userData);
       if(!userData){
         return res.status(400).json({errors:"Try logging with correct credentials"});
       }
       const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
       if(!pwdCompare){
         // console.log("password",userData.password);
         return res.status(400).json({errors:"Try logging with correct password"});

       }
       const data ={
         user:{
            id:userData.id
         }
       }
       const authToken=jwt.sign(data,jwtSecret);
       // console.log(authToken);
       return res.json({success:true,authToken:authToken});
   } catch (error){
      console.log(err);
      res.json({success:false});
   }
})
module.exports =router;