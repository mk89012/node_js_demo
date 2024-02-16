require('dotenv').config()
const {User, validate,validateLoginUser } = require('./authModel');
const {Profile,validateProfile } = require('../profile_module/profileModel');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
jwt = require('jsonwebtoken');

var db=mongoose.connection;






  

////create user api ......................................
const createUser =async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send({status:false,message:"error.details[0].message"})
    }
    
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send({status:false,message:'User already exisits. Please sign in'})
    } else {
        try {
            const url = req.protocol + '://' + req.get("host");
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            var imageName;
            var imageUrl='';
            if(req.file!=null){
                 imageName =req.file.filename.slice(0,req.file.filename.lastIndexOf("-"))
                 imageUrl= url + '/upload/' + imageName;
            }
           

            const userRes = await User.create({
                email: req.body.email,
                password:password
              });

              const token = jwt.sign({ email: userRes.email, fullName: userRes.name, _id: userRes._id }, process.env.JWT_SECRET_KEY, {
                // expiresIn: '1 hour'
                expiresIn:'24h'
              });
           var profile= await Profile.create({
                user_id:userRes._id,
                name: req.body.name,
                email: req.body.email,
                profilePictureURL: imageUrl,
                token: token
              });
             
       
            return res.status(201).json({status:true,message:"Register SuccessFully", token: token,
            data:{
                // name:profile.name,
                // email:profile.email,
                // profile_img:profile.profilePictureURL,
                sdf:"dsfd",
                reqs:req.get("host")
            }});
        } catch (err) {
            return res.status(400).json({status:false, message: err.message })
        }
      
    }
}



///Login user api.......................................
 const loginUser =async (req, res)=>{
    const { error } = validateLoginUser(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    
    let user = await User.findOne({email: req.body.email });
    if (user==false||user==null) {
        return res.status(400).send({status:false,message:'User is not found'})
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const enterPassword = await bcrypt.hash(req.body.password, salt)
            const password = await bcrypt.hash(req.body.password, salt)

           if(enterPassword==password){
            const token = jwt.sign({ email: user.email, fullName: user.name, _id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn:'24h'    // expiresIn: '1 hour'

              });

              const profile= await Profile.findOne({user_id:user._id});
              profile.token=token;
              profile.save();
            return res.status(200).json({
                status:true,
                message:"Login SuccessFully", 
                token:token,
                data:{
                    name:profile.name,
                    email:profile.email,
                    profile_img:profile.profilePictureURL,
                }
             });
           }else{
            return res.status(200).json({status:true,message:"Wrong Password"});
           }
            
        } catch (err) {
            return res.status(400).json({status:false, message: err.message })
        }
    }
 };



 ///Login user api.......................................
 const logOutUser =async (req, res)=>{
    try {
    const profile=await Profile.findOne({user_id:req.userData._id});
    if(profile){
        profile.token='';
        profile.save();
        return res.status(200).json({
            status:true,
            message:"Logout SuccessFully"});
    }else{
        return res.status(200).json({
            status:false,
            message:"Session already expired"});
    }
        
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
 };



 

 exports.createUser = createUser;
 exports.loginUser = loginUser;
 exports.logOutUser =logOutUser;




 