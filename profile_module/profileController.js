require('dotenv').config()
const {Profile,validateProfile} = require('./profileModel');
const mongoose = require('mongoose');
var db=mongoose.connection;








////create user api ......................................

const updateUserProfile =async (req, res) => {

    const { error } = validateProfile(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }else{
    try {
       var url = req.protocol + '://' + req.get("host");
        var imageName='';
        var imageurl="";
        if(req.file!=null){
            imageName =req.file.filename
            imageurl= url + '/upload/' + imageName;
        }

        
             var update ={
                user_id:req.userData._id,
                name: req.body.name,
                email: req.body.email,
                profilePictureURL:imageurl
              };          

          const user = await Profile.findOneAndUpdate({user_id: req.userData._id },update,{ new: true }
          );
        return res.status(200).json({message:"Updated Successfully"});
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
}



////create user api ......................................
const getUserProfile =async (req, res) => {
    let data = await Profile.findOne({user_id: req.userData._id });
    try{
        console.log(req.userData);
            res.status(200).json({ 
                status:true,
                message: "SuccessFully Fetched",
            data:{
                "name":data.name,
                "email":data.email,
                "profile_img":data.profilePictureURL
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