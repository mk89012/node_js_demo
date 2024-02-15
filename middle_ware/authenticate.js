require('dotenv').config()
const jwt = require('jsonwebtoken');
const {User} = require('../auth_module/authModel');
const {Profile} = require('../profile_module/profileModel');



const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const profile = await Profile.findOne({token:token});

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }else if(!profile){
    return res.status(401).json({ message: 'Invalid Token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.userData = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };