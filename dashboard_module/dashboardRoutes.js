require('dotenv').config()
const express = require("express");
const dashboardController=require("./dashboardController");
const { authenticate } = require('../middle_ware/authenticate');
const router=express.Router();





/// Here is Profile api routes.....................

router.get('/dashboard',authenticate, dashboardController.dashboardData);


exports.router = router;
