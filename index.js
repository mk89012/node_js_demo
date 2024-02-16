require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const authRouter = require("./auth_module/authRoutes");
const profileRouter = require("./profile_module/profileRoutes");
const dashboardRouter = require("./dashboard_module/dashboardRoutes");


const mongoose = require('mongoose');
const server = express();



  mongoose.set("strictQuery",false)

  const connectDB= async function main() {
    try{
    const con=  await mongoose.connect(process.env.CONNECTION_URL);
    console.log("connected db port"+con.connection.host);
    }catch(error){
      console.log(error);
      process.exit(1);
    }
  }





server.use(express.json());
server.use(morgan('dev'));
server.use("/public",express.static('public'));
server.use("/upload", express.static("upload"));
server.use('/api',authRouter.router);  
server.use('/api',profileRouter.router); 
server.use('/api',dashboardRouter.router);





   
connectDB().then(()=>{
  server.listen(process.env.PORT,()=>{
    console.log("Server start successfully");
})
})


