require('dotenv').config()
const mongoose = require('mongoose');
const {Product,validateProduct} = require('./productModel');
var db=mongoose.connection;








////create user api ......................................
const getProducts =async (req, res) => {
    let data = await Product.find();
    try{
        console.log(req.userData);
            res.status(200).json({ 
                status:true,
                message: "SuccessFully Fetched",
            data:data });
    } catch(e){
        res.json({ 
            status:false,
            message: "Something went wrong",
        });
        console.log(e);
    }
  
}






exports.getProducts = getProducts;
