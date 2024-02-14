require('dotenv').config()
const express = require("express");
const prductController=require("./productController");
const { authenticate } = require('../auth_module/middle_ware/authenticate');
const router=express.Router();





/// Here is Profile api routes.....................

router.get('/get_products',authenticate, prductController.getProducts);


exports.router = router;
