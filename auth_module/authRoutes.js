require('dotenv').config()
const fs=require("fs");
const express = require("express");
const authController=require("./authController");
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

// const storage = multer.memoryStorage(); 
  
let upload = multer({storage: storage})


/// Here is auth api routes.....................

router.post('/login_user', authController.loginUser)
.post("/create_user",upload.single('profile_pic'),authController.createUser);


exports.router = router;
