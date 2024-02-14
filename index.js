require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const authRouter = require("./auth_module/authRoutes");
const profileRouter = require("./profile_module/profileRoutes");

const mongoose = require('mongoose');
const server = express();


main().catch(err => console.log(err));


async function main() {
    await mongoose.connect(process.env.CONNECTION_URL);
  
  }





server.use(express.json());
server.use(morgan('dev'));
server.use("/public",express.static('public'));
server.use("/upload", express.static("upload"));
server.use('/api',authRouter.router);  ///Auth Routes...
server.use('/api',profileRouter.router); 





   

server.listen(process.env.PORT,()=>{
    console.log("Server start successfully");
})

