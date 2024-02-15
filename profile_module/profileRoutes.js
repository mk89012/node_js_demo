require('dotenv').config()
const fs=require("fs");
const express = require("express");
const profileController=require("./profileController");
const { authenticate } = require('../middle_ware/authenticate');
const router=express.Router();
var multer = require('multer');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir("upload", { recursive: true}, function (err) {
            if (err) return cb(err);
            cb(null,  "upload");
          });
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        cb(null, name + '-' + Date.now());
    }
});

  
let upload = multer({storage: storage})


/// Here is Profile api routes.....................

router.get('/user_profile',authenticate, profileController.getUserProfile)
.put("/update_profile",authenticate,upload.single('profile_pic'),profileController.updateUserProfile);


exports.router = router;
