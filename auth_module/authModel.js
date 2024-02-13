const fs=require("fs");

const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
 
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100

    },
 
   
})



////Rehister api Validation...........

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required(),
    })
    return schema.validate(user)
}



const User = mongoose.model('user', userSchema)
exports.validate = validateUser
exports.User = User





////Login api Validation.................

function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required()
    })
    return schema.validate(user)
}

exports.validateLoginUser = validateLoginUser
