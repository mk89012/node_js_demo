const fs=require("fs");

const mongoose = require('mongoose')
const Joi = require('joi');

const profileSchema = new mongoose.Schema({
    user_id:{
        type: String,
        require:true,
    },
    name: {
        type: String,
        min: 3,
        require:true,
        max: 100
    },
    email: {
        type: String,
        unique: true,
        require:true,
        min: 5,
        max: 255
    },
   
    profilePictureURL: {
        type: String
    }
  
})

function validateProfile(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
    })
    return schema.validate(user)
}


////Profile api Validation...........

var Profile = mongoose.model('profile', profileSchema);
exports.validateProfile = validateProfile

exports.Profile = Profile








