require('dotenv').config()
const {Profile} = require('./profileModel');
const mongoose = require('mongoose');
var db=mongoose.connection;








////create user api ......................................

const updateUserProfile =async (req, res) => {

    try {
       var url = req.protocol + '://' + req.get("host");
        var imageName='';
        var imageurl="";
        if(req.file!=null){
            
            imageName =req.file.filename.slice(0,req.file.filename.lastIndexOf("-"))
            imageurl= url + '/upload/' + imageName;
        }
       

        const user = await Profile.create({
            name: req.body.name,
            email: req.body.email,
            filename: req.file.filename,
            profilePictureURL:imageurl
          });
        
        return res.status(201).json({message:"Updated Successfully"});
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}



////create user api ......................................
const getUserProfile =async (req, res) => {
 
    try{
    
            res.status(201).json({ 
                status:true,
                message: "SuccessFully Fetched",
            data:{
                "name":req.user.name,
                "email":req.user.email,
                "profile_img":req.user.profilePictureURL
            } });
    } catch(e){
        res.json({ 
            status:false,
            message: "Something went wrong",
        });
        console.log(e);
    }
  
}


exports.updateUserProfile = updateUserProfile;
exports.getUserProfile=getUserProfile;