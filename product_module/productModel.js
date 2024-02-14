
const mongoose = require('mongoose')
const Joi = require('joi');

const productSchema = new mongoose.Schema({
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
    price: {
        type: String,
        unique: true,
        require:true,
        min: 5,
        max: 255
    },
   
    imgUrl: {
        type: String,
        require:true,

    }
  
})

function validateProduct(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.string().min(5).max(255).required().email(),
    })
    return schema.validate(user)
}


////Profile api Validation...........

var Product = mongoose.model('products', productSchema);
exports.validateProduct = validateProduct

exports.Product = Product








